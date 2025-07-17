# Project Structure Documentation

This document provides a comprehensive overview of the Countertop Tea Brewing Simulator project structure, explaining the purpose and relationships of each file and directory.

## 📁 Root Directory

```
CountertopTeaBrewingSimulator/
├── index.html                 # Main HTML entry point
├── main.js                    # Application entry point and renderer setup
├── camera.js                  # Camera controls and positioning
├── clicking.js                # Mouse click detection and handling
├── initializations.js         # Scene initialization and model loading
├── interact.js                # Interaction system for objects
├── lights.js                  # Lighting setup and management
├── loadingScreen.js           # Loading screen and progress display
├── move.js                    # Player movement and controls
├── modelLoading.js            # 3D model loading utilities
├── README.md                  # Project overview and quick start
├── DEVELOPMENT_SETUP.md       # Development environment setup
├── API.md                     # API documentation
├── ASSETS.md                  # Asset inventory and usage guide
├── PROJECT_STRUCTURE.md       # This file
├── CONTRIBUTING.md            # Contribution guidelines
├── tools/                     # Development tools
│   ├── debug.js              # Debugging utilities
│   ├── performance-monitor.js # Performance monitoring
│   └── dev-server.js         # Development server with live reload
├── meshes/                    # 3D model files (.glb format)
├── textures/                  # Texture files
├── sounds/                    # Audio files
├── skybox/                    # Skybox textures
└── DEAMON/                    # Meme/emote images
```

## 🎯 Core Application Files

### Entry Points
- **index.html**: The main HTML file that sets up the canvas and UI elements
- **main.js**: Initializes Three.js scene, renderer, and starts the render loop

### Core Systems
- **camera.js**: Manages camera positioning, zoom, and view modes
- **move.js**: Handles WASD/arrow key movement and player controls
- **clicking.js**: Processes mouse clicks and raycasting for object interaction
- **interact.js**: Defines interaction behaviors for different objects

### Scene Management
- **initializations.js**: Loads and positions all 3D models in the scene
- **modelLoading.js**: Provides utilities for loading GLB models and animations
- **lights.js**: Sets up ambient, directional, and point lighting
- **loadingScreen.js**: Manages loading progress and quotes display

## 🗂️ Asset Organization

### 3D Models (`meshes/`)
- **CV_Room.glb**: Main room environment
- **countertop.glb**: Kitchen countertop
- **mug.glb**: Interactive tea mug with water material
- **shrimp.glb**: Animated shrimp character with guitar
- **demonhouse.glb**: Demon house model with animated door
- **DemonLadyNoRig.glb**: Animated demon lady character
- **wallsAndFloor.glb**: Room boundaries and bed
- **outside.glb**: External environment
- **magnafier.glb**: Magnifying glass for distant objects
- **paber.glb**: Information papers (CV and game info)
- **backWall.glb**: Background wall

### Textures (`textures/`)
- **wood.webp**: Wood texture for surfaces
- **SKY.png**: Sky texture

### Audio (`sounds/`)
- **GREAT.mp3**: Positive feedback sound
- **YEAH.mp3**: Success sound
- **shrimp.mp3**: Shrimp-related audio
- **sip.mp3**: Tea sipping sound
- **slurp.mp3**: Tea slurping sound

### Skybox (`skybox/`)
- **sk_top.png**: Top skybox face
- **sk_side.png**: Side skybox faces
- **sk_bottom.png**: Bottom skybox face

## 🛠️ Development Tools

### Debug Tools (`tools/debug.js`)
- **Performance monitoring**: FPS, draw calls, memory usage
- **Visual debugging**: Bounding boxes, wireframes, grid
- **Scene inspection**: Object hierarchy and properties
- **Keyboard shortcuts**: F1-F9 for various debug modes

### Performance Monitor (`tools/performance-monitor.js`)
- **Real-time stats**: FPS, frame time, memory usage
- **Graphical displays**: Performance graphs and trends
- **Memory leak detection**: Automated memory monitoring
- **Asset loading tracking**: Monitor model loading performance

### Development Server (`tools/dev-server.js`)
- **Live reload**: Automatic browser refresh on file changes
- **CORS support**: Cross-origin resource sharing for development
- **Directory listing**: Browse project files
- **WebSocket integration**: Real-time communication

## 🎮 Game Features

### Interactive Elements
- **Mug**: Can be filled with water, used for tea brewing
- **Doors**: Click to open/close with animations
- **Papers**: Display CV and game information
- **Shrimp**: Animated character with guitar
- **Demon characters**: Animated NPCs in the distance

### Controls
- **WASD/Arrow keys**: Movement
- **Shift**: Run
- **C**: Zoom
- **P**: Teleport to start
- **Space**: Sip tea
- **Hold Space**: Slurp tea
- **Click**: Interact with objects

### Visual Features
- **Skybox**: 360-degree environment
- **Lighting**: Dynamic lighting with shadows
- **Animations**: Character and object animations
- **Tooltips**: Object information on hover
- **Crosshair**: Center screen indicator

## 🔧 Technical Architecture

### Module System
The project uses ES6 modules with import maps for Three.js:
- **Three.js**: Core 3D engine
- **GLTFLoader**: For loading .glb models
- **Modular design**: Each system is in its own file

### Scene Graph
```
Scene
├── Skybox (1000x1000x1000 cube)
├── CV_Room (main environment)
├── outside_model (external walls)
├── shrimp_model (animated shrimp)
├── wallsAndFloor_model (room boundaries)
├── countertop_model (kitchen surface)
├── paper_model (game info)
├── paper_model_CV (CV document)
├── mug_model (interactive mug)
├── magnafier_model (distant view)
├── DemonLadyNoRig_model (animated character)
└── demonhouse_model (demon house)
```

### Data Flow
1. **Initialization**: `main.js` → `initializations.js` → `modelLoading.js`
2. **Render Loop**: `main.js` → `move.js` → `camera.js` → Three.js renderer
3. **Interaction**: User input → `clicking.js` → `interact.js` → object responses
4. **Loading**: `loadingScreen.js` → `modelLoading.js` → progress updates

## 🚀 Getting Started

1. **Quick Start**: Open `index.html` in a web browser
2. **Development**: Use `node tools/dev-server.js` for live reload
3. **Debugging**: Include `tools/debug.js` for development tools
4. **Performance**: Use `tools/performance-monitor.js` for optimization

## 📊 Performance Considerations

- **Model Complexity**: All models are optimized .glb files
- **Texture Size**: Textures are web-optimized
- **Draw Calls**: Minimized through efficient scene organization
- **Memory Usage**: Monitored with performance tools
- **Loading Strategy**: Progressive loading with loading screen

## 🔍 Troubleshooting

### Common Issues
1. **Models not loading**: Check file paths in `initializations.js`
2. **Performance issues**: Use performance monitor to identify bottlenecks
3. **CORS errors**: Use development server instead of file:// protocol
4. **Audio not playing**: Check browser autoplay policies

### Debug Shortcuts
- **F1**: Toggle performance stats
- **F2**: Toggle bounding boxes
- **F3**: Toggle wireframe mode
- **F4**: Toggle grid
- **F5**: Toggle axes
- **F6**: Log scene hierarchy
- **F7**: Create test objects
- **F8**: Clear debug objects
- **F9**: Measure performance

This structure provides a solid foundation for understanding, developing, and extending the Countertop Tea Brewing Simulator project.