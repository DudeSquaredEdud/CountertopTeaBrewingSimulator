/**
 * Input validation utilities for interactions
 */

import * as main from '../../main.js';

/**
 * Validate interaction requirements
 * @param {Object} interaction - Interaction configuration
 * @returns {Object} Validation result
 */
export function validateInteractionRequirements(interaction) {
    const result = {
        isValid: true,
        missing: []
    };

    if (!interaction.requires || !Array.isArray(interaction.requires)) {
        return result;
    }

    interaction.requires.forEach(requirement => {
        const object = main.scene.getObjectByName(requirement);
        if (!object) {
            result.missing.push(requirement);
            result.isValid = false;
        }
    });

    return result;
}

/**
 * Validate object exists in scene
 * @param {string} objectName - Name of the object to validate
 * @returns {boolean}
 */
export function validateObjectExists(objectName) {
    const object = main.scene.getObjectByName(objectName);
    return object !== undefined;
}

/**
 * Validate handler exists
 * @param {string} handlerName - Name of the handler
 * @param {Object} handlers - Available handlers object
 * @returns {boolean}
 */
export function validateHandlerExists(handlerName, handlers) {
    return handlerName in handlers;
}