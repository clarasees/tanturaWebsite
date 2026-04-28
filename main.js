document.addEventListener('DOMContentLoaded', () => {
  // Map — only runs on pages that include the Leaflet div
  if (document.getElementById('map')) {
    const TEL_DOR = [32.6167, 34.9183];
    const map = L.map('map').setView(TEL_DOR, 17);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    L.marker(TEL_DOR)
      .addTo(map)
      .bindPopup('<b>This is Tantura</b><br>an ancient port city, now in present day Tel Dor (Hebrew of Tantura)')
      .openPopup();
  }

  // About panel language toggle
  const panel = document.getElementById('about-panel');
  if (!panel) return;

  const btnEn = document.getElementById('lang-en');
  const btnAr = document.getElementById('lang-ar');
  if (!btnEn || !btnAr) return;

  const translatables = panel.querySelectorAll('[data-ar]');
  translatables.forEach(el => { el.dataset.en = el.textContent; });

  btnAr.addEventListener('click', () => {
    translatables.forEach(el => { el.textContent = el.dataset.ar; });
    panel.setAttribute('dir', 'rtl');
    btnAr.classList.add('active');
    btnEn.classList.remove('active');
  });

  btnEn.addEventListener('click', () => {
    translatables.forEach(el => { el.textContent = el.dataset.en; });
    panel.removeAttribute('dir');
    btnEn.classList.add('active');
    btnAr.classList.remove('active');
  });
});
