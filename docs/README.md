# Countertop Tea Brewing Simulator (CtTBS)

A whimsical 3D interactive simulation where you can brew tea on a countertop, featuring surreal elements, interactive objects, and a unique atmosphere. Built with Three.js.

## 🍵 Overview

Countertop Tea Brewing Simulator is a browser-based 3D experience that combines realistic tea brewing mechanics with surreal, dreamlike elements. Players can explore a detailed environment, interact with various objects, and discover hidden secrets while attempting to brew the perfect cup of tea.

## ✨ Features

- **Immersive 3D Environment**: Explore a detailed countertop world with realistic physics
- **Interactive Objects**: Click and interact with mugs, papers, doors, and mysterious elements
- **Tea Brewing Mechanics**: Collect water, add leaves, and brew tea
- **Surreal Elements**: Encounter talking shrimp, demon houses, and other unexpected surprises
- **Dynamic Audio**: Spatial sound effects and ambient audio
- **Smooth Movement**: WASD/Arrow key movement with physics-based collision detection
- **Visual Feedback**: Tooltips, crosshairs, and interactive UI elements

## 🎮 Controls

| Key | Action |
|-----|--------|
| **WASD** / **Arrow Keys** | Move around |
| **Shift** | Run (increases speed) |
| **C** | Zoom in/out |
| **P** | Teleport to starting position |
| **Space** | Jump |
| **Left Click** | Interact with objects |
| **Right Click** | Context menu / Special interactions |
| **Right Click + Shift** | Debug ping objects |

## 🚀 Quick Start

### Prerequisites
- Modern web browser with WebGL support
- Local web server (recommended for development)

### Running the Project

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd CountertopTeaBrewingSimulator
   ```

2. **Serve the files**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🏗️ Project Structure

```
CountertopTeaBrewingSimulator/
├── index.html                 # Main HTML file
├── main.js                    # Application entry point
├── initializations.js         # Scene initialization and model placement
├── modelLoading.js            # 3D model loading utilities
├── camera.js                  # Camera controls and positioning
├── lights.js                  # Lighting setup
├── interact.js                # Interaction system and game logic
├── clicking.js                # Mouse click handling and raycasting
├── move.js                    # Player movement and physics
├── loadingScreen.js           # Loading screen with quotes
├── meshes/                    # 3D model files (.glb)
├── sounds/                    # Audio files (.mp3)
├── textures/                  # Texture files
├── skybox/                    # Skybox textures
├── DEAMON/                    # Special image assets
└── README.md                  # This file
```

## 🎯 Gameplay Guide

### Brewing Tea
1. **Find the mug** - Look for the white ceramic mug on the countertop
2. **Get water** - Take the mug to the lake area and interact with the water
3. **Find leaves** - Look for leaf objects around the environment
4. **Brew** - Add leaves to the water-filled mug to create tea
5. **Drink** - Use Space to sip or hold for slurping

### Exploring Secrets
- **Demon House**: A mysterious structure with animated doors
- **Shrimp**: An interactive musical shrimp that plays guitar
- **CV Room**: A special area accessible via the CV paper
- **Magnifier**: Zoom into distant mountain landscapes

## 🔧 Development

### Architecture Overview

The project follows a modular architecture with clear separation of concerns:

- **main.js**: Application bootstrap and render loop
- **initializations.js**: Scene setup and model placement
- **modelLoading.js**: Asset loading and animation management
- **camera.js**: Camera positioning and controls
- **move.js**: Player movement, physics, and collision detection
- **interact.js**: Game logic and object interactions
- **clicking.js**: Input handling and raycasting

### Key Systems

#### Model Loading System
- Uses GLTFLoader for 3D models
- Supports animations and complex scenes
- Provides utility functions for recursive object property assignment

#### Physics System
- Custom collision detection using raycasting
- Gravity and jumping mechanics
- Wall collision with push-back forces
- Ground detection for movement validation

#### Interaction System
- Raycast-based object picking
- Context-sensitive tooltips
- Audio feedback for interactions
- State management for interactive objects

### Adding New Models

1. **Place the .glb file** in the `meshes/` directory
2. **Update initializations.js**:
   ```javascript
   await init("my_model", 'meshes/my_model.glb', (thing) => {
       thing.position.set(x, y, z);
       thing.rotation.set(rx, ry, rz);
       childTooltip(thing, "My Object");
   });
   ```
3. **Add interaction logic** in interact.js if needed

### Debugging Tools

- **Object Inspector**: Right-click + Shift to highlight objects
- **Console Logging**: Enable debug mode in modelLoading.js
- **Performance Monitor**: Built into browser dev tools

## 🎨 Assets

### 3D Models
- **countertop.glb**: Main countertop environment
- **mug.glb**: Interactive tea mug with water
- **shrimp.glb**: Animated shrimp with guitar
- **demonhouse.glb**: Mysterious demon house
- **CV_Room.glb**: CV viewing room
- **wallsAndFloor.glb**: Environment boundaries
- **paber.glb**: Interactive paper objects
- **magnafier.glb**: Magnifying glass for distant views

### Audio
- **sip.mp3**: Tea sipping sound
- **slurp.mp3**: Tea slurping sound
- **shrimp.mp3**: Shrimp/guitar music
- **GREAT.mp3**: Success sound
- **YEAH.mp3**: Celebration sound

### Textures
- **wood.webp**: Countertop texture
- **SKY.png**: Sky texture
- **skybox/**: 6-sided skybox textures

## 🛠️ Technical Details

### Technologies Used
- **Three.js**: 3D graphics and WebGL rendering
- **PointerLockControls**: First-person camera controls
- **GLTFLoader**: 3D model loading
- **Web Audio API**: Sound effects and music
- **ES6 Modules**: Modern JavaScript module system

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Considerations
- Optimized model loading with progress callbacks
- Efficient collision detection using raycasting
- Minimal draw calls through scene optimization
- Responsive design for different screen sizes

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test on multiple browsers
- Update documentation for new features
- Keep assets optimized for web delivery

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

For questions, issues, or contributions:
- **Issues**: [GitHub Issues](https://github.com/[username]/CountertopTeaBrewingSimulator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/[username]/CountertopTeaBrewingSimulator/discussions)

## 🎭 Credits

- **Development**: Ashton Andrepont
- **3D Models**: Custom created for the project
- **Audio**: Original compositions and sound effects
- **Inspiration**: Surreal humor and tea appreciation

---

*"The most realistic simulation for this exact thing."* - Loading Screen