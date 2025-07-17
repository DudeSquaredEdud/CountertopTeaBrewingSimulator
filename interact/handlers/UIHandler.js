/**
 * Handler for UI-related interactions
 */

export class UIHandler {
    /**
     * Show info screen with auto-hide
     * @param {Object} interaction - Interaction configuration
     * @param {THREE.Object3D} object - The triggering object
     */
    static showInfo(interaction, object) {
        const infoScreen = document.getElementById("info_screen");
        if (!infoScreen) {
            console.warn('Info screen element not found');
            return;
        }

        infoScreen.style.display = "unset";
        
        const duration = interaction.duration || 4000;
        setTimeout(() => {
            infoScreen.style.display = "none";
        }, duration);
    }

    /**
     * Hide info screen immediately
     */
    static hideInfo() {
        const infoScreen = document.getElementById("info_screen");
        if (infoScreen) {
            infoScreen.style.display = "none";
        }
    }
}