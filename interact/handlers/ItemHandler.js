/**
 * Handler for item-related interactions (shrimp, guitar, etc.)
 */

import * as model from '../../modelLoading.js';
import { AudioManager } from '../audio/AudioManager.js';

export class ItemHandler {
    constructor(audioManager) {
        this.audioManager = audioManager;
    }

    /**
     * Handle toggle interaction for items
     * @param {Object} interaction - Interaction configuration
     * @param {THREE.Object3D} object - The item object
     */
    toggle(interaction, object) {
        if (interaction.sound) {
            this.audioManager.toggle(interaction.sound);
        }

        if (interaction.animation) {
            const animation = model.actions[interaction.animation];
            if (animation) {
                animation.reset().play();
            }
        }
    }
}