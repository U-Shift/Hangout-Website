document.addEventListener('DOMContentLoaded', () => {
    
    // Parallax Effect for Hero Elements
    const heroSection = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.hero-text-area, .floating-element');

    if(heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            parallaxElements.forEach(el => {
                const depth = parseFloat(el.getAttribute('data-depth')) || 0.2;
                
                // Add a smooth transform
                const x = moveX * depth * 50; 
                const y = moveY * depth * 50;

                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            parallaxElements.forEach(el => {
                el.style.transform = `translate(0px, 0px)`;
                el.style.transition = 'transform 0.5s ease-out';
            });
            setTimeout(() => {
                parallaxElements.forEach(el => {
                    el.style.transition = '';
                });
            }, 500);
        });
    }

    // 3D Tilt Effect for Feature Cards
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });

    // Subtly change nav style on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = '0 10px 30px rgba(11, 19, 43, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.6)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(11, 19, 43, 0.08)';
        }
    });

    // Initialize Leaflet Map
    setTimeout(() => {
        if (document.getElementById('hangout-map') && typeof L !== 'undefined') {
            const map = L.map('hangout-map', {
                center: [52, 10],
                zoom: 4,
                zoomControl: true,
                scrollWheelZoom: false,
                attributionControl: true
            });

            // Light, clean tile layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap &copy; CARTO',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            const pilotColor = '#00CED1'; // Teal
            const observerColor = '#0B132B'; // Navy

            function makeIcon(color, size) {
                const r = size / 2;
                const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
                  <circle cx='${r}' cy='${r}' r='${r - 2}' fill='${color}' stroke='white' stroke-width='2.5'/>
                  <circle cx='${r}' cy='${r}' r='${r - 6}' fill='white' opacity='0.35'/>
                </svg>`;
                return L.divIcon({ html: svg, className: '', iconSize: [size, size], iconAnchor: [r, r] });
            }

            function makeRingIcon(color, size) {
                const r = size / 2;
                const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
                  <circle cx='${r}' cy='${r}' r='${r - 3}' fill='none' stroke='${color}' stroke-width='3' stroke-dasharray='4 3'/>
                  <circle cx='${r}' cy='${r}' r='${r / 2 - 1}' fill='${color}' opacity='0.7'/>
                </svg>`;
                return L.divIcon({ html: svg, className: '', iconSize: [size, size], iconAnchor: [r, r] });
            }

            // Pilot Cities
            L.marker([38.7169, -9.1395], { icon: makeIcon(pilotColor, 28) }).addTo(map).bindPopup('Lisbon');
            L.marker([55.7132, 11.7132], { icon: makeIcon(pilotColor, 28) }).addTo(map).bindPopup('Holbæk');

            // Observer Cities
            L.marker([41.3544, 2.0895], { icon: makeRingIcon(observerColor, 26) }).addTo(map).bindPopup('Cornellà de Llobregat');
            L.marker([59.8341, 10.4392], { icon: makeRingIcon(observerColor, 26) }).addTo(map).bindPopup('Asker');

            const bounds = L.latLngBounds([[38.7, -9.2], [55.8, 11.8], [41.3, 2.0], [59.9, 10.4]]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, 500);
});
