import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

export var object;
export function quickLoad(scene, name, path, dump = false) {
    const loader = new GLTFLoader(); 
    loader.load( path, 
        ( gltf ) => {
            const root = gltf.scene;
            scene.add( root );
            if (dump) console.log(dumpObject(root).join('\n'));
            root.name = name;
        }, undefined, function ( error ) {

            console.error( error );

        });

};