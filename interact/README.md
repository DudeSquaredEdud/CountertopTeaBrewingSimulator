# 🎯 Interaction System Documentation

A modern, modular interaction system for the Countertop Tea Brewing Simulator.

## 📁 Directory Structure

```
interact/
├── index.js              # Main interaction coordinator
├── legacy.js             # Backward compatibility layer
├── README.md             # This documentation
├── audio/
│   ├── AudioManager.js   # Centralized audio management
│   └── SoundEffects.js   # Sound effect definitions
├── handlers/
│   ├── DoorHandler.js    # Door interactions
│   ├── ItemHandler.js    # Item interactions (shrimp, guitar)
│   ├── TeaHandler.js     # Tea brewing interactions
│   ├── UIHandler.js      # UI interactions
│   └── CameraHandler.js  # Camera interactions
├── config/
│   └── interactions.js   # Configuration-based interaction mappings
└── utils/
    └── validators.js     # Input validation utilities
```

## 🚀 Quick Start

### Backward Compatibility (No Changes Required)
Your existing code continues to work exactly as before:

```javascript
import { click_interact, button_interact } from './interact.js';

// These functions now use the new system internally
click_interact(clickedObject);
button_interact(event, up);
```

### New Modular API
For new development, use the enhanced API:

```javascript
import { interactionManager } from './interact/index.js';

// Handle object interactions
interactionManager.click_interact(object);

// Handle keyboard interactions
interactionManager.handleButtonInteraction(event);
```

## 🔧 Configuration

All interactions are defined in `config/interactions.js`:

```javascript
// Example interaction configuration
'Shrimp_1': {
    type: 'item',
    handler: 'item',
    action: 'toggle',
    animation: 'ShrimpAction',
    sound: 'shrimp'
}
```

## 🎵 Audio Management

The new system includes centralized audio management:

```javascript
import { interactionManager } from './interact/index.js';

// Access audio manager directly
interactionManager.audioManager.play('sip');
interactionManager.audioManager.setVolume(0.5);
```

## 🎯 Adding New Interactions

### 1. Define in Configuration
Add to `config/interactions.js`:

```javascript
'NewObject': {
    type: 'custom',
    handler: 'custom',
    action: 'doSomething',
    sound: 'customSound'
}
```

### 2. Create Handler
Create a new handler in `handlers/`:

```javascript
// handlers/CustomHandler.js
export class CustomHandler {
    static doSomething(interaction, object) {
        // Your interaction logic here
    }
}
```

### 3. Register Handler
Update `index.js` to include your new handler.

## 🔍 Available Handlers

| Handler | Purpose | Actions |
|---------|---------|---------|
| `DoorHandler` | Door interactions | `open` |
| `ItemHandler` | Item interactions | `toggle` |
| `TeaHandler` | Tea brewing | `fillWater`, `addLeaves`, `resetWater` |
| `UIHandler` | UI interactions | `showInfo`, `hideInfo` |
| `CameraHandler` | Camera movements | `moveToCV` |

## 🧪 Testing

Run the built-in test:

```javascript
import './interact/test.js';
```

## 🔄 Migration Guide

### Phase 1: Use New System (Current)
- No code changes required
- All existing functionality preserved

### Phase 2: Gradual Adoption
- Start using `interactionManager` for new features
- Leverage configuration-based interactions

### Phase 3: Full Migration
- Replace direct handler calls with configuration
- Remove legacy compatibility layer

## 🐛 Debugging

Enable debug logging by checking the browser console. The system provides:

- Missing object warnings
- Handler/action validation
- Audio playback issues
- Configuration errors

## 📊 Benefits

| Aspect | Old System | New System |
|--------|------------|------------|
| **Organization** | Monolithic | Modular |
| **Extensibility** | Hard-coded | Configuration-driven |
| **Audio** | Scattered | Centralized |
| **Error Handling** | Minimal | Comprehensive |
| **Testing** | Difficult | Easy |
| **Documentation** | Limited | Complete |

## 🎯 Examples

### Adding a New Door
```javascript
// In config/interactions.js
'NewDoor': {
    type: 'door',
    handler: 'door',
    action: 'open',
    animation: 'NewDoorOpen'
}
```

### Custom Audio Volume
```javascript
// Set global volume
interactionManager.audioManager.setVolume(0.3);

// Play specific sound
interactionManager.audioManager.play('great');
```

### Validation
```javascript
// Check if object can interact
import { hasInteraction } from './interact/config/interactions.js';
if (hasInteraction(object.name)) {
    // Object has interaction configured
}
```

## 🚨 Breaking Changes

**None!** The new system is 100% backward compatible. All existing imports and function calls work exactly as before.

## 📝 Future Enhancements

- Plugin system for custom handlers
- Animation queuing
- Interaction cooldowns
- Conditional requirements
- Multi-step interactions