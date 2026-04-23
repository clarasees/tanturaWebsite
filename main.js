document.addEventListener('DOMContentLoaded', () => {
  const TEL_DOR = [32.6167, 34.9183];

  const map = L.map('map').setView(TEL_DOR, 17);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  L.marker(TEL_DOR)
    .addTo(map)
    .bindPopup('<b>Tel Dor</b><br>Ancient port city, Carmel Coast, Israel')
    .openPopup();
});
