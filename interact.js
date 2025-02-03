/**
 * Interact - for right click interactions
 * 
 */

// import * as THREE from 'three';
import * as cam from "./camera.js";
import * as main from "./main.js";



export function interact(object){
    switch(object.name){
        case "Water":
        case "Mug":
            object = main.scene.getObjectByName("mug_model");
            if (!object.hand) {
                object.position.set(0,4,3);
                object.hand = true;
            }
            else {
                object.position.set(0,3.5,-2);
                object.hand = false;
            }
        break;
        case "Sky":
            if(!object.look){
                cam.windowPos();
                object.look = true;
            }
            else {
                cam.neutralPos();
                object.look = false;
            }
        break;
    }


}