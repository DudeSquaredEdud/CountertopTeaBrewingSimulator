# Assets Organization Guide

This document outlines the organized structure for all assets in the Countertop Tea Brewing Simulator project.

## Directory Structure

```
assets/
├── models/                 # 3D Models and Meshes
│   ├── characters/        # Character models
│   ├── environment/       # Environmental models (rooms, buildings)
│   ├── props/            # Interactive objects and props
│   └── [model files].glb
├── textures/             # Texture files
│   ├── environment/      # Skybox and environmental textures
│   ├── ui/              # UI textures and sprites
│   └── [texture files].png, .webp, etc.
├── audio/               # Audio files
│   ├── sfx/             # Sound effects
│   └── music/           # Background music
├── images/              # 2D images and graphics
│   ├── icons/           # Icon files
│   ├── logos/           # Logo files
│   └── characters/      # Character images/emotes
├── materials/           # Material definitions and shaders
│   └── shaders/         # Custom shader files
├── fonts/               # Font files
├── ui/                  # UI-specific assets
│   ├── buttons/         # Button graphics
│   └── backgrounds/     # Background images
├── animations/          # Animation files
└── data/               # Configuration and data files
```

## Asset Migration Summary

All existing assets have been moved to their new organized locations:

### Models (formerly in `meshes/`)
- `CV_Room.glb` → `assets/models/CV_Room.glb`
- `outside.glb` → `assets/models/outside.glb`
- `shrimp.glb` → `assets/models/shrimp.glb`
- `wallsAndFloor.glb` → `assets/models/wallsAndFloor.glb`
- `countertop.glb` → `assets/models/countertop.glb`
- `paber.glb` → `assets/models/paber.glb`
- `mug.glb` → `assets/models/mug.glb`
- `magnafier.glb` → `assets/models/magnafier.glb`
- `DemonLadyNoRig.glb` → `assets/models/DemonLadyNoRig.glb`
- `demonhouse.glb` → `assets/models/demonhouse.glb`
- `backWall.glb` → `assets/models/backWall.glb`

### Textures (formerly in `textures/` and `skybox/`)
- `SKY.png` → `assets/textures/SKY.png`
- `wood.webp` → `assets/textures/wood.webp`
- `sk_*.png` (skybox files) → `assets/textures/environment/`

### Audio (formerly in `sounds/`)
- `sip.mp3` → `assets/audio/sfx/sip.mp3`
- `slurp.mp3` → `assets/audio/sfx/slurp.mp3`
- `shrimp.mp3` → `assets/audio/sfx/shrimp.mp3`
- `GREAT.mp3` → `assets/audio/sfx/GREAT.mp3`
- `YEAH.mp3` → `assets/audio/sfx/YEAH.mp3`

### Images (formerly in `DEAMON/` and root)
- All DEAMON emote images → `assets/images/`
- `CtTBSLogo.ico` → `assets/images/logos/CtTBSLogo.ico`

## Usage Guidelines

### Adding New Assets
1. Place assets in the appropriate subdirectory based on type and purpose
2. Use descriptive, lowercase filenames with underscores for spaces
3. Follow existing naming conventions for consistency

### Referencing Assets in Code
Update all file paths to use the new structure:
- Models: `assets/models/[filename].glb`
- Textures: `assets/textures/[filename].[ext]`
- Audio: `assets/audio/sfx/[filename].mp3`
- Images: `assets/images/[filename].[ext]`

### Development Server
The development server has been updated to serve assets from the `assets/` directory, making all subdirectories accessible.

## Future Expansion
The structure is designed to accommodate:
- Additional character models in `assets/models/characters/`
- UI elements in `assets/ui/`
- Custom materials and shaders in `assets/materials/`
- Animation files in `assets/animations/`
- Configuration data in `assets/data/`