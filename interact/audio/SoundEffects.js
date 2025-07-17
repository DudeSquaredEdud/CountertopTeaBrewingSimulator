/**
 * Sound effect definitions and configurations
 * Centralizes all sound effect paths and settings
 */

export const SoundEffects = {
    SIP: {
        name: 'sip',
        path: 'assets/audio/sfx/sip.mp3',
        options: { volume: 0.7 }
    },
    SLURP: {
        name: 'slurp',
        path: 'assets/audio/sfx/slurp.mp3',
        options: { volume: 0.8 }
    },
    SHRIMP: {
        name: 'shrimp',
        path: 'assets/audio/sfx/shrimp.mp3',
        options: { volume: 0.6 }
    },
    GREAT: {
        name: 'great',
        path: 'assets/audio/sfx/GREAT.mp3',
        options: { volume: 0.5 }
    },
    YEAH: {
        name: 'yeah',
        path: 'assets/audio/sfx/YEAH.mp3',
        options: { volume: 0.5 }
    }
};

/**
 * Initialize all sound effects with the audio manager
 * @param {AudioManager} audioManager - Instance of AudioManager
 */
export function initializeSounds(audioManager) {
    Object.values(SoundEffects).forEach(sound => {
        audioManager.registerSound(sound.name, sound.path, sound.options);
    });
}