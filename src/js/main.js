import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

window.addEventListener("DOMContentLoaded", function() {
    // Configuración básica de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 500 / 500, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(1500, 1500);
    const modelLeo = document.querySelector("#modelLeo");
    modelLeo.appendChild(renderer.domElement);
    
    // Iluminación
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    
    // Variable para almacenar el modelo cargado
    let model;
    
    // Variables para el control del giro
    let isMouseDown = false;
    let previousMouseX = 0;
    const maxRotation = Math.PI / 5; // Limite de rotación (+/- 22.5 grados)
    
    // Cargar el modelo GLB
    const loader = new GLTFLoader();
    loader.load('2508.glb', function (gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0); // Mantener el modelo fijo en un punto
        model.scale.set(1, 1, 1);
        scene.add(model);
    
        animate();
    }, undefined, function (error) {
        console.error('Error al cargar el modelo:', error);
    });
    
    // Posiciona la cámara
    camera.position.z = 6;
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const minRotationY = -Math.PI / 4; // Límite de rotación hacia la izquierda
    const maxRotationY = Math.PI / 4;
    // Eventos del mouse
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    // Eventos táctiles
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length === 1) {
            isDragging = true;
            previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
    });
    
    document.addEventListener('touchmove', (event) => {
        if (isDragging && event.touches.length === 1) {
            const deltaMove = {
                x: event.touches[0].clientX - previousMousePosition.x
            };
    
            model.rotation.y += deltaMove.x * 0.005;
            model.rotation.y = Math.max(minRotationY, Math.min(maxRotationY, model.rotation.y));
    
            previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            needsRender = true;
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    function onMouseDown(event) {
        isMouseDown = true;
        previousMouseX = event.clientX;
    }
    
    function onMouseUp() {
        isMouseDown = false;
    }
    
    let needsRender = true;

    function animate() {
        if (needsRender) {
            renderer.render(scene, camera);
            needsRender = false;  // Solo renderiza cuando sea necesario
        }
        requestAnimationFrame(animate);
    }
    function onMouseMove(event) {
        if (isMouseDown && model) {
            const deltaX = event.clientX - previousMouseX;
            const newRotation = model.rotation.y + deltaX * 0.005;
    
            if (newRotation > -maxRotation && newRotation < maxRotation) {
                model.rotation.y = newRotation;
                needsRender = true;  // Se necesita renderizado
            }
    
            previousMouseX = event.clientX;
        }
    }
    
    window.addEventListener('resize', () => {
        const width = 500;
        const height = 500;
        if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            needsRender = true;
        }
    });

})