import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Setup loader
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, 1500);
});

// 1. Scene Setup
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.02); // Deep cinematic dark fog

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 15);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.setClearColor(0x050505, 1);

// Generate Realistic Reflections (HDRI Alternative)
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// 2. Materials
const goldGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd4af37,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.9, // glass-like property
    ior: 1.5,
    thickness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
});

const darkMatterMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 1.0,
    roughness: 0.2,
    clearcoat: 0.8
});

// 3. Objects
const objects = [];

// Hero Object (Centerpiece)
const heroGeo = new THREE.IcosahedronGeometry(2.5, 0);
const heroMesh = new THREE.Mesh(heroGeo, goldGlassMaterial);
scene.add(heroMesh);
objects.push(heroMesh);

// Floating ambient objects
const geometries = [
    new THREE.TorusGeometry(0.8, 0.2, 16, 100),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.TetrahedronGeometry(0.8, 0),
    new THREE.SphereGeometry(0.6, 32, 32)
];

for(let i = 0; i < 25; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = Math.random() > 0.4 ? goldGlassMaterial : darkMatterMaterial;
    const mesh = new THREE.Mesh(geo, mat);
    
    // Spread around
    mesh.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15 - 5
    );
    
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    
    const scale = Math.random() * 0.5 + 0.5;
    mesh.scale.set(scale, scale, scale);
    
    scene.add(mesh);
    objects.push({ 
        mesh, 
        speed: Math.random() * 0.02 + 0.005, 
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        offsetY: Math.random() * Math.PI * 2
    });
}

// Particle System (Glowing Dust)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 40;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.08,
    color: 0xd4af37,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// 4. Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xd4af37, 2, 30);
pointLight.position.set(3, 4, 5);
scene.add(pointLight);

const blueLight = new THREE.PointLight(0x4444ff, 1, 30);
blueLight.position.set(-5, -3, -5);
scene.add(blueLight);

// 5. Scroll Animations with GSAP
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
});

// Move camera and hero object as we scroll down
tl.to(heroMesh.rotation, { x: Math.PI * 4, y: Math.PI * 4 }, 0)
  .to(heroMesh.position, { y: 5, z: -10 }, 0)
  .to(camera.position, { y: -15, z: 5 }, 0);

// Animate UI Elements appearing
gsap.utils.toArray('.glass-panel').forEach(panel => {
    gsap.from(panel, {
        scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });
});

// 6. Mouse Parallax
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
});

// 7. Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Hero Object Float
    heroMesh.position.y += Math.sin(elapsedTime * 2) * 0.003;
    heroMesh.rotation.x += 0.002;
    heroMesh.rotation.y += 0.003;

    // Floating Ambient Objects
    for(let i = 1; i < objects.length; i++) {
        const obj = objects[i];
        if (obj.mesh) {
            obj.mesh.position.y += Math.sin(elapsedTime * 1.5 + obj.offsetY) * 0.002;
            obj.mesh.rotateOnAxis(obj.axis, obj.speed);
        }
    }

    // Particles Rotate
    particlesMesh.rotation.y = elapsedTime * 0.03;

    // Mouse Parallax Damping
    targetX = mouseX * 3;
    targetY = mouseY * 3;
    camera.position.x += 0.05 * (targetX - camera.position.x);
    camera.position.y += 0.05 * (-targetY - camera.position.y);
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();

// 8. Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});