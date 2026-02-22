let allMarkers = [];
let map; 

function filterMarkers(severityLevel) {
    console.log("Filtering for:", severityLevel); // Debugging
    allMarkers.forEach(marker => {
        if (severityLevel === 'all' || marker.severity == severityLevel) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Assign map to the global variable
    map = L.map('map').setView([53.38, -1.47], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const getIcon = (severity) => {
        let color = 'blue';
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

    const places = [
        { coords: [53.3752, -1.4721], message: "Missing dropped curb", severity: 2, time: "2026-02-22 08:15" },
        { coords: [53.3825, -1.4650], message: "Broken elevator at station", severity: 3, time: "2026-02-22 09:30" },
        { coords: [53.3780, -1.4810], message: "Step-only entrance to shop", severity: 3, time: "2026-02-22 10:05" },
        { coords: [53.3850, -1.4580], message: "Pavement blocked by bins", severity: 1, time: "2026-02-22 10:45" },
        { coords: [53.3712, -1.4920], message: "Inaccessible public toilet", severity: 2, time: "2026-02-22 11:20" },
        { coords: [53.3895, -1.4750], message: "Tactile paving missing", severity: 2, time: "2026-02-22 12:00" },
        { coords: [53.3730, -1.4600], message: "Extremely steep gradient", severity: 2, time: "2026-02-22 12:45" },
        { coords: [53.3800, -1.4450], message: "Broken crossing signal audio", severity: 3, time: "2026-02-22 13:10" },
        { coords: [53.3950, -1.4900], message: "Narrow pavement for wheelchair", severity: 2, time: "2026-02-22 14:00" },
        { coords: [53.3860, -1.4780], message: "No handrails on steep stairs", severity: 2, time: "2026-02-22 14:50" },
        { coords: [53.3775, -1.4550], message: "Bus stop ramp malfunctioning", severity: 3, time: "2026-02-22 15:20" },
        { coords: [53.3830, -1.4850], message: "Uneven paving stones", severity: 1, time: "2026-02-22 16:00" },
        { coords: [53.3910, -1.4680], message: "Heavy manual doors only", severity: 2, time: "2026-02-22 16:35" },
        { coords: [53.3745, -1.4830], message: "Overhanging low branches", severity: 1, time: "2026-02-22 17:15" },
        { coords: [53.3880, -1.4520], message: "Lift out of service", severity: 3, time: "2026-02-22 17:50" },
        { coords: [53.3790, -1.4950], message: "Pothole in disabled bay", severity: 2, time: "2026-02-22 18:20" },
        { coords: [53.3845, -1.4420], message: "Counter too high for service", severity: 1, time: "2026-02-22 19:00" },
        { coords: [53.3920, -1.4880], message: "Construction blocking ramp", severity: 3, time: "2026-02-22 19:45" },
        { coords: [53.3760, -1.4620], message: "Cobblestone street (vibration)", severity: 1, time: "2026-02-22 20:10" },
        { coords: [53.3875, -1.4730], message: "Wait time too long for lift", severity: 1, time: "2026-02-22 20:50" },
        { coords: [53.3815, -1.4590], message: "Signage blocking pathway", severity: 1, time: "2026-02-22 21:30" }
    ];

    function getIssues() {
        $.ajax({
            url: '/get_issues',
            method: 'POST',
            success: (result) => {drawPins(result)},
            error: (error) => {console.error("Error fetching issues:", error);}
        });
    }

    function drawPins(issues) {
        console.log("Received issues:", issues); // Debugging
        issues.issues.forEach(p => {
            const marker = L.marker(p.coords, { icon: getIcon(p.severity) });
            
            marker.severity = p.severity; // Store for filtering

            marker.bindTooltip(`<b>${p.message}</b>`);
            marker.bindPopup(`
                <div style="font-family: sans-serif;">
                    <strong>Message:</strong> ${p.message}<br>
                    <strong>Reported:</strong> ${p.time}<br>
                    <strong>Severity:</strong> ${p.severity}/3
                </div>
            `);

            marker.addTo(map);
            allMarkers.push(marker);
        });
    }

    getIssues();

    places.forEach(p => {
        const marker = L.marker(p.coords, { icon: getIcon(p.severity) });
        
        marker.severity = p.severity; // Store for filtering

        marker.bindTooltip(`<b>${p.message}</b>`);
        marker.bindPopup(`
            <div style="font-family: sans-serif;">
                <strong>Message:</strong> ${p.message}<br>
                <strong>Reported:</strong> ${p.time}<br>
                <strong>Severity:</strong> ${p.severity}/3
            </div>
        `);

        marker.addTo(map);
        allMarkers.push(marker);
    });
});