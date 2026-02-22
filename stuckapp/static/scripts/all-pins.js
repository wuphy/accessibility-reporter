document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([53.38, -1.47], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 1. Setup the Color/Severity Mapping
    const getIcon = (severity) => {
        let color = 'blue'; // Default
        if (severity === 1) color = 'green';
        if (severity === 2) color = 'gold';
        if (severity === 3) color = 'red';

        return new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    };

    // 2. The Array of Objects
    // In Flask, you'd inject this with: const places = {{ pins_data | tojson }};
    const places = [
        { coords: [53.3811, -1.4701], message: "Sheffield Park", severity: 1, time: "09:00" },
        { coords: [53.38, -1.46], message: "Construction Zone", severity: 3, time: "14:20" },
        { coords: [53.39, -1.48], message: "Dimly Lit Path", severity: 2, time: "21:00" }
    ];
    
    // 3. Loop and Add Pins
    places.forEach(p => {
        const marker = L.marker(p.coords, { icon: getIcon(p.severity) }).addTo(map);
        
        // Tooltip shows the message on hover
        marker.bindTooltip(`<b>${p.message}</b>`);

        // Popup shows full details on click
        marker.bindPopup(`
            <div style="font-family: sans-serif;">
                <strong>Message:</strong> ${p.message}<br>
                <strong>Reported:</strong> ${p.time}<br>
                <strong>Severity:</strong> ${p.severity}/3
            </div>
        `);
    });
// 1. Create a global array to store marker objects
let allMarkers = [];

// 2. Modified Loop
places.forEach(p => {
    const marker = L.marker(p.coords, { icon: getIcon(p.severity) });
    
    // Attach the severity to the marker object so we can find it later
    marker.severity = p.severity; 
    
    marker.addTo(map);
    marker.bindTooltip(`<b>${p.message}</b>`);
    
    // Add to our tracker array
    allMarkers.push(marker);
});

// 3. The Filter Function
function filterMarkers(severityLevel) {
    allMarkers.forEach(marker => {
        // If 'all' is selected, or the level matches, show it. Otherwise, hide it.
        if (severityLevel === 'all' || marker.severity == severityLevel) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}
    // // 4. Handle Clicks (for adding new pins)
    // const myMarker = L.marker([0, 0]);
    // map.on('click', function(e) {
    //     myMarker.setLatLng(e.latlng).addTo(map);
    //     myMarker.bindPopup(`Add a new report at:<br>${e.latlng.toString()}`).openPopup();
    // });
});