/**
 * Lights - for handling lights.
 */

import * as THREE from 'three';

// Light!
export function standardLight(scene) {
    const ambientLight = new THREE.AmbientLight(0xffeeff, .2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xfaaa50, 1.1);
    directionalLight.position.set(0, 7, 0);
    scene.add(directionalLight);

    const otherdirectionalLight = new THREE.DirectionalLight(0xfaaa50, 1.1);
    directionalLight.position.set(0, 7, 5);
    scene.add(otherdirectionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xefeacc, 0x6c9cac, .5);
    scene.add(hemisphereLight);
}


export function ambientOnly(scene) {
    const ambientLight = new THREE.AmbientLight(0xffeeff, .2);
    scene.add(ambientLight);
}
