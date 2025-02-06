import * as main from './main.js';
import * as model from './modelLoading.js';

function init(name, path, load = () => {}){
    model.quickLoad(main.scene, name, path, false);
    setTimeout(() => {
    load(main.scene.getObjectByName(name));
    }, 500);
}

export function initialization_Countertop(){
    // Add the countertop to the scene.
    init("CV_Room", 'meshes/CV_Room.glb', (thing) => {
        thing.position.set(0,-50,0);
    });
    init("outside_model", 'meshes/outside.glb');
    init("shrimp_model", 'meshes/shrimp.glb', (thing) =>{
        thing.position.set(10,0,-35);
        thing.rotation.set(0,-45,0);
        thing.scale.set(.1,.1,.1);
    });
    init("backWall_model", 'meshes/backWall.glb');
    init("wallsAndFloor_model", 'meshes/wallsAndFloor.glb');
    init("countertop_model", 'meshes/countertop.glb');
    init("paper_model", 'meshes/paber.glb', (thing) => {
        thing.position.set(-2.3,.8,-2);
    });
    init("paper_model_CV", 'meshes/paber.glb', (thing) => {
        let cv_paper = main.scene.getObjectByName("paper_model_CV");
        cv_paper.position.set(2.3,.8,-2);
        cv_paper.getObjectByName("Paper_2").name = "CV_Paper";
    });
    init("mug_model", 'meshes/mug.glb', (thing) =>{
        thing.position.set(0,3.5,-2);
        thing.rotation.set(0,90,0);
        thing.hand = false;
        thing.getObjectByName("Water").material.visible = false;
        thing.children.forEach(child => {
            child.tooltip = "Mug";
        });
    })

    setTimeout(() => {
    document.getElementById("LoadingScreen").style.display = "none";
    }, 500);
}


