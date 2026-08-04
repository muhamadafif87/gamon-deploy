<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Makaroni Gamon - Bikin Nangis, Anti Redflag. Nikmati cemilan makaroni pedas dengan berbagai varian rasa yang nagih dan renyah.">
<link rel="icon" type="image/png" href="{{ asset('gamon_logo.png') }}">
<title>Makaroni Gamon | Bikin Nangis, Anti Redflag</title>
<!-- Google Fonts for Modern Typography -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
@vite(['resources/css/app.css', 'resources/js/script.js'])
</head>
<body>

<!-- HEADER -->
<header class="site-header" id="navbar">
    <div class="header-container">
        <div class="logo">
            <img src="{{ asset('gamon_logo.png') }}" alt="Makaroni Gamon Logo" class="logo-img">
        </div>
        <nav class="navbar-menu">
            <input type="checkbox" id="menu-toggle" class="menu-toggle">
            <label for="menu-toggle" class="hamburger" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
            </label>
            <div class="nav-links">
                <a href="#menu" class="nav-link">Varian Rasa</a>
                <a href="#benefits" class="nav-link">Kenapa Gamon?</a>
                <a href="#testimoni" class="nav-link">Testimoni</a>
                <a href="#lokasi" class="nav-link">Lokasi</a>
                <a href="#pesan" class="nav-link">Mulai Pesan</a>
            </div>
        </nav>
        <a href="#pesan" class="btn-primary nav-cta">Pesan Sekarang</a>
    </div>
</header>

<main>
<section class="hero scroll-animate fade-up">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <div class="row-wrapper">
            <div class="hero-text">
                <span>Paling Pedas, Paling Renyah!</span>
                <h1>Bikin Nangis,<br>Anti <span class="highlight">Redfleq.</span></h1>
                <p>Cemilan makaroni pedas nomor satu yang bakal bikin kamu gagal move on dari rasanya. Berani coba level pedas tertingginya?</p>
                <div class="hero-actions">
                    <a href="#pesan" class="btn-primary">Pesan Sekarang</a>
                    <a href="#testimoni" class="btn-secondary">Lihat Kata Mereka</a>
                </div>
            </div>
            <div class="menu-ngemilmu">
                <h1>Menu Ngemilmu</h1>
            </div>
            <div class="hero-visual">
                <div class="floating-snack pack-1">
                    <img src="{{ asset('makaroni_pipa.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Makaroni Pipa</div>
                </div>
                <div class="floating-snack pack-2">
                    <img src="{{ asset('makaroni_spiral.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Makaroni Spiral</div>
                </div>
                <div class="floating-snack pack-3">
                    <img src="{{ asset('mie_gulung.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Mie Gulung</div>
                </div>
                <div class="floating-snack pack-4">
                    <img src="{{ asset('keripik_kaca.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Keripik Kaca</div>
                </div>
                <div class="floating-snack pack-5">
                    <img src="{{ asset('jengkol.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Jengkol</div>
                </div>
                <div class="floating-snack pack-6">
                    <img src="{{ asset('usus.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Usus</div>
                </div>
                <div class="floating-snack pack-7">
                    <img src="{{ asset('siomay_kering.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Usus Kering</div>
                </div>
                <div class="floating-snack pack-8">
                    <img src="{{ asset('sosis.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Sosis</div>
                </div>
                <div class="floating-snack pack-9">
                    <img src="{{ asset('krupuk_seblak.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Kerupuk Seblak</div>
                </div>
                <div class="floating-snack pack-10">
                    <img src="{{ asset('otak_otak.jpg') }}" alt="Makaroni Pedas Gila" class="snack-img">
                    <div class="caption">Otak otak</div>
                </div>
            </div>
        </div>
        <div class="ngemilmu-carousel">
            <div class="ngemilmu-track" id="ngemilmuTrack">
                <div class="ngemilmu-card">
                    <div class="ngemilmu-card-head">
                    <h3>Menu Mix Pilihan</h3>
                    </div>
                    <ul class="ngemilmu-list ngemilmu-price-list">
                    <li><span>Size M (Medium)</span><strong>5K</strong></li>
                    <li><span>Size L (Large)</span><strong>7.5K</strong></li>
                    <li><span>Size XL (Xangat Large)</span><strong>10K</strong></li>
                    <li><span>Size XXL (Xangat Xangat Large)</span><strong>15K</strong></li>
                    <li><span>Size W (Wumbo)</span><strong>20K</strong></li>
                    <li><span>Size Segaban</span><strong>45K</strong></li>
                    <li><span>Size Megalodon</span><strong>90K</strong></li>
                    </ul>
                </div>

                <div class="ngemilmu-card">
                    <div class="ngemilmu-card-head">
                    <h3>Varian Rasa</h3>
                    </div>
                    <ul class="ngemilmu-list ngemilmu-tag-list">
                    <li>Original Gamon <span class="ngemilmu-badge">Rekomen</span></li>
                    <li>BBQ</li>
                    <li>Balado</li>
                    <li>Jagung Manis</li>
                    <li>Rumput Laut</li>
                    <li>Keju</li>
                    </ul>
                </div>

                <div class="ngemilmu-card">
                    <div class="ngemilmu-card-head">
                    <h3>Varian Minyak</h3>
                    </div>
                    <ul class="ngemilmu-list ngemilmu-tag-list">
                    <li>Minyak Bawang</li>
                    <li>Chili Oil</li>
                    </ul>
                    <div class="ngemilmu-note">Bebas Mix Sampai PUAS!!!</div>
                </div>

                <div class="ngemilmu-card">
                    <div class="ngemilmu-card-head">
                    <h3>Keterangan</h3>
                    </div>
                    <ul class="ngemilmu-list ngemilmu-price-list">
                    <li><span>Level Pedas 1 - 5</span><strong class="free-tag">FREE</strong></li>
                    <li><span>Setelah Sendok ke-5</span><strong>+1K</strong></li>
                    <li><span>Chili Oil</span><strong>+1K</strong></li>
                    </ul>
                </div>
            </div>
            <div class="ngemilmu-dots" id="ngemilmuDots"></div>
        </div>
    </div>
