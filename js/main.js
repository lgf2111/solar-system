import '../css/main.css'
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import sunTextureUrl from '../images/texture/sun.jpg';
import mercuryTextureUrl from '../images/texture/mercury.jpg';
import venusTextureUrl from '../images/texture/venus.jpg';
import earthTextureUrl from '../images/texture/earth.jfif';
import marsTextureUrl from '../images/texture/mars.jpg';
import jupiterTextureUrl from '../images/texture/jupiter.jfif';
import saturnTextureUrl from '../images/texture/saturn.jfif';
import ringTextureUrl from '../images/texture/ring.jfif';
import uranusTextureUrl from '../images/texture/uranus.jpg';
import neptuneTextureUrl from '../images/texture/neptune.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Single shared loader + a shared non-fatal error callback for all ten texture
// loads (nine spheres + the ring). A failed load leaves the mesh untextured and
// logs one console.warn naming the URL; nothing is thrown and the loop keeps running.
const loader = new THREE.TextureLoader();
const onTexError = (url) => (err) => console.warn(`[solar-system] texture failed to load: ${url}`, err);

const BODIES = [
  { name: 'sun', radius: 100, pos: [-170, 120], texture: sunTextureUrl, spin: 0.00007 },
  { name: 'mercury', radius: 2, pos: [-32.8, 15], texture: mercuryTextureUrl, spin: 0.0001 },
  { name: 'venus', radius: 1.7, pos: [-37, 5], texture: venusTextureUrl, spin: 0.00006 },
  { name: 'earth', radius: 3.6, pos: [-15, 8], texture: earthTextureUrl, spin: 0.001 },
  { name: 'mars', radius: 2.9, pos: [-25, -6], texture: marsTextureUrl, spin: 0.0008 },
  { name: 'jupiter', radius: 5.3, pos: [-4, -5.1], texture: jupiterTextureUrl, spin: 0.004 },
  { name: 'saturn', radius: 5, pos: [21, 7], texture: saturnTextureUrl, spin: 0.0004 },
  { name: 'uranus', radius: 2.8, pos: [16.5, -11], texture: uranusTextureUrl, spin: 0.02 },
  { name: 'neptune', radius: 2.8, pos: [43.5, 1], texture: neptuneTextureUrl, spin: 0.00007 },
];

BODIES.forEach((body) => {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(body.radius, 100, 100),
    new THREE.MeshBasicMaterial({
      map: loader.load(body.texture, undefined, undefined, onTexError(body.texture))
    })
  );
  mesh.position.x = body.pos[0];
  mesh.position.y = body.pos[1];
  scene.add(mesh);
  body.mesh = mesh;
});

// Saturn ring — special case (RingGeometry + double-sided material), same shared
// loader and onTexError as the spheres.
const ring = new THREE.Mesh(
  new THREE.RingGeometry(6, 10, 100),
  new THREE.MeshBasicMaterial({
    map: loader.load(ringTextureUrl, undefined, undefined, onTexError(ringTextureUrl)),
    side: THREE.DoubleSide
  })
);
ring.position.x = 20.6;
ring.position.y = 7;
ring.rotation.x = -1.1;
ring.rotation.y = -0.3;
scene.add(ring);

// Starfield — one THREE.Points cloud replacing 3000 individual meshes.
const starCount = 3000;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starPositions.length; i++) {
  starPositions[i] = THREE.MathUtils.randFloatSpread(1000);
}
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, sizeAttenuation: true })
);
scene.add(stars);

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  BODIES.forEach((body) => {
    body.mesh.rotation.y += body.spin;
  });
  ring.rotation.z += 0.00004;
  controls.update();
  renderer.render(scene, camera);
}

// call animate() last — it reads BODIES/ring/controls from scope, so everything
// above must be constructed before this invocation to avoid a TDZ error.
animate();
