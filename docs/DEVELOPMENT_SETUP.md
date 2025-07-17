# Development Setup Guide

This guide provides detailed instructions for setting up the Countertop Tea Brewing Simulator development environment.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher) - for development tools
- **Git** - for version control
- **Modern web browser** - Chrome, Firefox, Safari, or Edge
- **Code editor** - VS Code recommended

### 1. Clone the Repository

```bash
git clone [repository-url]
cd CountertopTeaBrewingSimulator
```

### 2. Development Server Options

#### Option A: Simple HTTP Server (Recommended for beginners)
```bash
# Using Python (built-in)
python -m http.server 8000

# Using Node.js (install serve globally)
npm install -g serve
serve .

# Using PHP (built-in)
php -S localhost:8000
```

#### Option B: Live Development Server
```bash
# Install live-server for auto-reload
npm install -g live-server

# Start with auto-reload
live-server --port=8000 --open=/index.html
```

#### Option C: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 3. Verify Installation

Open your browser and navigate to:
```
http://localhost:8000
```

You should see the loading screen with a random quote, followed by the 3D environment.

## 🛠️ Development Tools

### Browser Developer Tools
- **Chrome DevTools**: F12 or Ctrl+Shift+I
- **Firefox Developer Tools**: F12 or Ctrl+Shift+K
- **Performance tab**: Monitor frame rate and memory usage
- **Console tab**: View logs and debug output

### VS Code Extensions (Recommended)
- **Live Server**: Instant browser refresh
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Three.js Dev Tools**: 3D scene inspection

### Debugging Setup

#### Enable Debug Mode
Edit `modelLoading.js` to enable detailed logging:
```javascript
// Change dump parameter to true for detailed model info
export function quickLoad(scene, name, path, dump = true) {
```

#### Performance Monitoring
Add to `main.js` for FPS monitoring:
```javascript
// Add after renderer initialization
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    move.move();
    cam.updateCamera();
    
    // FPS counter
    console.log(renderer.info.render.frame);
});
```

## 📁 Project Structure Deep Dive

```
CountertopTeaBrewingSimulator/
├── 📄 index.html                 # Main HTML entry point
├── 📄 main.js                    # Application bootstrap
├── 📄 initializations.js         # Scene setup & model placement
├── 📄 modelLoading.js            # Asset loading utilities
├── 📄 camera.js                  # Camera & controls
├── 📄 lights.js                  # Lighting system
├── 📄 interact.js                # Game logic & interactions
├── 📄 clicking.js                # Input handling
├── 📄 move.js                    # Physics & movement
├── 📄 loadingScreen.js           # Loading experience
├── 📁 meshes/                    # 3D assets
│   ├── countertop.glb           # Main environment
│   ├── mug.glb                  # Interactive mug
│   ├── shrimp.glb               # Animated shrimp
│   └── ...
├── 📁 sounds/                    # Audio assets
├── 📁 textures/                  # Texture files
├── 📁 skybox/                    # Skybox textures
├── 📁 DEAMON/                    # Special assets
├── 📄 README.md                  # Project overview
├── 📄 DEVELOPMENT_SETUP.md       # This file
└── 📄 CONTRIBUTING.md            # Contribution guidelines
```

## 🔧 Development Workflow

### 1. Making Changes

#### Adding a New 3D Model
1. **Place model** in `meshes/` directory
2. **Update initialization** in `initializations.js`:
   ```javascript
   await init("my_model", 'meshes/my_model.glb', (thing) => {
       thing.position.set(0, 0, 0);
       thing.scale.set(1, 1, 1);
       childTooltip(thing, "My New Object");
   });
   ```
3. **Add interaction** in `interact.js` if needed
4. **Test** in browser

#### Adding New Audio
1. **Place audio** in `sounds/` directory
2. **Import in interact.js**:
   ```javascript
   var mySound = new Audio('sounds/mySound.mp3');
   ```
