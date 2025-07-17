# Contributing to Countertop Tea Brewing Simulator

Thank you for your interest in contributing to the Countertop Tea Brewing Simulator! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Ways to Contribute
- **Bug Reports**: Report issues you encounter
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit pull requests with fixes or features
- **Documentation**: Improve or translate documentation
- **Testing**: Test the game and provide feedback
- **Assets**: Create new 3D models, textures, or sounds
- **Performance**: Optimize existing code or assets

## 🚀 Getting Started

### Prerequisites
- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Text Editor**: VS Code, WebStorm, or similar
- **Node.js**: For development server (optional, v14+)
- **Git**: For version control

### Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/CountertopTeaBrewingSimulator.git
   cd CountertopTeaBrewingSimulator
   ```
3. **Start development server**:
   ```bash
   node tools/dev-server.js
   ```
4. **Open in browser**: http://localhost:3000

## 📋 Development Guidelines

### Code Style
- **ES6+**: Use modern JavaScript features
- **Modules**: Use ES6 import/export syntax
- **Naming**: Use descriptive camelCase for variables and functions
- **Comments**: Document complex logic and public APIs
- **Formatting**: Consistent indentation (4 spaces)

### File Organization
```
New features should follow the existing structure:
├── feature-name.js          # Main feature logic
├── feature-name.test.js     # Tests (if applicable)
└── docs/feature-name.md     # Documentation
```

### Code Guidelines
- **Performance**: Optimize for 60 FPS on modern hardware
- **Memory**: Avoid memory leaks, clean up resources
- **Compatibility**: Test on major browsers
- **Accessibility**: Consider keyboard navigation and screen readers
- **Mobile**: Ensure touch controls work on mobile devices

## 🐛 Bug Reports

### Before Reporting
1. **Check existing issues** on GitHub
2. **Test latest version** from main branch
3. **Search closed issues** for similar problems

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: [e.g. Chrome 91]
- OS: [e.g. Windows 10]
- Device: [e.g. Desktop, iPhone 12]

**Screenshots**
If applicable, add screenshots

**Console Errors**
Any error messages in browser console
```

## 💡 Feature Requests

### Before Requesting
1. **Check existing requests** on GitHub
2. **Consider scope**: Is this within the game's vision?
3. **Think about impact**: How does this affect performance?

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Problem Solved**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternatives Considered**
Other approaches you've thought of

**Additional Context**
Screenshots, mockups, or examples
```

## 🔧 Development Workflow

### Branch Naming
- **Features**: `feature/add-new-tea-type`
- **Bug fixes**: `fix/mug-collision-issue`
- **Performance**: `perf/reduce-draw-calls`
- **Documentation**: `docs/update-setup-guide`

### Commit Messages
Use conventional commits format:
```
feat: add new tea brewing animation
fix: resolve mug positioning bug
docs: update API documentation
perf: optimize model loading
refactor: reorganize interaction system
test: add unit tests for movement
chore: update dependencies
```

### Pull Request Process
1. **Create feature branch** from main
2. **Make changes** following code guidelines
3. **Test thoroughly** on multiple browsers
4. **Update documentation** if needed
5. **Submit pull request** with clear description

### Pull Request Template
```markdown
**Description**
Brief description of changes

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Performance improvement
- [ ] Documentation update
- [ ] Code refactoring

**Testing**
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile
- [ ] No console errors

**Screenshots**
If UI changes, include screenshots

**Additional Notes**
Any special considerations
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] **Basic functionality**: Movement, interaction, loading
- [ ] **Performance**: Smooth 60 FPS on target hardware
- [ ] **Browser compatibility**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile testing**: Touch controls, performance
- [ ] **Error handling**: Graceful handling of missing assets
- [ ] **Accessibility**: Keyboard navigation, screen reader support

### Performance Testing
- **Target FPS**: 60 FPS on mid-range hardware
- **Memory usage**: < 100MB typical usage
- **Load time**: < 5 seconds on broadband
- **Asset size**: Optimize textures and models

## 🎨 Asset Guidelines

### 3D Models
- **Format**: GLB (binary glTF)
- **Size**: Keep under 5MB per model
- **Polygons**: Optimize for web (target < 10k triangles)
- **Textures**: Use web-optimized formats (WebP, JPEG)
- **Animations**: Use skeletal animation when possible

### Textures
- **Format**: WebP preferred, JPEG fallback
- **Size**: Power of 2 dimensions (512x512, 1024x1024)
- **Compression**: Use appropriate compression levels
- **Color space**: sRGB for color textures

### Audio
- **Format**: MP3 for compatibility, OGG for quality
- **Bitrate**: 128kbps for music, 64kbps for effects
- **Length**: Keep short, loop when appropriate
- **Volume**: Normalize to -6dB peak

## 📊 Performance Guidelines

### Optimization Targets
- **Draw calls**: < 1000 per frame
- **Triangles**: < 100k visible
- **Textures**: < 50MB total
- **Memory**: < 200MB heap usage
- **Load time**: < 3 seconds initial load

### Profiling Tools
- **Browser DevTools**: Performance tab
- **Three.js Inspector**: Chrome extension
- **Custom tools**: Use `tools/performance-monitor.js`
- **Mobile testing**: Chrome DevTools remote debugging

## 📝 Documentation Standards

### Code Documentation
```javascript
/**
 * Brief description of function
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 * @example
 * // Example usage
 * functionName(param);
 */
```

### README Updates
- **Keep current**: Update when adding features
- **Screenshots**: Include for visual changes
- **Examples**: Provide usage examples
- **Breaking changes**: Document migration steps

## 🎯 Release Process

### Version Numbering
Use semantic versioning (SemVer):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist
- [ ] **Update version** in package files
- [ ] **Test thoroughly** on all platforms
- [ ] **Update documentation**
- [ ] **Create release notes**
- [ ] **Tag release** in git
- [ ] **Deploy** to hosting platform

## 🤔 Getting Help

### Resources
- **Documentation**: Check existing docs first
- **Issues**: Search GitHub issues
- **Discussions**: Use GitHub Discussions
- **Discord**: Join community chat (if available)

### Contact
- **GitHub Issues**: For bugs and feature requests
- **Email**: For security issues or private concerns
- **Social Media**: For general questions

## 🏆 Recognition

### Contributors
Contributors will be recognized in:
- **README.md**: Contributors section
- **Release notes**: For significant contributions
- **In-game credits**: For major features

### Code of Conduct
Be respectful, inclusive, and constructive in all interactions.

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to the Countertop Tea Brewing Simulator! Every contribution, no matter how small, helps make this project better.