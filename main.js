document.addEventListener('DOMContentLoaded', () => {
  const TEL_DOR  = [32.6167, 34.9183];
  const YAHYA    = [32.609191, 34.916522];
  const SATELLITE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  // Full-page map (map.html)
  if (document.getElementById('map')) {
    const map = L.map('map').fitBounds([TEL_DOR, YAHYA], { padding: [60, 60] });
    L.tileLayer(SATELLITE, {
      attribution: 'Tantura Map &mdash; via Leaflet',
      maxZoom: 19,
    }).addTo(map);
    const overlay1 = L.imageOverlay(
      'img/Tantura Overlay-Map-03.png',
      [[32.602629, 34.911965], [32.620741590558126, 34.9231799614365]],
      { opacity: 0.5 }
    ).addTo(map);

    const overlay2 = L.imageOverlay(
      'img/Tantura_1938.jpg',
      [[32.581489, 34.910974], [32.635227, 34.948354]],
      { opacity: 0.5 }
    ).addTo(map);

    const makeOverlayControl = (overlay, label) => L.Control.extend({
      options: { position: 'topleft' },
      onAdd() {
        const container = L.DomUtil.create('div', 'overlay-control');
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        container.innerHTML = `
          <span class="overlay-label">${label}</span>
          <input class="overlay-slider" type="range" min="0" max="1" step="0.01" value="0.5" />
        `;
        container.querySelector('.overlay-slider').addEventListener('input', e => {
          overlay.setOpacity(parseFloat(e.target.value));
        });
        return container;
      }
    });

    const overlay3 = L.imageOverlay(
      'img/Tantura Overlay-Map-1946.png',
      [[32.599189, 34.901754], [32.629142, 34.934484]],
      { opacity: 0.5 }
    ).addTo(map);

    L.marker([32.618683, 34.916221]).addTo(map).bindPopup('Horse wash');

    new (makeOverlayControl(overlay3, 'Tantura, 1946'))().addTo(map);
    new (makeOverlayControl(overlay1, 'British survey map, 1942'))().addTo(map);
    new (makeOverlayControl(overlay2, 'Tantura, 1938'))().addTo(map);

    L.marker(TEL_DOR)
      .addTo(map)
      .bindPopup('<b>Tantura, Palestine</b><br>This is where Tantura once was. On 22 May 1948, during the Nakba, the population of Al-Tantura was forcibly displaced by Zionist military forces. Today, the place where Al Tantura once stood has been built over to make way for Israeli construction. Its original inhabitants and their descendants are prevented from returning by Israel.')
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
