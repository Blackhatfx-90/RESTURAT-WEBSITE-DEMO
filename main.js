import * as THREE from 'three';

// 1. Sleek Dark 3D Background Setup
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 1); // Pure black

// 2. High-End 3D Particles (Gold/Silver Dust)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create a subtle glow texture programmatically
const pCanvas = document.createElement('canvas');
pCanvas.width = 16; pCanvas.height = 16;
const pCtx = pCanvas.getContext('2d');
const gradient = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
gradient.addColorStop(0.2, 'rgba(212, 175, 55, 0.8)'); // Gold tint
gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
pCtx.fillStyle = gradient;
pCtx.fillRect(0,0,16,16);
const pTex = new THREE.CanvasTexture(pCanvas);

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.3,
    map: pTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// 3. Central Abstract 3D Object (Sleek Dark Metallic)
const torusGeo = new THREE.TorusKnotGeometry(10, 3, 200, 32);
const torusMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.9,
    roughness: 0.2,
    wireframe: true,
    transparent: true,
    opacity: 0.15
});
const torus = new THREE.Mesh(torusGeo, torusMat);
scene.add(torus);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xd4af37, 2, 50); // Gold light
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// 4. Animation Loop
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Subtle particle rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Torus rotation
    torus.rotation.y = elapsedTime * 0.1;
    torus.rotation.x = elapsedTime * 0.1;

    // Camera Parallax based on mouse
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();

// 5. Scroll Animation (Parallax)
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    particlesMesh.position.y = scrollY * 0.01;
    torus.position.y = scrollY * 0.02;
});

// Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 6. DOM Initializations (VanillaTilt)
document.addEventListener("DOMContentLoaded", () => {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        scale: 1.02
    });
});