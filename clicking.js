/**
 * Clicking - for handling right/left click events.
 */


import * as THREE from 'three';
import * as main from "./main.js";
import * as interact from "./interact.js";

const raycaster = new THREE.Raycaster();
const rayMouse = new THREE.Vector2();


function raycastIntersect(event){
    rayMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    rayMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(rayMouse, main.camera);

    // Find intersected objects
    return raycaster.intersectObjects(main.scene.children, true);
}

// Function to handle mouse clicks
function onLeftMouseClick(event) {
    const intersects = raycastIntersect(event)

    // Check if any objects were clicked
    if (intersects.length > 0 && event.ctrlKey) {
        const clickedObject = intersects[0].object;
        console.log('Left clicked object:', clickedObject.name || clickedObject.uuid, clickedObject, clickedObject.material);

        pingObject(clickedObject);
    }
}

document.addEventListener('click', onLeftMouseClick, false);


// Function to handle mouse clicks
function onRightMouseClick(event) {
    event.preventDefault();
    const intersects = raycastIntersect(event);

    // Check if any objects were clicked
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        console.log('Right Clicked object:', clickedObject.name || clickedObject.uuid);

        interact.interact(clickedObject);
    }

}
document.addEventListener('contextmenu', onRightMouseClick, false);

// Custom function to handle object clicks
function pingObject(object) {
    let pingValue = 1.2;
        object.material.color.r *= pingValue;
        object.material.color.g *= pingValue;
        object.material.color.b *= pingValue;
        setTimeout(()=>{
            object.material.color.r /= pingValue;
            object.material.color.g /= pingValue;
            object.material.color.b /= pingValue;
        }, 100);
}