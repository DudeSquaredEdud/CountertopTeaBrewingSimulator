/**
 * Handler for camera-related interactions
 */

import * as cam from '../../camera.js';

export class CameraHandler {
    /**
     * Move camera to CV position
     * @param {Object} interaction - Interaction configuration
     * @param {THREE.Object3D} object - The triggering object
     */
    static moveToCV(interaction, object) {
        cam.CVPos();
    }
}