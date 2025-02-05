import * as main from './main.js';
import * as model from './modelLoading.js';

export function initialization(){
    // Add the countertop to the scene.
    model.quickLoad(main.scene, "outside_model", 'meshes/outside.glb');
    model.quickLoad(main.scene, "shrimp_model", 'meshes/shrimp.glb');
    model.quickLoad(main.scene, "backWall_model", 'meshes/backWall.glb');
    model.quickLoad(main.scene, "wallsAndFloor_model", 'meshes/wallsAndFloor.glb');
    model.quickLoad(main.scene, "countertop_model", 'meshes/countertop.glb');
    model.quickLoad(main.scene, "mug_model", 'meshes/mug.glb', true);
    model.quickLoad(main.scene, "paper_model", 'meshes/paber.glb', true);
    let mug;
    let sky;
    let shrimp;
    let paper;
    setTimeout(() => { 
    mug = main.scene.getObjectByName("mug_model");
    mug.position.set(0,3.5,-2);
    mug.rotation.set(0,90,0);
    mug.hand = false;
    main.scene.getObjectByName("Water").material.visible = false;

    shrimp = main.scene.getObjectByName("shrimp_model");
    shrimp.position.set(10,0,-35);
    shrimp.rotation.set(0,-45,0);
    shrimp.scale.set(.1,.1,.1);

    sky = main.scene.getObjectByName("Sky");
    sky.look = false;
    
    paper = main.scene.getObjectByName("Paper");
    paper.position.set(-2.3,.8,-2);

    document.getElementById("LoadingScreen").style.display = "none";
    }, 500);
}