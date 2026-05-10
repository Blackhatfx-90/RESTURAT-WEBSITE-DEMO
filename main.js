import * as THREE from 'three';

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
scene.fog = new THREE.FogExp2(0x120a06, 0.025); // Warm dark smoky fog

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 12);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
renderer.setClearColor(0x120a06, 1);

// 2. Embers / Fire Particles (Tandoor / Cooking Vibe)
const emberCount = 800;
const emberGeometry = new THREE.BufferGeometry();
const emberPos = new Float32Array(emberCount * 3);
const emberSpeeds = new Float32Array(emberCount);
const emberWobble = new Float32Array(emberCount);

for(let i=0; i<emberCount; i++) {
    emberPos[i*3] = (Math.random() - 0.5) * 30; // x
    emberPos[i*3+1] = (Math.random() - 0.5) * 30 - 10; // y
    emberPos[i*3+2] = (Math.random() - 0.5) * 20; // z
    emberSpeeds[i] = Math.random() * 0.03 + 0.01;
    emberWobble[i] = Math.random() * Math.PI * 2;
}
emberGeometry.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
emberGeometry.setAttribute('speed', new THREE.BufferAttribute(emberSpeeds, 1));
emberGeometry.setAttribute('wobble', new THREE.BufferAttribute(emberWobble, 1));

// Create a glowing circular texture for embers
const canvas2d = document.createElement('canvas');
canvas2d.width = 32; canvas2d.height = 32;
const ctx = canvas2d.getContext('2d');
const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
gradient.addColorStop(0, 'rgba(255, 220, 100, 1)');
gradient.addColorStop(0.2, 'rgba(255, 100, 0, 0.8)');
gradient.addColorStop(1, 'rgba(0,0,0,0)');
ctx.fillStyle = gradient;
ctx.fillRect(0,0,32,32);
const emberTexture = new THREE.CanvasTexture(canvas2d);

const emberMaterial = new THREE.PointsMaterial({
    size: 0.5,
    map: emberTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    color: 0xff6600
});
const emberParticles = new THREE.Points(emberGeometry, emberMaterial);
scene.add(emberParticles);

// 3. Floating Spices / Leaves (Authentic food vibe)
const spiceCount = 300;
const spiceGeo = new THREE.BufferGeometry();
const spicePos = new Float32Array(spiceCount * 3);
const spiceColors = new Float32Array(spiceCount * 3);
const colorPalettes = [
    new THREE.Color(0xe5b35c), // Turmeric / Saffron
    new THREE.Color(0x8b2b1a), // Red Chili
    new THREE.Color(0x3e4f1a)  // Coriander / Mint green
];

for(let i=0; i<spiceCount; i++) {
    spicePos[i*3] = (Math.random() - 0.5) * 25;
    spicePos[i*3+1] = (Math.random() - 0.5) * 25;
    spicePos[i*3+2] = (Math.random() - 0.5) * 15;
    
    const col = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    spiceColors[i*3] = col.r;
    spiceColors[i*3+1] = col.g;
    spiceColors[i*3+2] = col.b;
}
spiceGeo.setAttribute('position', new THREE.BufferAttribute(spicePos, 3));
spiceGeo.setAttribute('color', new THREE.BufferAttribute(spiceColors, 3));

// Create a diamond/leaf shape texture
const leafCanvas = document.createElement('canvas');
leafCanvas.width = 32; leafCanvas.height = 32;
const lctx = leafCanvas.getContext('2d');
lctx.fillStyle = "white";
lctx.beginPath();
lctx.moveTo(16, 0); lctx.lineTo(32, 16); lctx.lineTo(16, 32); lctx.lineTo(0, 16);
lctx.fill();
const spiceTexture = new THREE.CanvasTexture(leafCanvas);

const spiceMat = new THREE.PointsMaterial({
    size: 0.3,
    map: spiceTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false
});
const spiceParticles = new THREE.Points(spiceGeo, spiceMat);
scene.add(spiceParticles);

// 4. Centerpiece: Golden Traditional Mandala / Plate
const mandalaGroup = new THREE.Group();

