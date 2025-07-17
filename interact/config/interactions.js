/**
 * Configuration-based interaction mappings
 * Defines all possible interactions in a declarative way
 */

export const InteractionTypes = {
    DOOR: 'door',
    ITEM: 'item',
    TEA: 'tea',
    UI: 'ui',
    CAMERA: 'camera'
};

export const InteractionMap = {
    // Door interactions
    'DemonDoor_1': {
        type: InteractionTypes.DOOR,
        handler: 'door',
        action: 'open',
        animation: 'DemonDoorOpen',
        sound: null
    },
    'DemonDoor_3': {
        type: InteractionTypes.DOOR,
        handler: 'door',
        action: 'open',
        animation: 'DemonDoorOpen',
        sound: null
    },
    'Door_1': {
        type: InteractionTypes.DOOR,
        handler: 'door',
        action: 'open',
        animation: 'DoorOpen',
        sound: null
    },
    'Door_3': {
        type: InteractionTypes.DOOR,
        handler: 'door',
        action: 'open',
        animation: 'DoorOpen',
        sound: null
    },

    // Item interactions
    'Shrimp_1': {
        type: InteractionTypes.ITEM,
        handler: 'item',
        action: 'toggle',
        animation: 'ShrimpAction',
        sound: 'shrimp'
    },
    'Guitar_2': {
        type: InteractionTypes.ITEM,
        handler: 'item',
        action: 'toggle',
        animation: 'GuitarAction',
        sound: 'shrimp'
    },

    // Tea interactions
    'Lake': {
        type: InteractionTypes.TEA,
        handler: 'tea',
        action: 'fillWater',
        requires: ['mug'],
        sound: null
    },
    'LeavesLeft': {
        type: InteractionTypes.TEA,
        handler: 'tea',
        action: 'addLeaves',
        requires: ['water', 'mug'],
        sound: null
    },
    'LeavesMiddle': {
        type: InteractionTypes.TEA,
        handler: 'tea',
        action: 'addLeaves',
        requires: ['water', 'mug'],
        sound: null
    },
    'LeavesRight': {
        type: InteractionTypes.TEA,
        handler: 'tea',
        action: 'addLeaves',
        requires: ['water', 'mug'],
        sound: null
    },

    // UI interactions
    'Paper': {
        type: InteractionTypes.UI,
        handler: 'ui',
        action: 'showInfo',
        duration: 4000,
        sound: null
    },
    'Paper_2': {
        type: InteractionTypes.UI,
        handler: 'ui',
        action: 'showInfo',
        duration: 4000,
        sound: null
    },

    // Camera interactions
    'CV_Paper': {
        type: InteractionTypes.CAMERA,
        handler: 'camera',
        action: 'moveToCV',
        sound: null
    }
};

/**
 * Get interaction configuration for an object
 * @param {string} objectName - Name of the object
 * @returns {Object|null} Interaction configuration or null if not found
 */
export function getInteractionConfig(objectName) {
    return InteractionMap[objectName] || null;
}

/**
 * Check if an object has interaction configuration
 * @param {string} objectName - Name of the object
 * @returns {boolean}
 */
export function hasInteraction(objectName) {
    return objectName in InteractionMap;
}

/**
 * Get all objects that can interact with a specific handler type
 * @param {string} handlerType - Type of handler (door, item, tea, etc.)
 * @returns {Array<string>} Array of object names
 */
export function getObjectsByHandler(handlerType) {
    return Object.keys(InteractionMap).filter(key => 
        InteractionMap[key].handler === handlerType
    );
}