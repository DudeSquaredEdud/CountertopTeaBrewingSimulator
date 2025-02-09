/**
 * Model Loading - for loading models
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import * as main from "./main.js";

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
  }


export const actions = {};

export function quickLoad(scene, name, path, dump = true) {
    const loader = new GLTFLoader(); 
    loader.load( path, 
        ( gltf ) => {
            const root = gltf.scene;
            const animations = gltf.animations;
            scene.add( root );
            if (dump) console.log(dumpObject(root).join('\n'));
            root.name = name;

            if(animations){
                  // ====== ANIMATION SETUP ======
                  const mixer = new THREE.AnimationMixer(root);
                  
                  // Create animation actions
                  animations.forEach((clip) => {
                      actions[clip.name] = mixer.clipAction(clip);
                  });


                  // ====== ANIMATION LOOP ======
                  const clock = new THREE.Clock();
                  function animate() {
                      requestAnimationFrame(animate);

                      // Update mixer with delta time
                      const delta = clock.getDelta();
                      mixer.update(delta);
                  }

                  animate();
              }

        }, undefined, function ( error ) {

            console.error( error );

        });
};