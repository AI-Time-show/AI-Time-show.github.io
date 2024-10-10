// Initialize Three.js Scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
);
let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Add Lights
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Placeholder for Neural Network
let networkGroup = new THREE.Group();
scene.add(networkGroup);

// Function to Create Neural Network Nodes
function createNode(x, y, z) {
    let geometry = new THREE.SphereGeometry(0.5, 16, 16);
    let material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    networkGroup.add(sphere);
}

// Generate Sample Neural Network
for (let i = 0; i < 100; i++) {
    createNode(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Scroll-based Interaction with GSAP
gsap.registerPlugin(ScrollTrigger);

// Create Scroll-triggered Animation
gsap.to(networkGroup.rotation, {
    x: Math.PI * 2,
    scrollTrigger: {
        trigger: '#canvas',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

gsap.to(camera.position, {
    z: 10,
    scrollTrigger: {
        trigger: '#canvas',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

gsap.to('#info', {
    opacity: 0,
    scrollTrigger: {
        trigger: '#canvas',
        start: 'top top',
        end: 'center center',
        scrub: true
    }
});

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
