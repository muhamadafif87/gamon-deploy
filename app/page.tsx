'use client';
import Image from "next/image";

import React, { useState, useEffect, useRef, useMemo } from 'react';

// Interfaces
interface SizeOption {
  name: string;
  price: number;
}

interface MinyakOption {
  name: string;
  price: number;
}

interface OrderState {
  name: string;
  size: SizeOption | null;
  rasa: string[];
  isian: string[];
  minyak: MinyakOption[];
  level: number | null;
  sendokExtra: number;
  note: string;
}

const STORAGE_KEY = 'gamon_current_order';
const HISTORY_KEY = 'gamon_orders_history';
const WA_NUMBER = '6285800693356';

export default function Home() {
  // --- STATE UNTUK FORM PESANAN ---
  const [orderState, setOrderState] = useState<OrderState>({
    name: '',
    size: null,
    rasa: [],
    isian: [],
    minyak: [],
    level: null,
    sendokExtra: 0,
    note: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // --- STATE UNTUK TESTIMONI SLIDER ---
  const [testiIndex, setTestiIndex] = useState<number>(0);
  const totalTesti = 5;

  // --- STATE UNTUK SNACK FAN INTERACTION ---
  const [activeSnack, setActiveSnack] = useState<number>(0);
  const [topZ, setTopZ] = useState<number>(30);

  // --- STATE UNTUK NGEMILMU CAROUSEL ---
  const [activeNgemilmuDot, setActiveNgemilmuDot] = useState<number>(0);

  // REFS
  const ngemilmuTrackRef = useRef<HTMLDivElement>(null);
  const testiTrackRef = useRef<HTMLDivElement>(null);

  // 1. STICKY NAVBAR EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. SCROLL REVEAL ANIMATION (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 3. TESTIMONIAL SLIDER AUTOPLAY
  useEffect(() => {
    const interval = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % totalTesti);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalTesti]);

  // 4. LOAD ORDER FROM LOCALSTORAGE
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setOrderState((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Gagal memuat pesanan tersimpan:', e);
    }
  }, []);

  // 5. SAVE ORDER TO LOCALSTORAGE
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orderState));
    } catch (e) {
      console.error('Gagal menyimpan pesanan ke localStorage:', e);
    }
  }, [orderState]);

  // 6. NGEMILMU CAROUSEL SCROLL SYNC
  const handleNgemilmuScroll = () => {
    const track = ngemilmuTrackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setActiveNgemilmuDot(closestIndex);
  };

  const scrollToNgemilmuCard = (index: number) => {
    const track = ngemilmuTrackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  // --- LOGIKA FORM PESANAN ---
  const handleSelectSize = (name: string, price: number) => {
    setOrderState((prev) => ({ ...prev, size: { name, price } }));
  };

  const handleToggleRasa = (name: string) => {
    setOrderState((prev) => {
      const exists = prev.rasa.includes(name);
      return {
        ...prev,
        rasa: exists ? prev.rasa.filter((r) => r !== name) : [...prev.rasa, name],
      };
    });
  };

  const handleToggleIsian = (name: string) => {
    setOrderState((prev) => {
      const exists = prev.isian.includes(name);
      return {
        ...prev,
        isian: exists ? prev.isian.filter((i) => i !== name) : [...prev.isian, name],
      };
    });
  };

  const handleToggleMinyak = (name: string, price: number) => {
    setOrderState((prev) => {
      const exists = prev.minyak.some((m) => m.name === name);
      return {
        ...prev,
        minyak: exists ? prev.minyak.filter((m) => m.name !== name) : [...prev.minyak, { name, price }],
      };
    });
  };

  const handleSelectLevel = (level: number) => {
    setOrderState((prev) => ({ ...prev, level }));
  };

  const handleSendokChange = (action: 'plus' | 'minus') => {
    setOrderState((prev) => ({
      ...prev,
      sendokExtra: action === 'plus' ? prev.sendokExtra + 1 : Math.max(0, prev.sendokExtra - 1),
    }));
  };

  // KALKULASI TOTAL
  const calculatedTotal = useMemo(() => {
    let total = orderState.size ? orderState.size.price : 0;
    orderState.minyak.forEach((m) => (total += m.price));
    total += orderState.sendokExtra * 1000;
    return total;
  }, [orderState]);

  const formatRupiah = (num: number) => 'Rp' + num.toLocaleString('id-ID');

  // VALIDASI DAN KIRIM PESANAN KE WA
  const handleSubmitOrder = () => {
    if (!orderState.name || !orderState.name.trim()) {
      setErrorMessage('Mohon isi nama pemesan dulu ya.');
      return;
    }
    if (!orderState.size) {
      setErrorMessage('Pilih size dulu ya.');
      return;
    }
    if (!orderState.rasa.length) {
      setErrorMessage('Pilih minimal 1 varian rasa.');
      return;
    }
    if (!orderState.isian.length) {
      setErrorMessage('Pilih minimal 1 isian.');
      return;
    }
    if (!orderState.minyak.length) {
      setErrorMessage('Pilih minimal 1 varian minyak.');
      return;
    }
    if (!orderState.level) {
      setErrorMessage('Pilih level pedas dulu ya.');
      return;
    }

    setErrorMessage('');

    // Simpan ke riwayat pesanan di localStorage
    try {
      const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      history.push({ ...orderState, total: calculatedTotal, timestamp: new Date().toISOString() });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Gagal menyimpan riwayat pesanan:', e);
    }

    // Format Pesan WhatsApp
    const lines = [
      '*Pesanan Baru*',
      'Halo Makaroni Gamon, saya ingin memesan:',
      '',
      `Nama Pemesan: ${orderState.name || '-'}`,
      `Size: ${orderState.size ? orderState.size.name : '-'}`,
      `Rasa: ${orderState.rasa.length ? orderState.rasa.join(', ') : '-'}`,
      `Isian: ${orderState.isian.length ? orderState.isian.join(', ') : '-'}`,
      `Minyak: ${orderState.minyak.length ? orderState.minyak.map((m) => m.name).join(', ') : '-'}`,
      `Level Pedas: ${orderState.level || '-'}`,
      `Sendok Bumbu Tambahan: ${orderState.sendokExtra || '-'}`,
      orderState.note ? `Catatan: ${orderState.note}` : '',
      '',
      `Total Bayar: ${formatRupiah(calculatedTotal)}`,
      '',
      'Mohon konfirmasi alamat & metode pembayaran.',
      'Terima kasih',
    ];

    const message = encodeURIComponent(lines.filter(Boolean).join('\n'));
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${message}`;
    window.open(waUrl, '_blank');
  };

  const snackItems = [
    { name: 'Makaroni Pipa', img: '/makaroni_pipa.jpg' },
    { name: 'Makaroni Spiral', img: '/makaroni_spiral.jpg' },
    { name: 'Mie Gulung', img: '/mie_gulung.jpg' },
    { name: 'Keripik Kaca', img: '/keripik_kaca.jpg' },
    { name: 'Jengkol', img: '/jengkol.jpg' },
    { name: 'Usus', img: '/usus.jpg' },
    { name: 'Usus Kering', img: '/siomay_kering.jpg' },
    { name: 'Sosis', img: '/sosis.jpg' },
    { name: 'Kerupuk Seblak', img: '/krupuk_seblak.jpg' },
    { name: 'Otak otak', img: '/otak_otak.jpg' },
  ];

  return (
    <>
      {/* HEADER */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="header-container">
          <div className="logo">
            <img src="/gamon_logo.png" alt="Makaroni Gamon Logo" className="logo-img" />
          </div>
          <nav className="navbar-menu">
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="hamburger" aria-label="Toggle navigation menu">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <div className="nav-links">
              <a href="#menu" className="nav-link">Varian Rasa</a>
              <a href="#benefits" className="nav-link">Kenapa Gamon?</a>
              <a href="#testimoni" className="nav-link">Testimoni</a>
              <a href="#lokasi" className="nav-link">Lokasi</a>
              <a href="#pesan" className="nav-link">Mulai Pesan</a>
            </div>
          </nav>
          <a href="#pesan" className="btn-primary nav-cta">Pesan Sekarang</a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero scroll-animate fade-up">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="row-wrapper">
              <div className="hero-text">
                <span>Paling Pedas, Paling Renyah!</span>
                <h1>
                  Bikin Meweq,<br />Anti <span className="highlight">Redfleq.</span>
                </h1>
                <p>
                  Cemilan makaroni pedas nomor satu yang bakal bikin kamu gagal move on dari rasanya. Berani coba level pedas tertingginya?
                </p>
                <div className="hero-actions">
                  <a href="#pesan" className="btn-primary">Pesan Sekarang</a>
                  <a href="#testimoni" className="btn-secondary">Lihat Kata Mereka</a>
                </div>
              </div>
              <div className="menu-ngemilmu">
                <h1>Menu Ngemilmu</h1>
              </div>

              {/* FLOATING SNACK FAN */}
              <div className="hero-visual">
                {snackItems.map((snack, index) => {
                  const isActive = activeSnack === index;
                  return (
                    <div
                      key={index}
                      className={`floating-snack pack-${index + 1} ${isActive ? 'is-active' : ''}`}
                      style={{ zIndex: isActive ? topZ : index + 1 }}
                      onClick={() => {
                        setActiveSnack(index);
                        setTopZ((prev) => prev + 1);
                      }}
                    >
                      <img src={snack.img} alt="Makaroni Pedas Gila" className="snack-img" />
                      <div className="caption">{snack.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NGEMILMU CAROUSEL */}
            <div className="ngemilmu-carousel">
              <div
                className="ngemilmu-track"
                id="ngemilmuTrack"
                ref={ngemilmuTrackRef}
                onScroll={handleNgemilmuScroll}
              >
                <div className="ngemilmu-card">
                  <div className="ngemilmu-card-head">
                    <h3>Menu Mix Pilihan</h3>
                  </div>
                  <ul className="ngemilmu-list ngemilmu-price-list">
                    <li><span>Size M (Medium)</span><strong>5K</strong></li>
                    <li><span>Size L (Large)</span><strong>7.5K</strong></li>
                    <li><span>Size XL (Xangat Large)</span><strong>10K</strong></li>
                    <li><span>Size XXL (Xangat Xangat Large)</span><strong>15K</strong></li>
                    <li><span>Size W (Wumbo)</span><strong>20K</strong></li>
                    <li><span>Size Segaban</span><strong>45K</strong></li>
                    <li><span>Size Megalodon</span><strong>90K</strong></li>
                  </ul>
                </div>

                <div className="ngemilmu-card">
                  <div className="ngemilmu-card-head">
                    <h3>Varian Rasa</h3>
                  </div>
                  <ul className="ngemilmu-list ngemilmu-tag-list">
                    <li>Original Gamon <span className="ngemilmu-badge">Rekomen</span></li>
                    <li>BBQ</li>
                    <li>Balado</li>
                    <li>Jagung Manis</li>
                    <li>Rumput Laut</li>
                    <li>Keju</li>
                  </ul>
                </div>

                <div className="ngemilmu-card">
                  <div className="ngemilmu-card-head">
                    <h3>Varian Minyak</h3>
                  </div>
                  <ul className="ngemilmu-list ngemilmu-tag-list">
                    <li>Minyak Bawang</li>
                    <li>Chili Oil</li>
                  </ul>
                  <div className="ngemilmu-note">Bebas Mix Sampai PUAS!!!</div>
                </div>

                <div className="ngemilmu-card">
                  <div className="ngemilmu-card-head">
                    <h3>Keterangan</h3>
                  </div>
                  <ul className="ngemilmu-list ngemilmu-price-list">
                    <li><span>Level Pedas 1 - 5</span><strong className="free-tag">FREE</strong></li>
                    <li><span>Setelah Sendok ke-5</span><strong>+1K</strong></li>
                    <li><span>Chili Oil</span><strong>+1K</strong></li>
                  </ul>
                </div>
              </div>
              <div className="ngemilmu-dots" id="ngemilmuDots">
                {[0, 1, 2, 3].map((dotIdx) => (
                  <span
                    key={dotIdx}
                    className={activeNgemilmuDot === dotIdx ? 'active' : ''}
                    onClick={() => scrollToNgemilmuCard(dotIdx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="benefits scroll-animate fade-up" id="benefits">
          <div className="section-header">
            <h2>Bukan Makaroni Biasa</h2>
            <p>Kami memastikan setiap gigitan Makaroni Gamon memberikan sensasi yang tak terlupakan.</p>
          </div>
          <div className="benefit-cards">
            <div className="benefit-card">
              <div className="benefit-icon">🌶️</div>
              <h3>Pedasnya Nendang</h3>
              <p>Terbuat dari 100% cabai asli pilihan tanpa bahan pengawet. Pedasnya bikin nagih!</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💥</div>
              <h3>Ekstra Renyah</h3>
              <p>Digoreng dengan suhu yang pas menghasilkan tekstur super krispi yang tahan lama.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🧂</div>
              <h3>Bumbu Melimpah</h3>
              <p>Gak pelit bumbu! Setiap makaroni terbalut sempurna oleh bumbu rahasia kami.</p>
            </div>
          </div>
        </section>

        {/* MENU / VARIAN RASA */}
        <section className="menu-section scroll-animate fade-up" id="menu">
          <div className="section-header">
            <h2>Varian Rasa <span className="highlight">Gamon</span></h2>
            <p>Pilih rasa favoritmu, dari yang gurih santai sampai pedas brutal.</p>
          </div>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="menu-img-wrap">
                <div className="menu-img pedas-gila">🔥</div>
                <span className="menu-tag">Best Seller</span>
              </div>
              <div className="menu-info">
                <h3>Original Gamon</h3>
                <p>Cocok buat kamu yang suka tantangan. Pedasnya nampol, bikin keringetan!</p>
                <a href="#pesan" className="btn-outline">Order Sekarang</a>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-img-wrap">
                <div className="menu-img pedas-santuy">🍖</div>
              </div>
              <div className="menu-info">
                <h3>BBQ</h3>
                <p>Pedasnya pas, gurihnya mantap. Cocok untuk nemenin nonton drakor.</p>
                <a href="#pesan" className="btn-outline">Order Sekarang</a>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-img-wrap">
                <div className="menu-img keju-asin">🧀</div>
              </div>
              <div className="menu-info">
                <h3>Keju</h3>
                <p>Perpaduan keju premium dan rasa asin yang bikin gak mau berhenti ngunyah.</p>
                <a href="#pesan" className="btn-outline">Order Sekarang</a>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-img-wrap">
                <div className="menu-img balado">🌶️</div>
              </div>
              <div className="menu-info">
                <h3>Balado</h3>
                <p>Rasa manis, pedas, dan aroma daun jeruk yang wangi banget.</p>
                <a href="#pesan" className="btn-outline">Order Sekarang</a>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-img-wrap">
                <div className="menu-img jagung-manis">🌽</div>
              </div>
              <div className="menu-info">
                <h3>Jagung Manis</h3>
                <p>Rasa jagung manis yang enak banget.</p>
                <a href="#pesan" className="btn-outline">Order Sekarang</a>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-img-wrap">
                <div className="menu-img rumput-laut">🍙</div>
              </div>
              <div className="menu-info">
                <h3>Rumput Laut</h3>
                <p>Rasa rumput laut yang enak banget.</p>
                <a href="#pesan" className="btn-outline">Order Sekarang</a>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONI */}
        <section className="testimoni-section scroll-animate fade-up" id="testimoni">
          <div className="section-header">
            <h2>Kata Mereka yang Udah <span className="highlight">Gamon</span></h2>
          </div>
          <div className="testi-slider">
            <div
              className="testi-track"
              id="testiTrack"
              ref={testiTrackRef}
              style={{ transform: `translateX(-${testiIndex * 100}%)` }}
            >
              <div className="testi-card">
                <div className="quote-mark">&quot;</div>
                <p>
                  Pertama kali coba, puas bgtttt<br />
                  Enakk, bisa campur suka-suka lagi<br />
                  Sangat sukaa.. apalagi sama pelayanan nya, mba nya ramah sangatt<br />
                  Pasti bakal balik lagi
                </p>
                <div className="testi-user">
                  <div className="avatar">👩</div>
                  <div className="user-info">
                    <strong>sasasaa</strong>
                  </div>
                </div>
              </div>
              <div className="testi-card">
                <div className="quote-mark">&quot;</div>
                <p>
                  Murah banget, enak bebas mix lagi…<br />
                  bakalan langganan soalnya solusi bgt buat yg pengen cari cemilan tp pengen hemat juga, secara 5k udah bisa mix!.
                </p>
                <div className="testi-user">
                  <div className="avatar">👩</div>
                  <div className="user-info">
                    <strong>Alviony Charisa Putri</strong>
                  </div>
                </div>
              </div>
              <div className="testi-card">
                <div className="quote-mark">&quot;</div>
                <p>Makananyaaa enaksss mantapp terus pelayanan nya gercep ramah baikkk dan ada stiker yg lucuuu dengan kata&quot; terimakasih doanyaaa🤍😋</p>
                <div className="testi-user">
                  <div className="avatar">👩</div>
                  <div className="user-info">
                    <strong>Afifah Nur Halimah</strong>
                    <span>Mahasiswa</span>
                  </div>
                </div>
              </div>
              <div className="testi-card">
                <div className="quote-mark">&quot;</div>
                <p>
                  kesini karena unik banget bisa sekali nyemil tapi macem2.<br />
                  ada makaroni, ususu, basreng, cimol, kripca, bwanyak bgtt. asik banget kerja sambil nyemil gini huhu<br />
                  bisa ditambah bumbu lagi, bisa di cicipin dulu. pas udah di mix bumbu juga bisa di cicipin lagi sampe kita ngerasa passs dann puassss, gak bercanda nih😭
                </p>
                <div className="testi-user">
                  <div className="avatar">👩</div>
                  <div className="user-info">
                    <strong>Vina Putri</strong>
                    <span>Mahasiswa</span>
                  </div>
                </div>
              </div>
              <div className="testi-card">
                <div className="quote-mark">&quot;</div>
                <p>mbanya ramah bgt, bisa pilih mau pake apa aja, kalau sudah dibumbuin sama mbanya nanti disuruh nyicip udah pas belum sama selera kita kalau belum nanti ditambah bumbu lagi sama mbanya</p>
                <div className="testi-user">
                  <div className="avatar">👩</div>
                  <div className="user-info">
                    <strong>Zaks</strong>
                    <span>Mahasiswa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testi-dots" id="testiDots">
            {Array.from({ length: totalTesti }).map((_, idx) => (
              <span
                key={idx}
                className={testiIndex === idx ? 'active' : ''}
                onClick={() => setTestiIndex(idx)}
              />
            ))}
          </div>
        </section>

        {/* LOKASI */}
        <section className="findus-section scroll-animate fade-up" id="lokasi">
          <div className="section-header">
            <h2>Temukan Kami di Kotamu!</h2>
            <p>Kunjungi outlet terdekat atau pesan online via aplikasi favoritmu.</p>
          </div>

          <div className="outlet-grid">
            <div className="outlet-card">
              <div className="outlet-city">📍 Cabang UMS</div>
              <h4>Makaroni Gamon UMS</h4>
              <p>Jl. Duwet IX No.13, Karangasem, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57145<br />Buka: 08.00 - 23.00 WIB</p>
              <a href="https://maps.app.goo.gl/CA8Nuds6K8Vja5P76" className="btn-location">Lihat Peta</a>
            </div>
            <div className="outlet-card">
              <div className="outlet-city">📍 Cabang UNS</div>
              <h4>Makaroni Gamon UNS</h4>
              <p>Jl. Ki Hajar Dewantara No.25, Jebres, Kec. Jebres, Kota Surakarta, Jawa Tengah 57126<br />Buka: 08.00 - 23.00 WIB</p>
              <a href="https://maps.app.goo.gl/MZCSuCQ17DqymuwF8" className="btn-location">Lihat Peta</a>
            </div>
            <div className="outlet-card">
              <div className="outlet-city">📍 Cabang Penumping</div>
              <h4>Makaroni Gamon Penumping</h4>
              <p>Jl. Kebangkitan Nasional No.56, Penumping, Kec. Laweyan, Kota Surakarta<br />Buka: 08.00 - 23.00 WIB</p>
              <a href="https://maps.app.goo.gl/f79AbEhG5iis2zTk6?g_st=iw" className="btn-location">Lihat Peta</a>
            </div>
            <div className="outlet-card">
              <div className="outlet-city">📍 Cabang Nusukan</div>
              <h4>Makaroni Gamon Nusukan</h4>
              <p>Jl. Letjen Sutoyo No.59, Nusukan, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57135<br />Buka: 08.00 - 23.00 WIB</p>
              <a href="https://maps.app.goo.gl/UmhZAEhNJr2mkZx19" className="btn-location">Lihat Peta</a>
            </div>
          </div>
        </section>

        {/* MULAI PESAN */}
        <section className="order-section scroll-animate fade-up" id="pesan">
          <div className="section-header">
            <h2>Mulai Pesan</h2>
            <p>Susun pesananmu sendiri, langsung kirim ke WhatsApp kami dalam sekali klik.</p>
          </div>

          <div className="order-wrap">
            <form className="order-form" id="orderForm" onSubmit={(e) => e.preventDefault()}>
              {/* Nama Pemesan */}
              <div className="order-group">
                <label htmlFor="orderName" className="order-label">Nama Pemesan</label>
                <input
                  type="text"
                  id="orderName"
                  className="order-input"
                  placeholder="Nama kamu"
                  value={orderState.name}
                  onChange={(e) => setOrderState((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              {/* Size */}
              <div className="order-group">
                <span className="order-label">Pilih Size</span>
                <div className="pill-group" id="sizeGroup">
                  {[
                    { name: 'Size M (Medium)', price: 5000, label: 'M', em: '5K' },
                    { name: 'Size L (Large)', price: 7500, label: 'L', em: '7.5K' },
                    { name: 'Size XL (Xangat Large)', price: 10000, label: 'XL', em: '10K' },
                    { name: 'Size XXL (Xangat Xangat Large)', price: 15000, label: 'XXL', em: '15K' },
                    { name: 'Size W (Wumbo)', price: 20000, label: 'W', em: '20K' },
                    { name: 'Size Segaban', price: 45000, label: 'Segaban', em: '45K' },
                    { name: 'Size Megalodon', price: 90000, label: 'Megalodon', em: '90K' },
                  ].map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      className={`pill ${orderState.size?.name === s.name ? 'active' : ''}`}
                      onClick={() => handleSelectSize(s.name, s.price)}
                    >
                      {s.label} <em>{s.em}</em>
                    </button>
                  ))}
                </div>
              </div>

              {/* Varian Rasa */}
              <div className="order-group">
                <span className="order-label">Varian Rasa <small>(boleh pilih lebih dari satu, bebas mix!)</small></span>
                <div className="chip-group" id="rasaGroup">
                  {['Original Gamon', 'BBQ', 'Balado', 'Jagung Manis', 'Rumput Laut', 'Keju'].map((rasa) => (
                    <button
                      key={rasa}
                      type="button"
                      className={`chip ${orderState.rasa.includes(rasa) ? 'active' : ''}`}
                      onClick={() => handleToggleRasa(rasa)}
                    >
                      {rasa}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pilih Isian */}
              <div className="order-group">
                <span className="order-label">Pilih Isian <small>(boleh pilih lebih dari satu)</small></span>
                <div className="chip-group" id="isianGroup">
                  {[
                    'Makaroni Pipa',
                    'Makaroni Spiral',
                    'Mie Gulung',
                    'Keripik Kaca',
                    'Jengkol',
                    'Usus',
                    'Usus Kering',
                    'Sosis',
                    'Kerupuk Seblak',
                    'Otak-otak',
                  ].map((isian) => (
                    <button
                      key={isian}
                      type="button"
                      className={`chip ${orderState.isian.includes(isian) ? 'active' : ''}`}
                      onClick={() => handleToggleIsian(isian)}
                    >
                      {isian}
                    </button>
                  ))}
                </div>
              </div>

              {/* Varian Minyak */}
              <div className="order-group">
                <span className="order-label">Varian Minyak <small>(boleh mix, Chili Oil +1K)</small></span>
                <div className="chip-group" id="minyakGroup">
                  <button
                    type="button"
                    className={`chip ${orderState.minyak.some((m) => m.name === 'Minyak Bawang') ? 'active' : ''}`}
                    onClick={() => handleToggleMinyak('Minyak Bawang', 0)}
                  >
                    Minyak Bawang
                  </button>
                  <button
                    type="button"
                    className={`chip ${orderState.minyak.some((m) => m.name === 'Chili Oil') ? 'active' : ''}`}
                    onClick={() => handleToggleMinyak('Chili Oil', 1000)}
                  >
                    Chili Oil <em>+1K</em>
                  </button>
                </div>
              </div>

              {/* Level Pedas */}
              <div className="order-group">
                <span className="order-label">Level Pedas <small>(1 - 5, gratis)</small></span>
                <div className="pill-group" id="levelGroup">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`pill pill-level ${orderState.level === lvl ? 'active' : ''}`}
                      onClick={() => handleSelectLevel(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tambahan Sendok Bumbu */}
              <div className="order-group">
                <span className="order-label">Tambahan Sendok Bumbu <small>(setelah sendok ke-5, +1K/sendok)</small></span>
                <div className="stepper" id="sendokStepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => handleSendokChange('minus')}
                    aria-label="Kurangi"
                  >
                    −
                  </button>
                  <span className="stepper-value" id="sendokValue">{orderState.sendokExtra}</span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => handleSendokChange('plus')}
                    aria-label="Tambah"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Catatan */}
              <div className="order-group">
                <label htmlFor="orderNote" className="order-label">Catatan Tambahan <small>(opsional)</small></label>
                <textarea
                  id="orderNote"
                  className="order-input"
                  rows={3}
                  placeholder="Contoh: request khusus, dll."
                  value={orderState.note}
                  onChange={(e) => setOrderState((prev) => ({ ...prev, note: e.target.value }))}
                ></textarea>
              </div>

              {errorMessage && <p className="order-error" id="orderError">{errorMessage}</p>}
            </form>

            {/* Ringkasan Pesanan */}
            <aside className="order-summary" id="orderSummary">
              <h3>Ringkasan Pesanan</h3>
              <div className="summary-row">
                <span>Size</span>
                <strong id="sumSize">
                  {orderState.size ? orderState.size.name.replace('Size ', '') : '-'}
                </strong>
              </div>
              <div className="summary-row">
                <span>Rasa</span>
                <strong id="sumRasa">
                  {orderState.rasa.length ? orderState.rasa.join(', ') : '-'}
                </strong>
              </div>
              <div className="summary-row">
                <span>Isian</span>
                <strong id="sumIsian">
                  {orderState.isian.length ? orderState.isian.join(', ') : '-'}
                </strong>
              </div>
              <div className="summary-row">
                <span>Minyak</span>
                <strong id="sumMinyak">
                  {orderState.minyak.length ? orderState.minyak.map((m) => m.name).join(', ') : '-'}
                </strong>
              </div>
              <div className="summary-row">
                <span>Level Pedas</span>
                <strong id="sumLevel">
                  {orderState.level ? `Level ${orderState.level}` : '-'}
                </strong>
              </div>
              <div className="summary-row">
                <span>Sendok Tambahan</span>
                <strong id="sumSendok">{orderState.sendokExtra}</strong>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong id="sumTotal">{formatRupiah(calculatedTotal)}</strong>
              </div>
              <button
                type="button"
                className="btn-primary order-submit"
                id="orderSubmit"
                onClick={handleSubmitOrder}
              >
                Pesan Sekarang via WhatsApp
              </button>
              <p className="order-hint">Pesanan tersimpan otomatis di browser kamu.</p>
            </aside>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer scroll-animate fade-up">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>MAKARONI GAMON</h2>
            <p>Bikin Meweq, Anti Redflag.</p>
          </div>
          <div className="footer-links">
            <h3>Menu Cepat</h3>
            <a href="#menu">Varian Rasa</a>
            <a href="#benefits">Keunggulan</a>
            <a href="#testimoni">Review Pelanggan</a>
          </div>
          <div className="footer-contact">
            <h3>Hubungi Kami</h3>
            <p>+62 858-0069-3356</p>
            <div className="social-icons">
              <a href="https://instagram.com/makaronigamon.id" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </a>
              <a href="https://tiktok.com/makaronigamon.id" title="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
              </a>
              <a href="https://wa.me/6285800693356" title="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-flame" aria-hidden="true">
          <img src="/footer-gamon2.png" alt="" />
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Makaroni Gamon. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}