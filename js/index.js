// This nine-name list duplicates the VALID set in planet.js and must stay in sync.
let planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
let planetList = document.querySelector('.planet');
let showPlanets = false;

function togglePlanets() {
    if (!planetList) {
        return;
    }
    if (!showPlanets) {
        planetList.innerHTML = planets
            .map(planet => {
                const name = planet.charAt(0).toUpperCase() + planet.slice(1);
                if (planet === 'sun') {
                    return `<li><button data-planet="${planet}">${name} (Star)</button></li>`;
                }
                return `<li><button data-planet="${planet}">${name}</button></li>`;
            })
            .join('');
        showPlanets = true;
    } else {
        planetList.innerHTML = '';
        showPlanets = false;
    }
}

function openPlanetPage(planet) {
    window.open(`planet.html?planet=${encodeURIComponent(planet)}`, '_self');
}

function handlePlanetClick(event) {
    const button = event.target.closest('button[data-planet]');
    if (button) {
        const planet = button.getAttribute('data-planet');
        openPlanetPage(planet);
    }
}

function setupEventListeners() {
    const toggle = document.querySelector('.planets');
    if (toggle) {
        toggle.addEventListener('click', togglePlanets);
    }
    if (planetList) {
        planetList.addEventListener('click', handlePlanetClick);
    }
}

setupEventListeners();