3. **Add trigger logic** in appropriate function

#### Adding New Textures
1. **Place texture** in `textures/` directory
2. **Use in code**:
   ```javascript
   const texture = new THREE.TextureLoader().load("textures/myTexture.jpg");
   ```

### 2. Testing Changes

#### Manual Testing Checklist
- [ ] Models load without errors
- [ ] Animations play correctly
- [ ] Interactions work as expected
- [ ] No console errors
- [ ] Performance remains smooth (>30 FPS)
- [ ] Cross-browser compatibility

#### Automated Testing
Create a simple test file `test.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>CtTBS Test</title>
</head>
<body>
    <h1>Quick Test</h1>
    <iframe src="index.html" width="800" height="600"></iframe>
    <div id="test-results"></div>
</body>
</html>
```

### 3. Performance Optimization

#### Model Optimization
- **Use glTF format** for best compression
- **Limit polygon count** to <10k per model
- **Optimize textures** to power-of-2 dimensions
- **Use texture atlasing** for multiple small textures

#### Code Optimization
- **Minimize draw calls** by merging geometries
- **Use instancing** for repeated objects
- **Implement LOD** (Level of Detail) for distant objects
- **Cache frequently accessed objects**

## 🐛 Common Issues & Solutions

### Issue: "Failed to load model"
**Symptoms**: Model doesn't appear, console shows 404 error
**Solution**: 
- Check file path in `initializations.js`
- Ensure model is in `meshes/` directory
- Verify web server is running

### Issue: "CORS policy error"
**Symptoms**: Models fail to load with CORS error
**Solution**: 
- Use a local web server (not file://)
- Check server CORS headers
- Use relative paths for assets

### Issue: "Performance issues"
**Symptoms**: Low FPS, stuttering
**Solution**:
- Check browser console for errors
- Reduce model complexity
- Lower texture resolution
- Disable shadows if enabled

### Issue: "Audio doesn't play"
**Symptoms**: No sound effects
**Solution**:
- Check audio file paths
- Ensure audio files exist
- Check browser autoplay policy
- Verify audio format compatibility

## 🧪 Advanced Development

### Custom Build Process

#### Using Webpack (Optional)
1. **Install dependencies**:
   ```bash
   npm init -y
   npm install --save-dev webpack webpack-cli webpack-dev-server
   npm install three
   ```

2. **Create webpack.config.js**:
   ```javascript
   const path = require('path');
   module.exports = {
     entry: './main.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist'),
     },
     devServer: {
       contentBase: './',
       port: 8000,
     },
   };
   ```

3. **Build and serve**:
   ```bash
   npx webpack serve
   ```

### Environment Variables

Create `.env` file for development:
```bash
# Development settings
DEBUG=true
SHOW_FPS=true
SKIP_LOADING=false
```

### Custom Debug Tools

Create `debug.js`:
```javascript
// Debug utilities
export const Debug = {
    showBoundingBoxes: false,
    showWireframes: false,
    logPerformance: false,
    
    toggleBoundingBoxes() {
        this.showBoundingBoxes = !this.showBoundingBoxes;
        // Implementation...
    },
    
    logSceneGraph() {
        console.log("Scene objects:", scene.children);
    }
};
```

## 📊 Monitoring & Analytics

### Performance Metrics
Add to `main.js`:
```javascript
// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
        console.log(`FPS: ${frameCount}`);
        frameCount = 0;
        lastTime = now;
    }
}
```

### Error Tracking
```javascript
// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Send to analytics service
});
```

## 🔄 Continuous Integration

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📞 Getting Help

### Resources
- **Three.js Documentation**: https://threejs.org/docs/
- **WebGL Fundamentals**: https://webglfundamentals.org/
- **Browser DevTools**: Built-in debugging tools

### Community
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Wiki**: Detailed documentation and tutorials

---

**Next Steps**: Check out [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and [API.md](API.md) for detailed module documentation.