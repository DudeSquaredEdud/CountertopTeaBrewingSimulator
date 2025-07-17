/**
 * Legacy compatibility layer
 * Provides the same API as the original interact.js
 * This file can be used to gradually migrate to the new system
 */

// Re-export the new API with the same interface as the old one
export { click_interact, button_interact } from './index.js';