document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map if map container exists
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Initialize Leaflet map
        const map = L.map('map').setView([40.712776, -74.005974], 13); // Default to NYC coordinates
        
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add a marker for the business location
        const marker = L.marker([40.712776, -74.005974]).addTo(map);
        
        // Add a popup to the marker
        marker.bindPopup(`
            <strong>ElectroTools Headquarters</strong><br>
            123 Electrical Avenue<br>
            Power City, PC 12345<br>
            <a href="https://maps.google.com/?q=40.712776,-74.005974" target="_blank">Get Directions</a>
        `).openPopup();
        
        // Fix map display issue after initialization
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
        
        // Recalculate map size when location tab becomes visible
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#location') {
                link.addEventListener('click', function() {
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 400);
                });
            }
        });
    }
});
