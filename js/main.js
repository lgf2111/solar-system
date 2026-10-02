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
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star)
}
Array(3000).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
  sun.rotation.x += 0.00007;
  sun.rotation.y += 0.00007;
  sun.rotation.z += 0.00007;
  mercury.rotation.x += 0.0001;
  mercury.rotation.y += 0.0001;
  mercury.rotation.z += 0.0001;
  venus.rotation.x += 0.00006;
  venus.rotation.y += 0.00006;
  venus.rotation.z += 0.00006;
  earth.rotation.x += 0.001;
  earth.rotation.y += 0.001;
  earth.rotation.z += 0.001;
  mars.rotation.x += 0.0008;
  mars.rotation.y += 0.0008;
  mars.rotation.z += 0.0008;
  jupiter.rotation.x += 0.004;
  jupiter.rotation.y += 0.004;
  jupiter.rotation.z += 0.004;
  saturn.rotation.x += 0.0004;
  saturn.rotation.y += 0.0004;
  saturn.rotation.z += 0.0004;
  uranus.rotation.x += 0.02;
  uranus.rotation.y += 0.02;
  uranus.rotation.z += 0.02;
  neptune.rotation.x += 0.00007;
  neptune.rotation.y += 0.00007;
  neptune.rotation.z += 0.00007;
  ring.rotation.z += 0.00004;
  controls.update();
  renderer.render(scene, camera);
}

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(100, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(sunTextureUrl)
  })
);
scene.add(sun);
sun.position.x = -170;
sun.position.y = 120;

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(mercuryTextureUrl)
  })
);
mercury.position.x = -32.8;
mercury.position.y = 15;
scene.add(mercury);

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1.7, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(venusTextureUrl)
  })
);
venus.position.x = -37;
venus.position.y = 5;
scene.add(venus);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3.6, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(earthTextureUrl)
  })
);
earth.position.x = -15;
earth.position.y = 8;
scene.add(earth);

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2.9, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(marsTextureUrl)
  })
);
mars.position.x = -25;
mars.position.y = -6;
scene.add(mars);

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5.3, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(jupiterTextureUrl)
  })
);
jupiter.position.x = -4;
jupiter.position.y = -5.1;
scene.add(jupiter);

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(5, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(saturnTextureUrl)
  })
);
saturn.position.x = 21;
saturn.position.y = 7;
scene.add(saturn);

const ring = new THREE.Mesh(
  new THREE.RingGeometry(6, 10, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(ringTextureUrl),
    side: THREE.DoubleSide
  })
);
ring.position.x = 20.6;
ring.position.y = 7;
ring.rotation.x = -1.1;
ring.rotation.y = -0.3;
scene.add(ring);

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(2.8, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(uranusTextureUrl)
  })
);
uranus.position.x = 16.5;
uranus.position.y = -11;
scene.add(uranus);

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(2.8, 100, 100),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(neptuneTextureUrl)
  })
);
neptune.position.x = 43.5;
neptune.position.y = 1;
scene.add(neptune);
animate();