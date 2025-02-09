/**
 * Interact - for right click interactions
 * 
 */

// import * as THREE from 'three';
import * as cam from "./camera.js";
import * as main from "./main.js";
import * as model from './modelLoading.js';

var sip = new Audio('sounds/sip.mp3');
var slurp = new Audio('sounds/slurp.mp3');
var shrimp = new Audio('sounds/shrimp.mp3');

shrimp.isPlaying = false;
shrimp.onended = () => {
    shrimp.pause();
    shrimp.currentTime = 0;
};

export function click_interact(object){
    let mug = main.scene.getObjectByName("mug_model");
    let water = main.scene.getObjectByName("Water");
    switch(object.name){
        case "DemonDoor_1":
        case "DemonDoor_3":
            model.actions['DemonDoorOpen'].reset().play()
        break;
        case "Door_1":
        case "Door_3":
            model.actions['DoorOpen'].reset().play()
        break;
        case "Shrimp_1":
        case "Guitar_2":
            if (!shrimp.isPlaying) {
                shrimp.play();
                shrimp.isPlaying = true;
            }
            else {
                shrimp.pause();
                shrimp.currentTime = 0;
                shrimp.isPlaying = false;
            }
            model.actions['ShrimpAction'].reset().play();
            model.actions['GuitarAction'].reset().play();

        break;
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
        case "Paper":
        case "Paper_2":
            document.getElementById("info_screen").style.display = "unset";
        break;
        case "CV_Paper":
            cam.CVPos();
    }

}

export function button_interact(e, up = false){
    switch(e.keyCode){
        case 32:
            drink(e, up);
    }
}

document.addEventListener('keydown', (e) => {
    button_interact(e)
}
);
document.addEventListener('keyup',  (e) => {
    button_interact(e, true)
});


document.getElementById("info_screen").onclick = () => {
    document.getElementById("info_screen").style.display = "none";
};

slurp.onended = () => {
    let water = main.scene.getObjectByName("Water");
    slurp.pause();
    slurp.currentTime = 0;
    water.material.visible = false;
    water.material.color.r = 0.28750312328338623;
    water.material.color.g = 0.6999994516372681;
    water.material.color.b = 0.6829902529716492;
};

function drink(e, up){
    let water = main.scene.getObjectByName("Water");
    if (water.material.visible){
        // TODO: Rotate the mug towards the player's face.
        if (!up){
            slurp.play();
        }
    else {
        sip.play();
        slurp.onended();
        // Display how many tea points that was.
        }
    }
}