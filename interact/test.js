/**
 * Simple test to verify the interaction system works
 */

import { interactionManager } from './index.js';
import { hasInteraction, getInteractionConfig } from './config/interactions.js';

console.log('🎯 Interaction System Test');
console.log('=========================');

// Test 1: Check if system is initialized
console.log('✅ System initialized:', interactionManager.isInitialized);

// Test 2: Check available interactions
const available = Object.keys(require('./config/interactions.js').InteractionMap);
console.log('📋 Available interactions:', available.length);

// Test 3: Check specific interactions
const testObjects = ['DemonDoor_1', 'Shrimp_1', 'Lake', 'Paper'];
testObjects.forEach(obj => {
    console.log(`🔍 ${obj}:`, hasInteraction(obj) ? '✅ Configured' : '❌ Not configured');
});

// Test 4: Check audio system
console.log('🎵 Audio sounds registered:', interactionManager.audioManager.sounds.size);

// Test 5: Check handlers
console.log('🛠️  Available handlers:', Object.keys(interactionManager.handlers));

console.log('🎉 All tests completed!');