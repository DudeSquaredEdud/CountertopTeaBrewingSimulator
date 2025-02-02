import * as THREE from 'three';

// Light!
export function standardLight(scene) {
    const ambientLight = new THREE.AmbientLight(0xffeeff, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xfaaa50, 1.1);
    directionalLight.position.set(0, 4, -4).normalize();
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xefeacc, 0x6c9cac, .5);
    scene.add(hemisphereLight);
}
