# Asset Inventory & Usage Guide

This document provides a comprehensive inventory of all assets used in the Countertop Tea Brewing Simulator, including 3D models, textures, audio files, and special assets.

## 📦 Asset Overview

| Category | Count | Formats | Location |
|----------|-------|---------|----------|
| **3D Models** | 11 | `.glb` | `/meshes/` |
| **Audio** | 5 | `.mp3` | `/sounds/` |
| **Textures** | 2 | `.png`, `.webp` | `/textures/` |
| **Skybox** | 3 | `.png` | `/skybox/` |
| **Special Images** | 8 | `.png` | `/DEAMON/` |
| **Favicon** | 1 | `.ico` | Root |

---

## 🏗️ 3D Models

### Environment Models

#### **CV_Room.glb**
- **Purpose**: Main interior environment
- **Location**: `meshes/CV_Room.glb`
- **Usage**: 
  ```javascript
  await init("CV_Room", 'meshes/CV_Room.glb', (thing) => {
      thing.position.set(0, -50, 0);
  });
  ```
- **Notes**: Large room model positioned below main scene

#### **countertop.glb**
- **Purpose**: Main countertop surface
- **Location**: `meshes/countertop.glb`
- **Usage**:
  ```javascript
  await init("countertop_model", 'meshes/countertop.glb', (thing) => {
      childPropsRecursive(thing, { isWall: true });
  });
  ```
- **Properties**: Marked as wall for collision detection

#### **wallsAndFloor.glb**
- **Purpose**: Room boundaries and floor
- **Location**: `meshes/wallsAndFloor.glb`
- **Animations**: 
  - `DoorOpen` - Door opening animation (LoopPingPong, 2 cycles)
- **Usage**:
  ```javascript
  model.actions['DoorOpen'].setLoop(THREE.LoopPingPong, 2);
  ```
- **Special Features**: Contains "Bed" object marked as ground

#### **outside.glb**
- **Purpose**: Exterior environment
- **Location**: `meshes/outside.glb`
- **Properties**: All children marked as walls and ground
- **Usage**:
  ```javascript
  childPropsRecursive(thing, { isWall: true });
  childPropsRecursive(thing, { isGround: true });
  ```

### Interactive Objects

#### **mug.glb**
- **Purpose**: Interactive tea brewing mug
- **Location**: `meshes/mug.glb`
- **Features**:
  - Contains "Water" mesh with toggleable visibility
  - Positioned on countertop
  - Hand interaction system
- **Usage**:
  ```javascript
  thing.position.set(0, 3.5, -2);
  thing.rotation.set(0, 90, 0);
  thing.hand = false;
  thing.getObjectByName("Water").material.visible = false;
  childTooltip(thing, "Mug");
  ```

#### **shrimp.glb**
- **Purpose**: Animated shrimp with guitar
- **Location**: `meshes/shrimp.glb`
- **Animations**:
  - `ShrimpAction` - Shrimp animation (LoopOnce)
  - `GuitarAction` - Guitar animation (LoopOnce)
- **Position**: (10, 0, -35) with -45° Y rotation
- **Scale**: 0.1 (shrunk to fit scene)
- **Usage**:
  ```javascript
  thing.position.set(10, 0, -35);
  thing.rotation.set(0, -45, 0);
  thing.scale.set(0.1, 0.1, 0.1);
  childTooltip(thing, "Shrimp");
  model.actions['ShrimpAction'].setLoop(THREE.LoopOnce);
  ```

#### **paber.glb**
- **Purpose**: Interactive paper objects
- **Location**: `meshes/paber.glb`
- **Usage**: Used for both game info and CV papers
- **Instances**:
  - Game info paper at (-2.3, 0.8, -2)
  - CV paper at (2.3, 0.8, -2) with name "CV_Paper"

#### **magnafier.glb**
- **Purpose**: Magnifying glass for distant viewing
- **Location**: `meshes/magnafier.glb`
- **Position**: (-400, 0, -16) - far from main scene
- **Features**: Contains "Mountain" object marked as ground
- **Usage**:
  ```javascript
  thing.position.set(-400, 0, -16);
  childPropsRecursive(thing, { isWall: true });
  childPropsRecursive(thing.getObjectByName("Mountain"), { isGround: true });
  ```

### Character Models

#### **DemonLadyNoRig.glb**
- **Purpose**: Animated demon character
- **Location**: `meshes/DemonLadyNoRig.glb`
- **Position**: (100, 0, -16) with -1.52 rad Y rotation
- **Animations**:
  - `DemonYeah` - Continuous looping animation
