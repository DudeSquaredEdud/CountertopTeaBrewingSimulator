/**
 * Handler for door-related interactions
 */

import * as model from '../../modelLoading.js';

export class DoorHandler {
    /**
     * Handle door opening interaction
     * @param {Object} interaction - Interaction configuration
     * @param {THREE.Object3D} object - The door object
     */
    static open(interaction, object) {
        if (!interaction.animation) {
            console.warn('No animation specified for door interaction');
            return;
        }

        const animation = model.actions[interaction.animation];
        if (animation) {
            animation.reset().play();
        } else {
            console.warn(`Animation '${interaction.animation}' not found`);
        }
    }
}