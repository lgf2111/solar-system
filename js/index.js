// Drives the home-page planet browser in the shared bottom nav. The 9 planet
// buttons are static markup in index.html (data-planet="<name>"); this script
// toggles the popover, keeps aria-expanded in sync, closes on Escape / outside
// click, and delegates clicks to navigate to planet.html?planet=<name>.
const toggle = document.querySelector('#planet-toggle');
const menu = document.querySelector('#planet-menu');

function openMenu() {
  if (!menu || !toggle) return;
  menu.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (!menu || !toggle) return;
  menu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  if (!menu) return;
  if (menu.hidden) {
    openMenu();
  } else {
    closeMenu();
  }
}

function openPlanetPage(planet) {
  window.open(`planet.html?planet=${encodeURIComponent(planet)}`, '_self');
}

function handlePlanetClick(event) {
  const button = event.target.closest('button[data-planet]');
  if (button) {
    openPlanetPage(button.getAttribute('data-planet'));
  }
}

if (toggle && menu) {
  toggle.addEventListener('click', toggleMenu);
  menu.addEventListener('click', handlePlanetClick);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (menu.hidden) return;
    if (!menu.contains(event.target) && event.target !== toggle) {
      closeMenu();
    }
  });
}
