/**
 * Interact - for right click interactions
 * 
 */

// import * as THREE from 'three';
import * as cam from "./camera.js";
import * as main from "./main.js";

export function click_interact(object){
    let mug = main.scene.getObjectByName("mug_model");
    let water = main.scene.getObjectByName("Water");
    switch(object.name){
        // THE MUG
        case "Water":
        case "Mug":
            if (!mug.hand) {
                mug.position.set(0,4,3);
                mug.hand = true;
            }
            else {
                mug.position.set(0,3.5,-2);
                mug.hand = false;
            }
        break;
        // THE SKY
        case "Sky":
            if(!object.look){
                cam.windowPos();
                if (mug.hand) cam.windowPos(mug,[0,-2,-3]);
                object.look = true;
            }
            else {
                cam.neutralPos();
                if (mug.hand) cam.neutralPos(false, mug, [0,-2.5,-3]);
                object.look = false;
            }
        break;
        // THE LAKE
        case "Lake":
            if (mug.hand){
                water.material.visible = true;
            }
        break;
        // THE LEAVES
        case "LeavesLeft":
        case "LeavesMiddle":
        case "LeavesRight":
            if (water.material.visible == true && mug.hand == true){
                water.material.color.r *= 0.8;
                water.material.color.g *= 1.1;
                water.material.color.b *= 0.8;

                water.material.color.r -= 0.1;
                water.material.color.g -= 0.1;
                water.material.color.b -= 0.1;
            }
        break;
    }


}