- **Special**: Frustum culling disabled for visibility
- **Usage**:
  ```javascript
  thing.position.set(100, 0, -16);
  thing.rotation.set(0, -1.52, 0);
  model.actions['DemonYeah'].setLoop(THREE.LoopRepeat, 100000);
  model.actions['DemonYeah'].reset().play();
  childPropsRecursive(thing, { frustumCulled: false });
  ```

#### **demonhouse.glb**
- **Purpose**: Mysterious demon house structure
- **Location**: `meshes/demonhouse.glb`
- **Position**: (100, 0, -8) with 180° Y rotation
- **Animations**:
  - `DemonDoorOpen` - Door opening animation (LoopPingPong, 2 cycles)
- **Properties**: All children marked as walls
- **Usage**:
  ```javascript
  thing.position.set(100, 0, -8);
  thing.rotation.set(0, -3.1415, 0);
  model.actions['DemonDoorOpen'].setLoop(THREE.LoopPingPong, 2);
  ```

---

## 🔊 Audio Assets

### Sound Effects

#### **sip.mp3**
- **Purpose**: Tea sipping sound effect
- **Location**: `sounds/sip.mp3`
- **Usage**: Triggered when player sips tea
- **Trigger**: Space key press

#### **slurp.mp3**
- **Purpose**: Tea slurping sound effect
- **Location**: `sounds/slurp.mp3`
- **Usage**: Triggered when player holds space for extended sip
- **Trigger**: Space key hold

#### **shrimp.mp3**
- **Purpose**: Shrimp/guitar music
- **Location**: `sounds/shrimp.mp3`
- **Usage**: Played when interacting with shrimp
- **Trigger**: Click on shrimp object

#### **GREAT.mp3**
- **Purpose**: Success/achievement sound
- **Location**: `sounds/GREAT.mp3`
- **Usage**: Positive feedback for successful actions

#### **YEAH.mp3**
- **Purpose**: Celebration sound effect
- **Location**: `sounds/YEAH.mp3`
- **Usage**: Special celebration moments

### Audio Implementation
```javascript
// Example usage in interact.js
var sound = new Audio('sounds/sip.mp3');
sound.play();
```

---

## 🎨 Textures & Materials

### Environment Textures

#### **wood.webp**
- **Purpose**: Countertop surface texture
- **Location**: `textures/wood.webp`
- **Usage**: Applied to countertop surfaces
- **Format**: WebP for optimal compression

#### **SKY.png**
- **Purpose**: Sky texture
- **Location**: `textures/SKY.png`
- **Usage**: Background sky rendering
- **Format**: PNG for transparency support

### Skybox Textures

#### **sk_top.png**
- **Purpose**: Top face of skybox
- **Location**: `skybox/sk_top.png`
- **Usage**: Skybox top texture

#### **sk_side.png**
- **Purpose**: Side faces of skybox
- **Location**: `skybox/sk_side.png`
- **Usage**: Applied to 4 side faces

#### **sk_bottom.png**
- **Purpose**: Bottom face of skybox
- **Location**: `skybox/sk_bottom.png`
- **Usage**: Ground/skybox bottom

### Skybox Implementation
```javascript
const up = new THREE.MeshBasicMaterial({ 
    map: new THREE.TextureLoader().load("skybox/sk_top.png"), 
    side: THREE.BackSide 
});
const sd = new THREE.MeshBasicMaterial({ 
    map: new THREE.TextureLoader().load("skybox/sk_side.png"), 
    side: THREE.BackSide 
});
const dn = new THREE.MeshBasicMaterial({ 
    map: new THREE.TextureLoader().load("skybox/sk_bottom.png"), 
    side: THREE.BackSide 
});
let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
let skybox = new THREE.Mesh(skyboxGeo, [sd, sd, up, dn, sd, sd]);
```

---

## 🎭 Special Assets

### DEAMON Images
Located in `/DEAMON/` directory, these are special image assets used for various purposes:

#### **AW_FUCK.png**
- **Purpose**: Reaction image/emote
- **Usage**: Likely used for UI or special interactions

#### **colon_D_wink.png**
- **Purpose**: Emote with winking expression
- **Usage**: UI element or character expression

#### **colon_D.png**
- **Purpose**: Standard emote
- **Usage**: Default character expression

#### **colon_three_smug.png**
- **Purpose**: Smug expression emote
- **Usage**: Character reaction or UI element

#### **colon_three.png**
- **Purpose**: Standard expression
- **Usage**: Character default state

#### **ew.png**
- **Purpose**: Disgust reaction
- **Usage**: Character reaction to unpleasant events

