/**
 * Main interaction coordinator
 * Centralizes all interaction handling with modular architecture
 */

import * as main from '../main.js';
import { AudioManager } from './audio/AudioManager.js';
import { initializeSounds } from './audio/SoundEffects.js';
import { getInteractionConfig, hasInteraction } from './config/interactions.js';
import { DoorHandler } from './handlers/DoorHandler.js';
import { ItemHandler } from './handlers/ItemHandler.js';
import { TeaHandler } from './handlers/TeaHandler.js';
import { UIHandler } from './handlers/UIHandler.js';
import { CameraHandler } from './handlers/CameraHandler.js';
import { validateInteractionRequirements } from './utils/validators.js';

class InteractionManager {
    constructor() {
        this.audioManager = new AudioManager();
        this.handlers = {
            door: DoorHandler,
            item: ItemHandler,
            tea: TeaHandler,
            ui: UIHandler,
            camera: CameraHandler
        };
        
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        initializeSounds(this.audioManager);
        this.setupEventListeners();
        this.isInitialized = true;
    }

    setupEventListeners() {
        // Setup UI event listeners
        const infoScreen = document.getElementById("info_screen");
        if (infoScreen) {
            infoScreen.onclick = () => {
                UIHandler.hideInfo();
            };
        }

        // Setup keyboard event listeners
        document.addEventListener('keydown', (e) => {
            this.handleButtonInteraction(e, false);
        });
        
        document.addEventListener('keyup', (e) => {
            this.handleButtonInteraction(e, true);
        });
    }

    /**
     * Handle click interactions with objects
     * @param {THREE.Object3D} object - The clicked object
     */
    click_interact(object) {
        if (!object || !object.name) {
            console.warn('Invalid object provided to click_interact');
            return;
        }

        if (!hasInteraction(object.name)) {
            console.log(`No interaction configured for: ${object.name}`);
            return;
        }

        const config = getInteractionConfig(object.name);
        const handler = this.handlers[config.handler];
        
        if (!handler) {
            console.warn(`Handler '${config.handler}' not found`);
            return;
        }

        // Validate requirements
        const validation = validateInteractionRequirements(config);
        if (!validation.isValid) {
            console.warn(`Missing requirements: ${validation.missing.join(', ')}`);
            return;
        }

        // Execute the interaction
        try {
            if (typeof handler[config.action] === 'function') {
                handler[config.action](config, object);
                
                // Play sound if specified
                if (config.sound) {
                    this.audioManager.play(config.sound);
                }
            } else {
                console.warn(`Action '${config.action}' not found in handler '${config.handler}'`);
            }
        } catch (error) {
            console.error('Error executing interaction:', error);
        }
    }

    /**
     * Handle button/key interactions
     * @param {KeyboardEvent} e - Keyboard event
     * @param {boolean} up - Whether key is being released
     */
    handleButtonInteraction(e, up = false) {
        if (e.keyCode === 32) { // Space key
            this.drink(e, up);
        }
    }

    /**
     * Handle drinking interaction
     * @param {KeyboardEvent} e - Keyboard event
     * @param {boolean} up - Whether key is being released
     */
    drink(e, up) {
        const water = main.scene.getObjectByName("Water");
        if (!water || !water.material) {
            return;
        }

        if (water.material.visible) {
            if (!up) {
                this.audioManager.play('slurp');
            } else {
                this.audioManager.play('sip');
                // Reset water after drinking
                TeaHandler.resetWater();
            }
        }
    }

    /**
     * Get available interactions
     * @returns {Array<string>} List of interactable object names
     */
    getAvailableInteractions() {
        return Object.keys(require('./config/interactions.js').InteractionMap);
    }

    /**
     * Clean up resources
     */
    dispose() {
        this.audioManager.dispose();
        this.isInitialized = false;
    }
}

// Create singleton instance
export const interactionManager = new InteractionManager();

// Export backward-compatible functions
export function click_interact(object) {
    return interactionManager.click_interact(object);
}

export function button_interact(e, up = false) {
    return interactionManager.handleButtonInteraction(e, up);
}