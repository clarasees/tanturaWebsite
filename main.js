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

    L.marker([32.609191, 34.916522])
      .addTo(map)
      .bindPopup(`
        <b>The Yahya Family Home</b>
        <p>The tragedy of the massacre is woven into the memory of the village of Tantura and the Yahya family home, built by XXX in 1882. During the Nakba, Israeli soldiers perpetrated horrific violence in this very place, violently killing men of the village after lining them up behind this home.</p>
        <p>And yet, fishing families of Tantura and their children and grandchildren who are not allowed to return to live in their village still come and fish in these waters, storing their fishing nets, boats, and materials in the Yahya family home. Occupying and using the space despite the Israeli government's efforts to strip them of their heritage and the right to enter the home on the beach is a way to prevent the erasure of the village and people of Tantura from memory and to create presence instead of historicization.</p>
        <p><i>Palestinian Fishing:</i> The mastery of the sea required sophisticated manual skill. The fishermen of Al-Tantura were experts in weaving the "Shabaka Fardiya" (the individual net), a specialized tool that allowed for precision in the shallow and rocky coastal waters.</p>
      `);
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
