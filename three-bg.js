import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// CANVAS
const canvas = document.querySelector("#three-bg");

if (!canvas) {
    console.error("Three.js canvas not found.");
} else {

// SCENE
const scene = new THREE.Scene();

// DISTANT 3D STARFIELD
const starCount = 1800;
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;

    starPositions[i3] = (Math.random() - 0.5) * 180;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 120;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 100 - 35;
}

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
    color: "#c4b5fd",
    size: 0.12,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true,
    depthWrite: false
});

const distantStars = new THREE.Points(starGeometry, starMaterial);
scene.add(distantStars);

// BRIGHT FEATURE STARS
const brightStarCount = 35;
const brightStarPositions = new Float32Array(brightStarCount * 3);

for (let i = 0; i < brightStarCount; i++) {
    const i3 = i * 3;

    brightStarPositions[i3] = (Math.random() - 0.5) * 140;
    brightStarPositions[i3 + 1] = (Math.random() - 0.5) * 90;
    brightStarPositions[i3 + 2] = (Math.random() - 0.5) * 70 - 20;
}

const brightStarGeometry = new THREE.BufferGeometry();
brightStarGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(brightStarPositions, 3)
);

const brightStarMaterial = new THREE.PointsMaterial({
    color: "#ffffff",
    size: 0.28,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    depthWrite: false
});

const brightStars = new THREE.Points(
    brightStarGeometry,
    brightStarMaterial
);

scene.add(brightStars);
// CAMERA
const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.z = 35;
camera.position.y = 12;
camera.lookAt(0, 0, 0);

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power"
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);

// GALAXY GROUP
const galaxy = new THREE.Group();
scene.add(galaxy);

// GALAXY PARTICLES
const particleCount = 5000;

const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const colorPurple = new THREE.Color("#a855f7");
const colorBlue = new THREE.Color("#6366f1");

for (let i = 0; i < particleCount; i++) {

    const i3 = i * 3;

    const arm = i % 4;
    const radius = Math.random() * 25;

    const angle =
        (arm / 4) * Math.PI * 2 +
        radius * 0.18 +
        (Math.random() - 0.5) * 0.7;

    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = (Math.random() - 0.5) * 2.5;
    positions[i3 + 2] = Math.sin(angle) * radius;

    const mixedColor = colorPurple.clone().lerp(
        colorBlue,
        Math.random()
    );

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
}

// GEOMETRY
const galaxyGeometry = new THREE.BufferGeometry();

galaxyGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

galaxyGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
);

// MATERIAL
const galaxyMaterial = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    depthWrite: false
});

// GALAXY
const galaxyParticles = new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

galaxy.add(galaxyParticles);

// GLOWING GALAXY CORE
const coreGeometry = new THREE.SphereGeometry(1.2, 32, 32);

const coreMaterial = new THREE.MeshBasicMaterial({
    color: "#c084fc",
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const galaxyCore = new THREE.Mesh(coreGeometry, coreMaterial);
galaxy.add(galaxyCore);

// OUTER ATMOSPHERIC HALO
const haloGeometry = new THREE.SphereGeometry(2.8, 32, 32);

const haloMaterial = new THREE.MeshBasicMaterial({
    color: "#9333ea",
    transparent: true,
    opacity: 0.07,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const galaxyHalo = new THREE.Mesh(haloGeometry, haloMaterial);
galaxy.add(galaxyHalo);

// 3D ORBITAL RING
const ringGeometry = new THREE.TorusGeometry(3.5, 0.025, 8, 120);

const ringMaterial = new THREE.MeshBasicMaterial({
    color: "#c084fc",
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const galaxyRing = new THREE.Mesh(ringGeometry, ringMaterial);
galaxyRing.rotation.x = Math.PI / 2;
galaxy.add(galaxyRing);

// MOUSE INTERACTION
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {

    mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;

    mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;

});

// SHOOTING STAR
const shootingStarGeometry = new THREE.BufferGeometry();

shootingStarGeometry.setFromPoints([
    new THREE.Vector3(-2, 0.5, 0),
    new THREE.Vector3(2, -0.5, 0)
]);

const shootingStarMaterial = new THREE.LineBasicMaterial({
    color: "#e9d5ff",
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
});

const shootingStar = new THREE.Line(
    shootingStarGeometry,
    shootingStarMaterial
);

shootingStar.visible = false;
scene.add(shootingStar);

let shootingStarActive = false;
let shootingStarStart = 0;
let nextShootingStar = 5;

// ANIMATION
const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    
    brightStarMaterial.opacity = 0.65 + Math.sin(elapsed * 1.8) * 0.25;
    distantStars.rotation.y = elapsed * 0.003;
distantStars.rotation.x = Math.sin(elapsed * 0.15) * 0.015;
galaxyCore.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.12);
galaxyHalo.scale.setScalar(1 + Math.sin(elapsed * 0.8) * 0.08);
galaxyRing.rotation.z = elapsed * 0.3;
galaxyRing.rotation.x = Math.PI / 2 + Math.sin(elapsed * 0.5) * 0.12;
    galaxy.rotation.y = elapsed * 0.025;
galaxy.rotation.x = -0.45;

    galaxy.rotation.x +=
        (mouseY * 0.08 - galaxy.rotation.x) * 0.01;

    galaxy.rotation.z +=
        (mouseX * 0.08 - galaxy.rotation.z) * 0.01;

    renderer.render(scene, camera);
}

animate();

// RESPONSIVE RESIZING
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

});

}