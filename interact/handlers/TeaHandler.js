/**
 * Handler for tea-related interactions
 */

import * as main from '../../main.js';

export class TeaHandler {
    /**
     * Handle filling water into mug
     * @param {Object} interaction - Interaction configuration
     * @param {THREE.Object3D} object - The water source object
     */
    static fillWater(interaction, object) {
        const mug = main.scene.getObjectByName("mug_model");
        const water = main.scene.getObjectByName("Water");

        if (!mug || !water) {
            console.warn('Mug or Water object not found');
            return;
        }

        if (mug.hand && water.material) {
            water.material.visible = true;
        }
    }

    /**
     * Handle adding tea leaves
     * @param {Object} interaction - Interaction configuration
     * @param {THREE.Object3D} object - The leaves object
     */
    static addLeaves(interaction, object) {
        const mug = main.scene.getObjectByName("mug_model");
        const water = main.scene.getObjectByName("Water");

        if (!mug || !water || !water.material) {
            console.warn('Required objects not found for tea interaction');
            return;
        }

        if (water.material.visible === true && mug.hand === true) {
            // Apply color transformation for tea
            water.material.color.r *= 0.8;
            water.material.color.g *= 1.1;
            water.material.color.b *= 0.8;

            water.material.color.r -= 0.1;
            water.material.color.g -= 0.1;
            water.material.color.b -= 0.1;
        }
    }

    /**
     * Reset water to original state
     */
    static resetWater() {
        const water = main.scene.getObjectByName("Water");
        if (water && water.material) {
            water.material.visible = false;
            water.material.color.r = 0.28750312328338623;
            water.material.color.g = 0.6999994516372681;
            water.material.color.b = 0.6829902529716492;
        }
    }
}