import * as THREE from 'three';
import * as main from "./main.js";

const raycaster = new THREE.Raycaster();
const rayMouse = new THREE.Vector2();

// Function to handle mouse clicks
function onMouseClick(event) {
    // Convert mouse position to normalized device coordinates (NDC)
    rayMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    rayMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(rayMouse, main.camera);

    // Find intersected objects
    const intersects = raycaster.intersectObjects(main.scene.children, true);

    // Check if any objects were clicked
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        console.log('Clicked object:', clickedObject.name || clickedObject.uuid);

        // Call your custom click function
        pingObject(clickedObject);
    }
}

// Add event listener for mouse clicks
document.addEventListener('click', onMouseClick, false);

// Custom function to handle object clicks
function pingObject(object) {
    // Example: Change the object's color
    if (object.name == "Cylinder") {
        object.material.color.r *= 1.1;
        object.material.color.g *= 1.1;
        object.material.color.b *= 1.1;
        setTimeout(()=>{
            object.material.color.r /= 1.1;
            object.material.color.g /= 1.1;
            object.material.color.b /= 1.1;
        }, 100);
    }
}