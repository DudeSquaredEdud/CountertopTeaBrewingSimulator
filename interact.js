/**
 * Interact - for right click interactions
 * 
 * This file now serves as a compatibility layer for the new modular interaction system.
 * All functionality has been moved to the interact/ directory for better organization.
 */

// Import the new modular system with backward compatibility
export { click_interact, button_interact } from './interact/index.js';

// For backward compatibility, also export the legacy functions
// These will be removed in a future version
import { click_interact, button_interact } from './interact/index.js';
