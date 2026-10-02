import planetData from './planetData.json';

// Extract data from planetData
const planetDict = planetData.planetDict;
const funFact = planetData.funFact;

// DOM references
const header = document.querySelector('#name');
const title = document.querySelector('#title');
const spec = document.querySelector('.spec');
const img = document.querySelector('.img');
const fact = document.querySelector('#fact');

// Get planet name from URL query param
const planet = new URLSearchParams(location.search).get('planet');

// This nine-name list duplicates the planets array in index.js and must stay in sync.
const VALID = new Set(['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);

// Validation FIRST: return before any image URL/injection/dict access on the not-found path.
if (!planet || !VALID.has(planet) || !planetDict[planet]) {
    document.title = 'Planet not found';
    header.innerText = 'Planet not found';
    title.innerText = 'Planet not found';
    spec.innerHTML = '<a href="index.html">The Solar System</a>';
} else {
    const planetNameCapitalized = planet.charAt(0).toUpperCase() + planet.slice(1);

    // Update header and title
    header.innerText += ` ${planetNameCapitalized}`;
    title.innerText += ` ${planetNameCapitalized}`;

    // Update planet image
    const imgUrl = new URL(`/images/planets/${planet}.png`, import.meta.url);
    img.innerHTML = `<img src="${imgUrl}" alt="${planetNameCapitalized}" width="180">`;

    // Update planet specifications
    spec.innerHTML += `Planet Name: ${planetNameCapitalized}`;
    spec.innerHTML += `<br>Size: ${planetDict[planet]['size']}kg`;
    spec.innerHTML += `<br>Diameter: ${planetDict[planet]['diameter']}km`;
    spec.innerHTML += `<br>Rotation Speed: ${planetDict[planet]['rotation']}km/h`;
    if (planet !== 'sun') {
        spec.innerHTML += `<br>Distance to the Sun: ${planetDict[planet]['perihelion'] / 1000000}mil km`;
    }

    // Update fun fact
    fact.innerHTML += `<h3>Fun Fact</h3><hr><p>${funFact[planet][Math.floor(Math.random() * funFact[planet].length)]}</p>`;

    // Change fun fact
    function changeFact() {
        fact.innerHTML = `<h3>Fun Fact</h3><hr><p>${funFact[planet][Math.floor(Math.random() * funFact[planet].length)]}</p>`;
    }

    document.querySelector('#more-facts')?.addEventListener('click', changeFact);
}
