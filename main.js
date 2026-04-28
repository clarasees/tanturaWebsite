document.addEventListener('DOMContentLoaded', () => {
  const TEL_DOR  = [32.6167, 34.9183];
  const YAHYA    = [32.609191, 34.916522];
  const SATELLITE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  // Full-page map (map.html)
  if (document.getElementById('map')) {
    const map = L.map('map').fitBounds([TEL_DOR, YAHYA], { padding: [60, 60] });
    L.tileLayer(SATELLITE, {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
      maxZoom: 19,
    }).addTo(map);
    L.marker(TEL_DOR)
      .addTo(map)
      .bindPopup('<b>This is Tantura</b><br>an ancient port city, now in present day Tel Dor (Hebrew of Tantura)')
      .openPopup();
    L.marker(YAHYA)
      .addTo(map)
      .bindPopup(`
        <b>The Yahya Family Home</b>
        <p>The tragedy of the massacre is woven into the memory of the village of Tantura and the Yahya family home, built by XXX in 1882. During the Nakba, Israeli soldiers perpetrated horrific violence in this very place, violently killing men of the village after lining them up behind this home.</p>
        <p>And yet, fishing families of Tantura and their children and grandchildren who are not allowed to return to live in their village still come and fish in these waters, storing their fishing nets, boats, and materials in the Yahya family home. Occupying and using the space despite the Israeli government's efforts to strip them of their heritage and the right to enter the home on the beach is a way to prevent the erasure of the village and people of Tantura from memory and to create presence instead of historicization.</p>
        <p><i>Palestinian Fishing:</i> The mastery of the sea required sophisticated manual skill. The fishermen of Al-Tantura were experts in weaving the "Shabaka Fardiya" (the individual net), a specialized tool that allowed for precision in the shallow and rocky coastal waters.</p>
      `);
  }

  // Hero map preview (index.html)
  const heroMapEl = document.getElementById('hero-map');
  if (heroMapEl) {
    heroMapEl.addEventListener('click', () => {
      document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = 'map.html'; }, 500);
    });
    document.querySelector('.hero').addEventListener('mouseenter', () => {
      const heroMap = L.map('hero-map', { zoomControl: false, attributionControl: false })
        .fitBounds([TEL_DOR, YAHYA], { padding: [20, 20] });
      L.tileLayer(SATELLITE, { maxZoom: 19 }).addTo(heroMap);
      L.marker(TEL_DOR).addTo(heroMap);
      L.marker(YAHYA).addTo(heroMap);
    }, { once: true });
  }

  // Landing page enter animation + colour trigger
  const landing = document.querySelector('body.page-landing');
  if (landing) {
    landing.classList.add('page-enter');
    requestAnimationFrame(() => requestAnimationFrame(() => landing.classList.remove('page-enter')));
    document.addEventListener('mousemove', () => landing.classList.add('cursor-active'), { once: true });
  }

  // Synced scroll + scrollbar visibility for EN/AR panels
  const panelEn = document.querySelector('.panel-en');
  const panelAr = document.querySelector('.panel-ar');
  if (panelEn && panelAr) {
    let lock = null;
    const sync = (a, b) => a.addEventListener('scroll', () => {
      if (lock === a) return;
      lock = b;
      b.scrollTop = a.scrollTop;
      requestAnimationFrame(() => { lock = null; });
    });
    sync(panelEn, panelAr);
    sync(panelAr, panelEn);

    [panelEn, panelAr].forEach(p => {
      let t;
      p.addEventListener('scroll', () => {
        p.classList.add('is-scrolling');
        clearTimeout(t);
        t = setTimeout(() => p.classList.remove('is-scrolling'), 800);
      });
    });
  }

  // About panel EN/AR toggle (map.html, life.html)
  const panel = document.getElementById('about-panel');
  if (panel) {
    const btnEn = document.getElementById('lang-en');
    const btnAr = document.getElementById('lang-ar');
    const translatables = panel.querySelectorAll('[data-ar]');
    translatables.forEach(el => { el.dataset.en = el.textContent; });

    const setLang = (isAr) => {
      translatables.forEach(el => { el.textContent = isAr ? el.dataset.ar : el.dataset.en; });
      panel.dir = isAr ? 'rtl' : '';
      btnAr.classList.toggle('active', isAr);
      btnEn.classList.toggle('active', !isAr);
    };
    btnAr.addEventListener('click', () => setLang(true));
    btnEn.addEventListener('click', () => setLang(false));
  }
});
