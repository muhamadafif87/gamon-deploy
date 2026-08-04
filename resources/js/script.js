document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Effect
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Call once on load
  handleScroll();

  // 2. Scroll Reveal Animation using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: Stop observing once revealed if you only want it to happen once
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.scroll-animate');
  animateElements.forEach(el => observer.observe(el));

  // 3. Testimonial Slider
  function createSlider(trackSelector, dotsSelector, delay) {
    const track = document.querySelector(trackSelector);
    const dotsContainer = document.querySelector(dotsSelector);
    if (!track) return;

    const slides = track.children;
    const count = slides.length;
    let index = 0;
    let timer = null;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goTo(i);
          restart();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      [...dotsContainer.children].forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    }

    function goTo(i) {
      index = i;
      track.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    function next() {
      index = (index + 1) % count;
      goTo(index);
    }

    function start() {
      timer = setInterval(next, delay);
    }

    function restart() {
      clearInterval(timer);
      start();
    }

    start();

    const wrapper = track.parentElement;
    wrapper.addEventListener('mouseenter', () => clearInterval(timer));
    wrapper.addEventListener('mouseleave', start);
  }

  createSlider('#testiTrack', '#testiDots', 4000);

  // 4. FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all accordions first (optional, for auto-collapse behavior)
      accordionItems.forEach(acc => acc.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Floating snack fan interaction
  const snackCards = document.querySelectorAll('.floating-snack');
  let topZ = snackCards.length + 20; // nilai awal z-index tertinggi

  snackCards.forEach(card => {
    // simpan z-index default dari CSS
    card.dataset.baseZ = getComputedStyle(card).zIndex;

    card.addEventListener('click', () => {
      // reset semua card ke posisi default
      snackCards.forEach(item => {
        item.classList.remove('is-active');
        item.style.zIndex = item.dataset.baseZ;
      });

      // aktifkan card yang diklik
      card.classList.add('is-active');
      card.style.zIndex = ++topZ; // naikkan z-index supaya paling atas
    });
  });

  // set default card pertama aktif
  if (snackCards.length) {
    snackCards[0].classList.add('is-active');
    snackCards[0].style.zIndex = ++topZ;
  }

  // 6. Ngemilmu info carousel (swipe cards with dot sync)
  (function ngemilmuCarousel() {
    const track = document.getElementById('ngemilmuTrack');
    const dotsContainer = document.getElementById('ngemilmuDots');
    if (!track || !dotsContainer) return;

    const cards = [...track.children];
    dotsContainer.innerHTML = '';

    cards.forEach((card, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsContainer.appendChild(dot);
    });

    const dots = [...dotsContainer.children];

    const syncActiveDot = () => {
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
      dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
    };

    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(syncActiveDot, 80);
    }, { passive: true });
  })();

  // 7. Mulai Pesan - order form logic
  (function orderForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;

    const WA_NUMBER = '6285800693356';

    const nameInput = document.getElementById('orderName');
    const noteInput = document.getElementById('orderNote');
    const sizeGroup = document.getElementById('sizeGroup');
    const rasaGroup = document.getElementById('rasaGroup');
    const isianGroup = document.getElementById('isianGroup');
    const minyakGroup = document.getElementById('minyakGroup');
    const levelGroup = document.getElementById('levelGroup');
    const sendokValueEl = document.getElementById('sendokValue');
    const errorEl = document.getElementById('orderError');
    const submitBtn = document.getElementById('orderSubmit');

    const sumSize = document.getElementById('sumSize');
    const sumRasa = document.getElementById('sumRasa');
    const sumIsian = document.getElementById('sumIsian');
    const sumMinyak = document.getElementById('sumMinyak');
    const sumLevel = document.getElementById('sumLevel');
    const sumSendok = document.getElementById('sumSendok');
    const sumTotal = document.getElementById('sumTotal');

    const STORAGE_KEY = 'gamon_current_order';
    const HISTORY_KEY = 'gamon_orders_history';

    let state = {
      name: '',
      size: null,        // { name, price }
      rasa: [],          // [name, ...]
      isian: [],         // [name, ...]
      minyak: [],        // [{ name, price }]
      level: null,
      sendokExtra: 0,
      note: ''
    };

    function formatRupiah(num) {
      return 'Rp' + num.toLocaleString('id-ID');
    }

    function calcTotal() {
      let total = state.size ? state.size.price : 0;
      state.minyak.forEach(m => total += m.price);
      total += state.sendokExtra * 1000;
      return total;
    }

    function renderSummary() {
      sumSize.textContent = state.size ? state.size.name.replace('Size ', '') : '-';
      sumRasa.textContent = state.rasa.length ? state.rasa.join(', ') : '-';
      sumIsian.textContent = state.isian.length ? state.isian.join(', ') : '-';
      sumMinyak.textContent = state.minyak.length ? state.minyak.map(m => m.name).join(', ') : '-';
      sumLevel.textContent = state.level ? `Level ${state.level}` : '-';
      sumSendok.textContent = state.sendokExtra;
      sumTotal.textContent = formatRupiah(calcTotal());
    }

    function saveToLocalStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Gagal menyimpan pesanan ke localStorage:', e);
      }
    }

    function loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };

        if (nameInput) nameInput.value = state.name || '';
        if (noteInput) noteInput.value = state.note || '';

        if (state.size) {
          const btn = [...sizeGroup.children].find(b => b.dataset.name === state.size.name);
          if (btn) btn.classList.add('active');
        }
        state.rasa.forEach(name => {
          const btn = [...rasaGroup.children].find(b => b.dataset.name === name);
          if (btn) btn.classList.add('active');
        });
        state.isian.forEach(name => {
          const btn = [...isianGroup.children].find(b => b.dataset.name === name);
          if (btn) btn.classList.add('active');
        });
        state.minyak.forEach(m => {
          const btn = [...minyakGroup.children].find(b => b.dataset.name === m.name);
          if (btn) btn.classList.add('active');
        });
        if (state.level) {
          const btn = [...levelGroup.children].find(b => Number(b.dataset.level) === Number(state.level));
          if (btn) btn.classList.add('active');
        }
        if (sendokValueEl) sendokValueEl.textContent = state.sendokExtra || 0;
      } catch (e) {
        console.error('Gagal memuat pesanan tersimpan:', e);
      }
    }

    // Size selection (single select)
    sizeGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill');
      if (!btn) return;
      [...sizeGroup.children].forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.size = { name: btn.dataset.name, price: Number(btn.dataset.price) };
      renderSummary();
      saveToLocalStorage();
    });

    // Rasa selection (multi select)
    rasaGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      btn.classList.toggle('active');
      const name = btn.dataset.name;
      if (btn.classList.contains('active')) {
        if (!state.rasa.includes(name)) state.rasa.push(name);
      } else {
        state.rasa = state.rasa.filter(r => r !== name);
      }
      renderSummary();
      saveToLocalStorage();
    });

    // Isian selection (multi select)
    isianGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      btn.classList.toggle('active');
      const name = btn.dataset.name;
      if (btn.classList.contains('active')) {
        if (!state.isian.includes(name)) state.isian.push(name);
      } else {
        state.isian = state.isian.filter(r => r !== name);
      }
      renderSummary();
      saveToLocalStorage();
    });

    // Minyak selection (multi select)
    minyakGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      btn.classList.toggle('active');
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price || 0);
      if (btn.classList.contains('active')) {
        if (!state.minyak.find(m => m.name === name)) state.minyak.push({ name, price });
      } else {
        state.minyak = state.minyak.filter(m => m.name !== name);
      }
      renderSummary();
      saveToLocalStorage();
    });

    // Level selection (single select)
    levelGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-level');
      if (!btn) return;
      [...levelGroup.children].forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.level = Number(btn.dataset.level);
      renderSummary();
      saveToLocalStorage();
    });

    // Sendok tambahan stepper
    const sendokStepper = document.getElementById('sendokStepper');
    if (sendokStepper) {
      sendokStepper.addEventListener('click', (e) => {
        const btn = e.target.closest('.stepper-btn');
        if (!btn) return;
        if (btn.dataset.action === 'plus') {
          state.sendokExtra += 1;
        } else if (btn.dataset.action === 'minus') {
          state.sendokExtra = Math.max(0, state.sendokExtra - 1);
        }
        sendokValueEl.textContent = state.sendokExtra;
        renderSummary();
        saveToLocalStorage();
      });
    }

    // Nama & catatan
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        state.name = nameInput.value;
        saveToLocalStorage();
      });
    }
    if (noteInput) {
      noteInput.addEventListener('input', () => {
        state.note = noteInput.value;
        saveToLocalStorage();
      });
    }

    function buildWaMessage() {
        const lines = [];
        lines.push(`*Pesanan Baru*`);
        lines.push(`Halo Makaroni Gamon, saya ingin memesan:`);
        lines.push('');
        lines.push(`Nama Pemesan: ${state.name || '-'}`);
        lines.push(`Size: ${state.size ? state.size.name : '-'}`);
        lines.push(`Rasa: ${state.rasa.length ? state.rasa.join(', ') : '-'}`);
        lines.push(`Isian: ${state.isian.length ? state.isian.join(', ') : '-'}`);
        lines.push(`Minyak: ${state.minyak.length ? state.minyak.map(m => m.name).join(', ') : '-'}`);
        lines.push(`Level Pedas: ${state.level || '-'}`);
        lines.push(`Sendok Bumbu Tambahan: ${state.sendokExtra || '-'}`);
        if (state.note) lines.push(`Catatan: ${state.note}`);
        lines.push('');
        lines.push(`Total Bayar: ${formatRupiah(calcTotal())}`);
        lines.push('');
        lines.push(`Mohon konfirmasi alamat & metode pembayaran.`);
        lines.push(`Terima kasih`);
        return lines.join('\n');
    }

    function validate() {
      if (!state.name || !state.name.trim()) return 'Mohon isi nama pemesan dulu ya.';
      if (!state.size) return 'Pilih size dulu ya.';
      if (!state.rasa.length) return 'Pilih minimal 1 varian rasa.';
      if (!state.isian.length) return 'Pilih minimal 1 isian.';
      if (!state.minyak.length) return 'Pilih minimal 1 varian minyak.';
      if (!state.level) return 'Pilih level pedas dulu ya.';
      return null;
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const errorMsg = validate();
        if (errorMsg) {
          errorEl.textContent = errorMsg;
          return;
        }
        errorEl.textContent = '';

        // Simpan ke riwayat pesanan di localStorage
        try {
          const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
          history.push({ ...state, total: calcTotal(), timestamp: new Date().toISOString() });
          localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        } catch (e) {
          console.error('Gagal menyimpan riwayat pesanan:', e);
        }

        const message = encodeURIComponent(buildWaMessage());
        const waUrl = `https://wa.me/${WA_NUMBER}?text=${message}`;
        window.open(waUrl, '_blank');
      });
    }

    loadFromLocalStorage();
    renderSummary();
  })();
});