#### **mc_fuckin_scuze_me.png**
- **Purpose**: Surprised/shocked reaction
- **Usage**: Character reaction to unexpected events

#### **ok_and.png**
- **Purpose**: Skeptical reaction
- **Usage**: Character questioning response

#### **well_shit.png**
- **Purpose**: Frustrated reaction
- **Usage**: Character response to difficulties

### Favicon
#### **CtTBSLogo.ico**
- **Purpose**: Browser tab icon
- **Location**: Root directory
- **Usage**: `<link rel="shortcut icon" href="CtTBSLogo.ico" type="image/x-icon">`

---

## 📊 Asset Statistics

### File Sizes & Optimization
| Asset Type | Total Files | Recommended Max Size | Notes |
|------------|-------------|---------------------|--------|
| 3D Models | 11 | <5MB each | Currently optimized .glb format |
| Audio | 5 | <500KB each | MP3 format, good compression |
| Textures | 5 | <1MB each | Mix of PNG/WebP formats |
| Images | 8 | <100KB each | PNG format for transparency |

### Performance Guidelines
- **Total asset size**: Keep under 50MB for web delivery
- **Model complexity**: <10k polygons per model
- **Texture resolution**: Power-of-2 dimensions (512x512, 1024x1024)
- **Audio bitrate**: 128kbps MP3 for balance of quality/size

---

## 🔄 Asset Pipeline

### Adding New Assets

#### 3D Models
1. **Export as .glb** from Blender or other 3D software
2. **Optimize** using glTF Pipeline:
   ```bash
   gltf-pipeline -i model.gltf -o model.glb -d
   ```
3. **Place in** `meshes/` directory
4. **Update initialization** in `initializations.js`

#### Audio Files
1. **Convert to MP3** at 128kbps
2. **Keep under 500KB** per file
3. **Place in** `sounds/` directory
4. **Reference in** `interact.js`

#### Textures
1. **Resize to power-of-2** dimensions
2. **Save as WebP** for best compression (fallback to PNG if needed)
3. **Place in** appropriate directory
4. **Update material references**

### Asset Naming Conventions
- **3D Models**: `lowercase_with_underscores.glb`
- **Audio**: `lowercase_descriptive.mp3`
- **Textures**: `lowercase_material_type.format`
- **Animations**: `PascalCase` within .glb files

---

## 🎮 Asset Usage Map

### Scene Layout
```
Main Scene (0,0,0)
├── Countertop area
│   ├── mug.glb (0, 3.5, -2)
│   ├── paber.glb (game info at -2.3, 0.8, -2)
│   └── paber.glb (CV at 2.3, 0.8, -2)
├── Shrimp area
│   └── shrimp.glb (10, 0, -35)
├── Demon area (100, 0, -16)
│   ├── DemonLadyNoRig.glb (100, 0, -16)
│   └── demonhouse.glb (100, 0, -8)
└── Distant area
    └── magnafier.glb (-400, 0, -16)
```

### Interaction Zones
- **Tea Brewing**: Around mug.glb position
- **Music**: Near shrimp.glb
- **Demon House**: 100 units from origin
- **CV Viewing**: Special camera position for CV room

---

## 🛠️ Asset Troubleshooting

### Common Issues

#### Model Not Loading
- **Check file path** in `initializations.js`
- **Verify .glb file** exists in `meshes/`
- **Check browser console** for 404 errors
- **Ensure web server** is running (not file://)

#### Audio Not Playing
- **Check file path** in Audio() constructor
- **Verify MP3 format** compatibility
- **Check browser autoplay** policy
- **Ensure file size** is reasonable

#### Texture Issues
- **Check power-of-2 dimensions**
- **Verify file format** (PNG/WebP)
- **Check file paths** in TextureLoader
- **Ensure CORS headers** for web server

### Asset Validation Tools
- **glTF Validator**: https://github.khronos.org/glTF-Validator/
- **WebGL Report**: https://webglreport.com/
- **Browser DevTools**: Network tab for asset loading

---

## 📈 Future Asset Recommendations

### Performance Optimizations
- **Texture compression**: Use Basis Universal format
- **Mesh optimization**: Use Draco compression for .glb
- **Audio streaming**: Implement audio sprite system
- **LOD system**: Multiple detail levels for distant objects

### Content Expansion
- **Additional tea types**: Different mug models
- **Environment variants**: Weather/time of day
- **Character animations**: More demon interactions
- **Sound variety**: Ambient environmental audio

---

This asset inventory serves as a comprehensive reference for all visual and audio elements in the Countertop Tea Brewing Simulator. Use this guide when adding new assets or troubleshooting existing ones.