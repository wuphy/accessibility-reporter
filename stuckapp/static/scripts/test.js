document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([53.38, -1.47], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    window.sessionStorage.setItem("coords", null);
    window.sessionStorage.setItem("locationSelected", false);

    const myMarker = L.marker([53.38, -1.47]);

    map.on('click', function(e) {
        myMarker.setLatLng(e.latlng).addTo(map);
        // const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        myMarker.bindPopup(
        `Lat: ${e.latlng.lat.toFixed(5)}<br>Lng: ${e.latlng.lng.toFixed(5)}`
        ).openPopup();      
        selectedCoords = [e.latlng.lat, e.latlng.lng];

        window.sessionStorage.setItem("coords", JSON.stringify(selectedCoords));
        window.sessionStorage.setItem("locationSelected", true);
        console.log("Selected Location:", selectedCoords);
    }); 
});