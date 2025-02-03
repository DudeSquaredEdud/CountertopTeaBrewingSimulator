/**
 * Interact - for right click interactions
 * 
 */

// import * as THREE from 'three';
import * as cam from "./camera.js";



export function interact(object){
    // Pick up mug
    if (object.name == "Cylinder"){
        if (!object.hand) {
            object.position.set(0,0.0,0);
            object.position.set(-5,1,-2);
            object.hand = true;
        }
        else {
            object.position.set(0,0.5,0);
            object.hand = false;
        }
    }
    if (object.name == "Sky"){
        if(!object.look){
            cam.windowPos();
            object.look = true;
        }
        else {
            cam.neutralPos();
            object.look = false;
        }
    }
}