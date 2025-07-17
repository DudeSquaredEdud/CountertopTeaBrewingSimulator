/**
 * Debug Tools for Countertop Tea Brewing Simulator
 * 
 * This module provides debugging utilities for development and troubleshooting.
 * Include this file in your HTML for development builds.
 */

import * as THREE from 'three';
import * as main from '../main.js';

// Debug configuration
export const Debug = {
    enabled: true,
    showStats: false,
    showBoundingBoxes: false,
    showWireframes: false,
    logPerformance: false,
    showGrid: false,
    showAxes: false,
    highlightIntersections: false,
    
    // Performance tracking
    frameCount: 0,
    lastTime: performance.now(),
    fps: 0,
    
    // Debug objects
    debugHelpers: [],
    statsPanel: null,
    gridHelper: null,
    axesHelper: null,
    
    // Raycaster for debugging
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    
    /**
     * Initialize debug tools
     */
    init() {
        if (!this.enabled) return;
        
        console.log('🔧 Debug tools initialized');
        this.createStatsPanel();
        this.setupEventListeners();
        this.createKeyboardShortcuts();
    },
    
    /**
     * Create performance stats panel
     */
    createStatsPanel() {
        if (this.statsPanel) return;
        
        this.statsPanel = document.createElement('div');
        this.statsPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            border-radius: 5px;
            z-index: 10000;
            min-width: 200px;
        `;
        document.body.appendChild(this.statsPanel);
    },
    
    /**
     * Update performance stats
     */
    updateStats() {
        if (!this.showStats || !this.statsPanel) return;
        
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            this.frameCount = 0;
            this.lastTime = now;
        }
        
        const renderer = main.renderer || document.querySelector('canvas')?.getContext('webgl');
        if (renderer && renderer.info) {
            this.statsPanel.innerHTML = `
                <div><strong>Performance Stats</strong></div>
                <div>FPS: ${this.fps}</div>
                <div>Draw Calls: ${renderer.info.render.calls}</div>
                <div>Geometries: ${renderer.info.memory.geometries}</div>
                <div>Textures: ${renderer.info.memory.textures}</div>
                <div>Triangles: ${renderer.info.render.triangles}</div>
                <div>Points: ${renderer.info.render.points}</div>
                <div>Lines: ${renderer.info.render.lines}</div>
            `;
        }
    },
    
    /**
     * Toggle bounding box visualization
     */
    toggleBoundingBoxes() {
        this.showBoundingBoxes = !this.showBoundingBoxes;
        
        if (this.showBoundingBoxes) {
            this.showAllBoundingBoxes();
        } else {
            this.hideAllBoundingBoxes();
        }
    },
    
    /**
     * Show bounding boxes for all objects
     */
    showAllBoundingBoxes() {
        this.clearDebugHelpers();
        
        main.scene.traverse((object) => {
            if (object.isMesh && object.geometry) {
                const box = new THREE.BoxHelper(object, 0xff0000);
                main.scene.add(box);
                this.debugHelpers.push(box);
            }
        });
    },
    
    /**
     * Hide all bounding boxes
     */
    hideAllBoundingBoxes() {
        this.debugHelpers.forEach(helper => {
            main.scene.remove(helper);
        });
        this.debugHelpers = [];
    },
    
    /**
     * Toggle wireframe mode
     */
    toggleWireframes() {
        this.showWireframes = !this.showWireframes;
        
        main.scene.traverse((object) => {
            if (object.isMesh && object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(mat => {
                        if (mat.wireframe !== undefined) {
                            mat.wireframe = this.showWireframes;
                        }
                    });
                } else if (object.material.wireframe !== undefined) {
                    object.material.wireframe = this.showWireframes;
                }
            }
        });
    },
    
    /**
     * Toggle grid helper
     */
    toggleGrid() {
        this.showGrid = !this.showGrid;
        
        if (this.showGrid && !this.gridHelper) {
            this.gridHelper = new THREE.GridHelper(100, 100);
            main.scene.add(this.gridHelper);
        } else if (!this.showGrid && this.gridHelper) {
            main.scene.remove(this.gridHelper);
            this.gridHelper = null;
        }
    },
    
    /**
     * Toggle axes helper
     */
    toggleAxes() {
        this.showAxes = !this.showAxes;
        
        if (this.showAxes && !this.axesHelper) {
            this.axesHelper = new THREE.AxesHelper(50);
            main.scene.add(this.axesHelper);
        } else if (!this.showAxes && this.axesHelper) {
            main.scene.remove(this.axesHelper);
            this.axesHelper = null;
        }
    },
    
    /**
     * Highlight intersections for raycasting
     */
    toggleIntersectionHighlight() {
        this.highlightIntersections = !this.highlightIntersections;
    },
    
    /**
     * Log scene hierarchy
     */
    logSceneHierarchy() {
        console.group('Scene Hierarchy');
        this.logObjectHierarchy(main.scene, 0);
        console.groupEnd();
    },
    
    /**
     * Recursively log object hierarchy
     */
    logObjectHierarchy(object, depth = 0) {
        const indent = '  '.repeat(depth);
        const info = `${object.name || 'unnamed'} [${object.type}]`;
        
        if (object.isMesh) {
            console.log(`${indent}📦 ${info}`, {
                position: object.position,
                geometry: object.geometry?.type,
                material: object.material?.type
            });
        } else if (object.isLight) {
            console.log(`${indent}💡 ${info}`, {
                position: object.position,
                intensity: object.intensity,
                color: object.color?.getHexString()
            });
        } else {
            console.log(`${indent}📁 ${info}`);
        }
        
        object.children.forEach(child => {
            this.logObjectHierarchy(child, depth + 1);
        });
    },
    
    /**
     * Find object by name
     */
    findObject(name) {
        let found = null;
        main.scene.traverse((object) => {
            if (object.name === name) {
                found = object;
            }
        });
        return found;
    },
    
    /**
     * Log object details
     */
    logObjectDetails(name) {
        const object = this.findObject(name);
        if (object) {
            console.group(`Object Details: ${name}`);
            console.log('Object:', object);
            console.log('Position:', object.position);
            console.log('Rotation:', object.rotation);
            console.log('Scale:', object.scale);
            console.log('Visible:', object.visible);
            console.log('Children:', object.children.length);
            
            if (object.isMesh) {
                console.log('Geometry:', object.geometry);
                console.log('Material:', object.material);
                console.log('Bounding Box:', new THREE.Box3().setFromObject(object));
            }
            console.groupEnd();
        } else {
            console.warn(`Object "${name}" not found`);
        }
    },
    
    /**
     * Measure performance impact
     */
    measurePerformance() {
        const startTime = performance.now();
        const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        
        // Force render
        main.renderer.render(main.scene, main.camera);
        
        const endTime = performance.now();
        const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        
        console.log('Performance Measurement:', {
            renderTime: endTime - startTime,
            memoryDelta: endMemory - startMemory,
            totalMemory: performance.memory ? performance.memory.usedJSHeapSize : 'N/A'
        });
    },
    
    /**
     * Create test objects
     */
    createTestObjects() {
        // Create a test cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.name = 'debug_cube';
        cube.position.set(0, 5, 0);
        main.scene.add(cube);
        
        // Create test sphere
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.name = 'debug_sphere';
        sphere.position.set(2, 5, 0);
        main.scene.add(sphere);
        
        console.log('Test objects created');
    },
    
    /**
     * Clear all debug objects
     */
    clearDebugObjects() {
        const objectsToRemove = [];
        main.scene.traverse((object) => {
            if (object.name && object.name.startsWith('debug_')) {
                objectsToRemove.push(object);
            }
        });
        
        objectsToRemove.forEach(object => {
            main.scene.remove(object);
        });
        
        this.clearDebugHelpers();
    },
    
    /**
     * Clear debug helpers
     */
    clearDebugHelpers() {
        this.debugHelpers.forEach(helper => {
            main.scene.remove(helper);
        });
        this.debugHelpers = [];
    },
    
    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            if (!this.enabled) return;
            
            switch (event.key.toLowerCase()) {
                case 'f1':
                    event.preventDefault();
                    this.toggleStats();
                    break;
                case 'f2':
                    event.preventDefault();
                    this.toggleBoundingBoxes();
                    break;
                case 'f3':
                    event.preventDefault();
                    this.toggleWireframes();
                    break;
                case 'f4':
                    event.preventDefault();
                    this.toggleGrid();
                    break;
                case 'f5':
                    event.preventDefault();
                    this.toggleAxes();
                    break;
                case 'f6':
                    event.preventDefault();
                    this.logSceneHierarchy();
                    break;
                case 'f7':
                    event.preventDefault();
                    this.createTestObjects();
                    break;
                case 'f8':
                    event.preventDefault();
                    this.clearDebugObjects();
                    break;
                case 'f9':
                    event.preventDefault();
                    this.measurePerformance();
                    break;
            }
        });
    },
    
    /**
     * Setup mouse event listeners
     */
    setupEventListeners() {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        document.addEventListener('click', (event) => {
            if (event.shiftKey && this.enabled) {
                this.raycaster.setFromCamera(this.mouse, main.camera);
                const intersects = this.raycaster.intersectObjects(main.scene.children, true);
                
                if (intersects.length > 0) {
                    const object = intersects[0].object;
                    console.log('Clicked object:', object);
                    this.logObjectDetails(object.name || 'unnamed');
                }
            }
        });
    },
    
    /**
     * Toggle stats display
     */
    toggleStats() {
        this.showStats = !this.showStats;
        if (this.statsPanel) {
            this.statsPanel.style.display = this.showStats ? 'block' : 'none';
        }
    },
    
    /**
     * Export scene to JSON
     */
    exportScene() {
        const sceneData = {
            objects: [],
            lights: [],
            cameras: []
        };
        
        main.scene.traverse((object) => {
            if (object.isMesh) {
                sceneData.objects.push({
                    name: object.name,
                    type: object.type,
                    position: object.position.toArray(),
                    rotation: object.rotation.toArray(),
                    scale: object.scale.toArray(),
                    geometry: object.geometry?.type,
                    material: object.material?.type
                });
            } else if (object.isLight) {
                sceneData.lights.push({
                    name: object.name,
                    type: object.type,
                    position: object.position.toArray(),
                    intensity: object.intensity,
                    color: object.color?.getHex()
                });
            }
        });
        
        console.log('Scene export:', sceneData);
        return JSON.stringify(sceneData, null, 2);
    }
};

// Auto-initialize if included
if (typeof window !== 'undefined') {
    window.Debug = Debug;
    Debug.init();
}

export default Debug;