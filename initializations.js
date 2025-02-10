import * as main from './main.js';
import * as model from './modelLoading.js';
import * as THREE from 'three';

async function init(name, path, load = () => {}) {
    try {
        const loadedObject = await model.quickLoad(main.scene, name, path, false);
        load(main.scene.getObjectByName(name));
        // return loadedObject;
    } catch (error) {
        console.error('Failed to load model:', error);
    }
}

function childTooltip(thing, tooltip){
    thing.tooltip = tooltip;
    if (thing.children)thing.children.forEach(child => {
        child.tooltip = tooltip;
        childTooltip(child, tooltip);
    });
}

function childProp(thing, prop, value){
    thing[prop] = value;
    thing.children.forEach(child => {
        child[prop] = value;
    });
};

function childPropsRecursive(thing, props){
    Object.assign(thing, props)
    thing.children.forEach(child => {
        childPropsRecursive(child, props);
    });
};

export async function initialization_Countertop(){
    return new Promise(async (resolve) => {
        const initsequence = async () => {        
        // Add the countertop to the scene.
        await init("CV_Room", 'meshes/CV_Room.glb', (thing) => {
            thing.position.set(0,-50,0);
        });
        await init("outside_model", 'meshes/outside.glb', (thing) => {
            childPropsRecursive(thing, {
                isWall: true
            })
            childPropsRecursive(thing, { isGround: true });
        });
        await init("shrimp_model", 'meshes/shrimp.glb', (thing) =>{
            thing.position.set(10,0,-35);
            thing.rotation.set(0,-45,0);
            thing.scale.set(.1,.1,.1);
            childTooltip(thing, "Shrimp");
            model.actions['ShrimpAction'].setLoop(THREE.LoopOnce);
            model.actions['GuitarAction'].setLoop(THREE.LoopOnce);
        });
        await init("wallsAndFloor_model", 'meshes/wallsAndFloor.glb', (thing) => {
            childPropsRecursive(thing, {
                isWall: true
            })
            model.actions['DoorOpen'].setLoop(THREE.LoopPingPong, 2);
    
            childPropsRecursive(thing.getObjectByName("Bed"), { isGround: true });
        });
        await init("countertop_model", 'meshes/countertop.glb', (thing) => {
            childPropsRecursive(thing, {
                isWall: true
            })
        });
        await init("paper_model", 'meshes/paber.glb', (thing) => {
            thing.position.set(-2.3,.8,-2);
            childTooltip(thing, "Game Info");
        });
        await init("paper_model_CV", 'meshes/paber.glb', (thing) => {
            let cv_paper = main.scene.getObjectByName("paper_model_CV");
            cv_paper.position.set(2.3,.8,-2);
            cv_paper.getObjectByName("Paper_2").name = "CV_Paper";
            childTooltip(thing, "CV");
        });
        await init("mug_model", 'meshes/mug.glb', (thing) =>{
            thing.position.set(0,3.5,-2);
            thing.rotation.set(0,90,0);
            thing.hand = false;
            thing.getObjectByName("Water").material.visible = false;
            childTooltip(thing, "Mug");
            childProp(thing, "hand", false);
        });
        await init("magnafier_model", "meshes/magnafier.glb",  (thing) => {
            thing.position.set(-400,0,-16);
            childPropsRecursive(thing, {
                isWall: true
            })
            childPropsRecursive(thing.getObjectByName("Mountain"), { isGround: true });
    
        });
        await init("DemonLadyNoRig_model", "meshes/DemonLadyNoRig.glb", (thing) => {
            thing.position.set(100,0,-16);
            thing.rotation.set(0,-1.52,0);
            console.log(model.actions);
            model.actions['DemonYeah'].setLoop(THREE.LoopRepeat, 100000);
            model.actions['DemonYeah'].reset().play();
            childPropsRecursive(thing, {frustumCulled: false});
        });
        await init("demonhouse_model", "meshes/demonhouse.glb", (thing) => {
            childPropsRecursive(thing, {
                isWall: true
            })
            thing.position.set(100,0,-8);
            thing.rotation.set(0,-3.1415,0);
            model.actions['DemonDoorOpen'].setLoop(THREE.LoopPingPong, 2);
        });}
        await initsequence();
        resolve(1);
    });
}

