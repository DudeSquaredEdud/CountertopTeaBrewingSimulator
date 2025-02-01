import * as THREE from 'three';
export class ezpz{
    static add_mesh(scene, geometry, material) {
        scene.add(new THREE.Mesh(geometry, material))
    }
}