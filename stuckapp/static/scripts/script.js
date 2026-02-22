document.addEventListener('DOMContentLoaded', function() {
    console.log(document.getElementById("mainForm"));

    var selectedSeverity = null;

    document.getElementById('mainForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        let coordinates = window.sessionStorage.getItem("coords");
        let locationSelected = window.sessionStorage.getItem("locationSelected");

        document.getElementById("locationInput").setAttribute("value", coordinates);

        if (!locationSelected) {
            alert("Please select a location on the map before submitting.");
            return;
        }
        const severity = selectedSeverity;
        const details = document.querySelector('textarea[name="details"]').value;
        const data = {
            severity: severity,
            details: details,
            location: coordinates
        };
        console.log("Form Data:", data);

        this.submit();
    });

    document.querySelector("#green").addEventListener("click", e => {
        e.preventDefault();
        console.log(e);
        selectedSeverity = 1;
        document.getElementById("severityInput").setAttribute("value", 1);
        document.querySelector("#green").classList.add("selected");
        document.querySelector("#yellow").classList.remove("selected");
        document.querySelector("#red").classList.remove("selected");    
    });

    document.querySelector("#yellow").addEventListener("click", e => {
        e.preventDefault();
        console.log(e);
        selectedSeverity = 2;
        document.getElementById("severityInput").setAttribute("value", 2);
        document.querySelector("#yellow").classList.add("selected");
        document.querySelector("#green").classList.remove("selected");
        document.querySelector("#red").classList.remove("selected");
    });

    document.querySelector("#red").addEventListener("click", e => {
        e.preventDefault();
        console.log(e);
        selectedSeverity = 3;
        document.getElementById("severityInput").setAttribute("value", 3);
        document.querySelector("#red").classList.add("selected");
        document.querySelector("#green").classList.remove("selected");
        document.querySelector("#yellow").classList.remove("selected");
    });


});