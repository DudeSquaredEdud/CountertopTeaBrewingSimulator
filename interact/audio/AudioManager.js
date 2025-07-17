/**
 * Centralized audio management for all interactions
 * Handles loading, playback, and state management of audio assets
 */

export class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.isPlaying = new Map();
        this.volume = 1.0;
    }

    /**
     * Register a new sound with the audio manager
     * @param {string} name - Unique identifier for the sound
     * @param {string} path - Path to the audio file
     * @param {Object} options - Configuration options
     */
    registerSound(name, path, options = {}) {
        const audio = new Audio(path);
        audio.loop = options.loop || false;
        audio.volume = options.volume || this.volume;
        
        // Set up event handlers
        audio.onended = () => {
            this.isPlaying.set(name, false);
            audio.pause();
            audio.currentTime = 0;
        };

        this.sounds.set(name, audio);
        this.isPlaying.set(name, false);
    }

    /**
     * Play a registered sound
     * @param {string} name - Sound identifier
     * @returns {boolean} - True if sound was played, false otherwise
     */
    play(name) {
        const sound = this.sounds.get(name);
        if (!sound) {
            console.warn(`Sound '${name}' not found`);
            return false;
        }

        if (this.isPlaying.get(name)) {
            return false;
        }

        sound.play();
        this.isPlaying.set(name, true);
        return true;
    }

    /**
     * Stop a playing sound
     * @param {string} name - Sound identifier
     */
    stop(name) {
        const sound = this.sounds.get(name);
        if (sound && this.isPlaying.get(name)) {
            sound.pause();
            sound.currentTime = 0;
            this.isPlaying.set(name, false);
        }
    }

    /**
     * Toggle play/pause for a sound
     * @param {string} name - Sound identifier
     */
    toggle(name) {
        if (this.isPlaying.get(name)) {
            this.stop(name);
        } else {
            this.play(name);
        }
    }

    /**
     * Set global volume for all sounds
     * @param {number} volume - Volume level (0-1)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.sounds.forEach(sound => {
            sound.volume = this.volume;
        });
    }

    /**
     * Check if a sound is currently playing
     * @param {string} name - Sound identifier
     * @returns {boolean}
     */
    isSoundPlaying(name) {
        return this.isPlaying.get(name) || false;
    }

    /**
     * Clean up all audio resources
     */
    dispose() {
        this.sounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        this.sounds.clear();
        this.isPlaying.clear();
    }
}