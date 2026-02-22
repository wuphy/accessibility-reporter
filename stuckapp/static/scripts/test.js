document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([53.38, -1.47], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add pins
    const places = [
    { name: "Sheffield Park", coords: [53.3811, -1.4701] },
    { name: "Work", coords: [53.38, -1.46] }
    ];

    places.forEach(p => {
    L.marker(p.coords)
        .addTo(map)
        .bindPopup(p.name);
    });

    map.on('click', function(e) {
        const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        marker.bindPopup(
        `Lat: ${e.latlng.lat.toFixed(5)}<br>Lng: ${e.latlng.lng.toFixed(5)}`
        ).openPopup();      
    });

    map.on('click', function(e) {
    const marker = L.marker(e.latlng).addTo(map);
    marker.on('click', function() {
        map.removeLayer(marker);
    });
});
});