</section>

  <!-- BENEFITS -->
  <section class="benefits scroll-animate fade-up" id="benefits">
    <div class="section-header">
      <h2>Bukan Makaroni Biasa</h2>
      <p>Kami memastikan setiap gigitan Makaroni Gamon memberikan sensasi yang tak terlupakan.</p>
    </div>
    <div class="benefit-cards">
      <div class="benefit-card">
        <div class="benefit-icon">🌶️</div>
        <h3>Pedasnya Nendang</h3>
        <p>Terbuat dari 100% cabai asli pilihan tanpa bahan pengawet. Pedasnya bikin nagih!</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon">💥</div>
        <h3>Ekstra Renyah</h3>
        <p>Digoreng dengan suhu yang pas menghasilkan tekstur super krispi yang tahan lama.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon">🧂</div>
        <h3>Bumbu Melimpah</h3>
        <p>Gak pelit bumbu! Setiap makaroni terbalut sempurna oleh bumbu rahasia kami.</p>
      </div>
    </div>
  </section>

  <!-- MENU / VARIAN RASA -->
  <section class="menu-section scroll-animate fade-up" id="menu">
    <div class="section-header">
      <h2>Varian Rasa <span class="highlight">Gamon</span></h2>
      <p>Pilih rasa favoritmu, dari yang gurih santai sampai pedas brutal.</p>
    </div>
    <div class="menu-grid">
      <!-- Item 1 -->
      <div class="menu-item">
        <div class="menu-img-wrap">
          <div class="menu-img pedas-gila">🔥</div>
          <span class="menu-tag">Best Seller</span>
        </div>
        <div class="menu-info">
          <h3>Original Gamon</h3>
          <p>Cocok buat kamu yang suka tantangan. Pedasnya nampol, bikin keringetan!</p>
          <a href="#pesan" class="btn-outline">Order Sekarang</a>
        </div>
      </div>
      <!-- Item 2 -->
      <div class="menu-item">
        <div class="menu-img-wrap">
          <div class="menu-img pedas-santuy">🍖</div>
        </div>
        <div class="menu-info">
          <h3>BBQ</h3>
          <p>Pedasnya pas, gurihnya mantap. Cocok untuk nemenin nonton drakor.</p>
          <a href="#pesan" class="btn-outline">Order Sekarang</a>
        </div>
      </div>
      <!-- Item 3 -->
      <div class="menu-item">
        <div class="menu-img-wrap">
          <div class="menu-img keju-asin">🧀</div>
        </div>
        <div class="menu-info">
          <h3>Keju</h3>
          <p>Perpaduan keju premium dan rasa asin yang bikin gak mau berhenti ngunyah.</p>
          <a href="#pesan" class="btn-outline">Order Sekarang</a>
        </div>
      </div>
      <!-- Item 4 -->
      <div class="menu-item">
        <div class="menu-img-wrap">
          <div class="menu-img balado">🌶️</div>
        </div>
        <div class="menu-info">
          <h3>Balado</h3>
          <p>Rasa manis, pedas, dan aroma daun jeruk yang wangi banget.</p>
          <a href="#pesan" class="btn-outline">Order Sekarang</a>
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-img-wrap">
          <div class="menu-img jagung-manis">🌽</div>
        </div>
        <div class="menu-info">
          <h3>Jagung Manis</h3>
          <p>Rasa jagung manis yang enak banget.</p>
          <a href="#pesan" class="btn-outline">Order Sekarang</a>
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-img-wrap">
          <div class="menu-img rumput-laut">🍙</div>
        </div>
        <div class="menu-info">
          <h3>Rumput Laut</h3>
          <p>Rasa rumput laut yang enak banget.</p>
          <a href="#pesan" class="btn-outline">Order Sekarang</a>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONI -->
  <section class="testimoni-section scroll-animate fade-up" id="testimoni">
    <div class="section-header">
      <h2>Kata Mereka yang Udah <span class="highlight">Gamon</span></h2>
    </div>
    <div class="testi-slider">
      <div class="testi-track" id="testiTrack">
        <div class="testi-card">
          <div class="quote-mark">"</div>
          <p>Pertama kali coba, puas bgtttt
                <br>Enakk, bisa campur suka-suka lagi
                <br>Sangat sukaa.. apalagi sama pelayanan nya, mba nya ramah sangatt
                    <br>Pasti bakal balik lagi
            </p>
          <div class="testi-user">
            <div class="avatar">👩</div>
            <div class="user-info">
              <strong>sasasaa</strong>
            </div>
          </div>
        </div>
        <div class="testi-card">
          <div class="quote-mark">"</div>
            <p>Murah banget, enak bebas mix lagi….
                <br>bakalan langganan soalnya solusi bgt buat yg pengen cari cemilan tp pengen hemat juga, secara 5k udah bisa mix!.
            </p>
          <div class="testi-user">
            <div class="avatar">👩</div>
            <div class="user-info">
              <strong>Alviony Charisa Putri</strong>
            </div>
          </div>
        </div>
        <div class="testi-card">
            <div class="quote-mark">"</div>
            <p>Makananyaaa enaksss mantapp terus pelayanan nya gercep ramah baikkk dan ada stiker yg lucuuu dengan kata" terimakasih doanyaaa🤍😋</p>
            <div class="testi-user">
                <div class="avatar">👩</div>
                <div class="user-info">
                    <strong>Afifah Nur Halimah</strong>
                    <span>Mahasiswa</span>
                </div>
            </div>
        </div>
        <div class="testi-card">
            <div class="quote-mark">"</div>
            <p>
                kesini karena unik banget bisa sekali nyemil tapi macem2.
                <br>ada makaroni, ususu, basreng, cimol, kripca, bwanyak bgtt. asik banget kerja sambil nyemil gini huhu
                <br>bisa ditambah bumbu lagi, bisa di cicipin dulu. pas udah di mix bumbu juga bisa di cicipin lagi sampe kita ngerasa passs dann puassss, gak bercanda nih😭
            </p>
            <div class="testi-user">
                <div class="avatar">👩</div>
                <div class="user-info">
                    <strong>Vina Putri</strong>
                    <span>Mahasiswa</span>
                </div>
            </div>
        </div>
        <div class="testi-card">
            <div class="quote-mark">"</div>
            <p>mbanya ramah bgt, bisa pilih mau pake apa aja, kalau sudah dibumbuin sama mbanya nanti disuruh nyicip udah pas belum sama selera kita kalau belum nanti ditambah bumbu lagi sama mbanya</p>
            <div class="testi-user">
                <div class="avatar">👩</div>
                <div class="user-info">
                    <strong>Zaks</strong>
                    <span>Mahasiswa</span>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="testi-dots" id="testiDots"></div>
  </section>

  <!-- FAQ -->
  {{-- <section class="faq-section scroll-animate fade-up">
    <div class="faq-container">
      <div class="faq-text">
        <h2>Pertanyaan yang Sering Diajukan</h2>
        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header">Berapa lama Makaroni Gamon tahan?</div>
            <div class="accordion-content">Makaroni kami tahan hingga 2 bulan dalam kemasan tertutup rapat berkat proses penggorengan yang optimal.</div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">Apakah bisa dikirim ke luar kota?</div>
            <div class="accordion-content">Tentu saja! Kami melayani pengiriman ke seluruh Indonesia dengan packing aman (bubble wrap & kardus).</div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">Level pedasnya sampai berapa?</div>
            <div class="accordion-content">Kami memiliki 5 level pedas. Level 1 untuk pemula, hingga Level 5 (Pedas Gila) untuk kamu yang berani tantangan.</div>
          </div>
        </div>
      </div>
      <div class="faq-visual">
        <div class="faq-badge">100% Halal</div>
      </div>
    </div>
  </section> --}}

  <!-- FIND US -->
  <section class="findus-section scroll-animate fade-up" id="lokasi">
    <div class="section-header">
      <h2>Temukan Kami di Kotamu!</h2>
      <p>Kunjungi outlet terdekat atau pesan online via aplikasi favoritmu.</p>
    </div>

    <div class="outlet-grid">
      <div class="outlet-card">
        <div class="outlet-city">📍 Cabang UMS</div>
        <h4>Makaroni Gamon UMS</h4>
        <p>Jl. Duwet IX No.13, Karangasem, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57145<br>Buka: 08.00 - 23.00 WIB</p>
        <a href="https://maps.app.goo.gl/CA8Nuds6K8Vja5P76" class="btn-location">Lihat Peta</a>
      </div>
      <div class="outlet-card">
        <div class="outlet-city">📍 Cabang UNS</div>
        <h4>Makaroni Gamon UNS</h4>
        <p>Jl. Ki Hajar Dewantara No.25, Jebres, Kec. Jebres, Kota Surakarta, Jawa Tengah 57126<br>Buka: 08.00 - 23.00 WIB</p>
        <a href="https://maps.app.goo.gl/MZCSuCQ17DqymuwF8" class="btn-location">Lihat Peta</a>
      </div>
      <div class="outlet-card">
        <div class="outlet-city">📍 Cabang Penumping</div>
        <h4>Makaroni Gamon Penumping</h4>
        <p>Jl. Kebangkitan Nasional No.56, Penumping, Kec. Laweyan, Kota Surakarta<br>Buka: 08.00 - 23.00 WIB</p>
        <a href="https://maps.app.goo.gl/f79AbEhG5iis2zTk6?g_st=iw" class="btn-location">Lihat Peta</a>
      </div>
      <div class="outlet-card">
        <div class="outlet-city">📍 Cabang Nusukan</div>
        <h4>Makaroni Gamon Nusukan</h4>
        <p>Jl. Letjen Sutoyo No.59, Nusukan, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57135<br>Buka: 08.00 - 23.00 WIB</p>
        <a href="https://maps.app.goo.gl/UmhZAEhNJr2mkZx19" class="btn-location">Lihat Peta</a>
      </div>
    </div>
  </section>

  <!-- MULAI PESAN -->
  <section class="order-section scroll-animate fade-up" id="pesan">
    <div class="section-header">
      <h2>Mulai Pesan</h2>
      <p>Susun pesananmu sendiri, langsung kirim ke WhatsApp kami dalam sekali klik.</p>
    </div>

    <div class="order-wrap">
      <form class="order-form" id="orderForm">

        <!-- Nama Pemesan -->
        <div class="order-group">
          <label for="orderName" class="order-label">Nama Pemesan</label>
          <input type="text" id="orderName" class="order-input" placeholder="Nama kamu" required>
        </div>

        <!-- Size -->
        <div class="order-group">
          <span class="order-label">Pilih Size</span>
          <div class="pill-group" id="sizeGroup">
            <button type="button" class="pill" data-name="Size M (Medium)" data-price="5000">M <em>5K</em></button>
            <button type="button" class="pill" data-name="Size L (Large)" data-price="7500">L <em>7.5K</em></button>
            <button type="button" class="pill" data-name="Size XL (Xangat Large)" data-price="10000">XL <em>10K</em></button>
            <button type="button" class="pill" data-name="Size XXL (Xangat Xangat Large)" data-price="15000">XXL <em>15K</em></button>
            <button type="button" class="pill" data-name="Size W (Wumbo)" data-price="20000">W <em>20K</em></button>
            <button type="button" class="pill" data-name="Size Segaban" data-price="45000">Segaban <em>45K</em></button>
            <button type="button" class="pill" data-name="Size Megalodon" data-price="90000">Megalodon <em>90K</em></button>
          </div>
        </div>

        <!-- Varian Rasa -->
        <div class="order-group">
          <span class="order-label">Varian Rasa <small>(boleh pilih lebih dari satu, bebas mix!)</small></span>
          <div class="chip-group" id="rasaGroup">
            <button type="button" class="chip" data-name="Original Gamon">Original Gamon</button>
            <button type="button" class="chip" data-name="BBQ">BBQ</button>
            <button type="button" class="chip" data-name="Balado">Balado</button>
            <button type="button" class="chip" data-name="Jagung Manis">Jagung Manis</button>
            <button type="button" class="chip" data-name="Rumput Laut">Rumput Laut</button>
            <button type="button" class="chip" data-name="Keju">Keju</button>
          </div>
        </div>

        <!-- Pilih Isian -->
        <div class="order-group">
          <span class="order-label">Pilih Isian <small>(boleh pilih lebih dari satu)</small></span>
          <div class="chip-group" id="isianGroup">
            <button type="button" class="chip" data-name="Makaroni Pipa">Makaroni Pipa</button>
            <button type="button" class="chip" data-name="Makaroni Spiral">Makaroni Spiral</button>
            <button type="button" class="chip" data-name="Mie Gulung">Mie Gulung</button>
            <button type="button" class="chip" data-name="Keripik Kaca">Keripik Kaca</button>
            <button type="button" class="chip" data-name="Jengkol">Jengkol</button>
            <button type="button" class="chip" data-name="Usus">Usus</button>
            <button type="button" class="chip" data-name="Usus Kering">Usus Kering</button>
            <button type="button" class="chip" data-name="Sosis">Sosis</button>
            <button type="button" class="chip" data-name="Kerupuk Seblak">Kerupuk Seblak</button>
            <button type="button" class="chip" data-name="Otak-otak">Otak-otak</button>
          </div>
        </div>

        <!-- Varian Minyak -->
        <div class="order-group">
          <span class="order-label">Varian Minyak <small>(boleh mix, Chili Oil +1K)</small></span>
          <div class="chip-group" id="minyakGroup">
            <button type="button" class="chip" data-name="Minyak Bawang" data-price="0">Minyak Bawang</button>
            <button type="button" class="chip" data-name="Chili Oil" data-price="1000">Chili Oil <em>+1K</em></button>
          </div>
        </div>

        <!-- Level Pedas -->
        <div class="order-group">
          <span class="order-label">Level Pedas <small>(1 - 5, gratis)</small></span>
          <div class="pill-group" id="levelGroup">
            <button type="button" class="pill pill-level" data-level="1">1</button>
            <button type="button" class="pill pill-level" data-level="2">2</button>
            <button type="button" class="pill pill-level" data-level="3">3</button>
            <button type="button" class="pill pill-level" data-level="4">4</button>
            <button type="button" class="pill pill-level" data-level="5">5</button>
          </div>
        </div>

        <!-- Tambahan Sendok Bumbu -->
        <div class="order-group">
          <span class="order-label">Tambahan Sendok Bumbu <small>(setelah sendok ke-5, +1K/sendok)</small></span>
          <div class="stepper" id="sendokStepper">
            <button type="button" class="stepper-btn" data-action="minus" aria-label="Kurangi">−</button>
            <span class="stepper-value" id="sendokValue">0</span>
            <button type="button" class="stepper-btn" data-action="plus" aria-label="Tambah">+</button>
          </div>
        </div>

        <!-- Catatan -->
        <div class="order-group">
          <label for="orderNote" class="order-label">Catatan Tambahan <small>(opsional)</small></label>
          <textarea id="orderNote" class="order-input" rows="3" placeholder="Contoh: request khusus, dll."></textarea>
        </div>

        <p class="order-error" id="orderError"></p>

      </form>

      <!-- Ringkasan Pesanan -->
      <aside class="order-summary" id="orderSummary">
        <h3>Ringkasan Pesanan</h3>
        <div class="summary-row">
          <span>Size</span>
          <strong id="sumSize">-</strong>
        </div>
        <div class="summary-row">
          <span>Rasa</span>
          <strong id="sumRasa">-</strong>
        </div>
        <div class="summary-row">
          <span>Isian</span>
          <strong id="sumIsian">-</strong>
        </div>
        <div class="summary-row">
          <span>Minyak</span>
          <strong id="sumMinyak">-</strong>
        </div>
        <div class="summary-row">
          <span>Level Pedas</span>
          <strong id="sumLevel">-</strong>
        </div>
        <div class="summary-row">
          <span>Sendok Tambahan</span>
          <strong id="sumSendok">0</strong>
        </div>
        <div class="summary-total">
          <span>Total</span>
          <strong id="sumTotal">Rp0</strong>
        </div>
        <button type="button" class="btn-primary order-submit" id="orderSubmit">Pesan Sekarang via WhatsApp</button>
        <p class="order-hint">Pesanan tersimpan otomatis di browser kamu.</p>
      </aside>
    </div>
  </section>
</main>

<!-- FOOTER -->
<footer class="site-footer scroll-animate fade-up">
  <div class="footer-top">
    <div class="footer-brand">
      <h2>MAKARONI GAMON</h2>
      <p>Bikin Nangis, Anti Redflag.</p>
    </div>
    <div class="footer-links">
      <h3>Menu Cepat</h3>
      <a href="#menu">Varian Rasa</a>
      <a href="#benefits">Keunggulan</a>
      <a href="#testimoni">Review Pelanggan</a>
    </div>
    <div class="footer-contact">
      <h3>Hubungi Kami</h3>
      <p>+62 858-0069-3356</p>
      <div class="social-icons">
        <a href="https://instagram.com/makaronigamon.id" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
        </a>
        <a href="https://tiktok.com/makaronigamon.id" title="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
            </svg>
        </a>
        <a href="https://wa.me/6285800693356" title="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
        </a>
      </div>
    </div>
  </div>
  <div class="footer-flame" aria-hidden="true">
    <img src="{{ asset('footer-gamon2.png') }}">
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Makaroni Gamon. All rights reserved.</p>
  </div>
</footer>

</body>
</html>
