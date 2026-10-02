// This nine-name list duplicates the VALID set in planet.js and must stay in sync.
let planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
let planetList = document.querySelector('.planet');
let showPlanets = false;

function togglePlanets() {
    if (!showPlanets) {
        planetList.innerHTML = planets
            .map(planet => {
                if (planet === 'sun') {
                    return `<li id=${planet}>${planet.charAt(0).toUpperCase() + planet.slice(1)} (Star)</li>`;
                }
                return `<li id=${planet}>${planet.charAt(0).toUpperCase() + planet.slice(1)}</li>`;
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
    if (event.target && event.target.matches('li')) {
        const planet = event.target.id;
        openPlanetPage(planet);
    }
}

function setupEventListeners() {
    document.querySelector(".planets").addEventListener("click", togglePlanets);
    planetList.addEventListener("click", handlePlanetClick);
}

setupEventListeners();