const goldMat = new THREE.MeshStandardMaterial({
    color: 0xe5b35c, metalness: 0.6, roughness: 0.4
});
const darkMat = new THREE.MeshStandardMaterial({
    color: 0x8b2b1a, metalness: 0.2, roughness: 0.8
});

// Outer Ring
const ringGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 100);
const ring = new THREE.Mesh(ringGeo, goldMat);
mandalaGroup.add(ring);

// Inner decorative petals
for(let i=0; i<12; i++) {
    const petalGeo = new THREE.SphereGeometry(1.2, 32, 16);
    petalGeo.scale(1, 0.05, 2.5);
    const petal = new THREE.Mesh(petalGeo, i % 2 === 0 ? goldMat : darkMat);
    petal.position.x = Math.cos((i / 12) * Math.PI * 2) * 2;
    petal.position.y = Math.sin((i / 12) * Math.PI * 2) * 2;
    petal.rotation.z = (i / 12) * Math.PI * 2;
    mandalaGroup.add(petal);
}

// Glowing Center (Like a Diya/Lamp)
const diyaGeo = new THREE.SphereGeometry(0.8, 32, 32);
const diyaMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0xff6600, emissiveIntensity: 2
});
const diya = new THREE.Mesh(diyaGeo, diyaMat);
mandalaGroup.add(diya);

// Subtle glow aura behind the mandala
const auraGeo = new THREE.PlaneGeometry(12, 12);
const auraMat = new THREE.MeshBasicMaterial({
    map: emberTexture, transparent: true, opacity: 0.3, color: 0xff4400, depthWrite: false
});
const aura = new THREE.Mesh(auraGeo, auraMat);
aura.position.z = -1;
mandalaGroup.add(aura);

scene.add(mandalaGroup);

// 5. Lights
const ambientLight = new THREE.AmbientLight(0x553322, 1.5); // Warm ambient
scene.add(ambientLight);

const fireLight = new THREE.PointLight(0xff4400, 4, 30); // Fire glow from below
fireLight.position.set(0, -5, 2);
scene.add(fireLight);

const rimLight = new THREE.PointLight(0xe5b35c, 2, 20); // Gold rim light from top
rimLight.position.set(0, 5, -2);
scene.add(rimLight);

// 6. Scroll Animations with GSAP
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
});

// Camera and Mandala movement on scroll
tl.to(mandalaGroup.rotation, { x: Math.PI * 1.5, y: Math.PI * 0.5, z: Math.PI }, 0)
  .to(mandalaGroup.position, { y: 6, z: -8 }, 0)
  .to(camera.position, { y: -8, z: 8 }, 0);

gsap.utils.toArray('.glass-panel').forEach(panel => {
    gsap.from(panel, {
        scrollTrigger: { trigger: panel, start: "top 85%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 1.2, ease: "power2.out"
    });
});

// 7. Mouse Parallax
let mouseX = 0; let mouseY = 0;
let targetX = 0; let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
});

// 8. Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Mandala slow rotation and floating
    mandalaGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.002;
    mandalaGroup.rotation.z -= 0.002;

    // Embers (Rise up and wobble)
    const ePos = emberGeometry.attributes.position.array;
    for(let i=0; i<emberCount; i++) {
        ePos[i*3+1] += emberSpeeds[i]; // Move up
        ePos[i*3] += Math.sin(elapsedTime * 2 + emberWobble[i]) * 0.01; // Wobble X
        
        // Reset to bottom if they go too high
        if(ePos[i*3+1] > 15) {
            ePos[i*3+1] = -15;
            ePos[i*3] = (Math.random() - 0.5) * 30;
        }
    }
    emberGeometry.attributes.position.needsUpdate = true;

    // Spices (Slowly float and swirl)
    spiceParticles.rotation.y = elapsedTime * 0.05;
    spiceParticles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

    // Mouse Parallax Damping
    targetX = mouseX * 2;
    targetY = mouseY * 2;
    camera.position.x += 0.05 * (targetX - camera.position.x);
    camera.position.y += 0.05 * (-targetY - camera.position.y);
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();

// 9. Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});