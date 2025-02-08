/**
 * Clicking - for handling right/left click events.
 */


import * as THREE from 'three';
import * as main from "./main.js";
import * as interact from "./interact.js";

export const raycaster = new THREE.Raycaster();



let center = new THREE.Vector2(0,0);
export function raycastIntersectFromCenter(event){
    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(center, main.camera);
    // Find intersected objects
    return raycaster.intersectObjects(main.scene.children, true);
}

let waistHeight = new THREE.Vector3(0,-4,0);
let waistRot = new THREE.Vector3(0,-1,0);
let waist_cam;

export function raycastIntersectFromWaist(event){
    // Update the raycaster with the camera and mouse position
    waist_cam = main.camera.clone();
    waist_cam.position.add(waistHeight);
    waist_cam.rotation.y += waistRot;

    raycaster.setFromCamera(center, waist_cam);
    // Find intersected objects
    return raycaster.intersectObjects(main.scene.children, true);
}

// Function to handle mouse clicks
function onRightMouseClick(event) {
    event.preventDefault();
    const intersects = raycastIntersectFromCenter(event)

    // Check if any objects were clicked
    if (intersects.length > 0) {
        // If control was held
        const clickedObject = intersects[0];
        if(event.shiftKey){
            console.log('Right clicked object:', clickedObject);
            pingObject(clickedObject);
        }
        else{
            if(clickedObject.rightClick){
                clickedObject.rightClick();
            }
        }
    }
}

// Function to handle mouse clicks
function onLeftMouseClick(event) {
    const intersects = raycastIntersectFromCenter(event);
    
    // Check if any objects were clicked
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        console.log('Left Clicked object:', clickedObject.name || clickedObject.uuid);
        
        interact.click_interact(clickedObject);
    }
}

function onMouseDown(e)
{
    if (e.button === 0)
    {
        onLeftMouseClick(e)
    }

    if (e.button === 2)
    {
        onRightMouseClick(e)
    }

}

window.addEventListener('mousedown', onMouseDown);
document.addEventListener('contextmenu', e => e?.cancelable && e.preventDefault());




// Custom function to handle object clicks
export function pingObject(object) {
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