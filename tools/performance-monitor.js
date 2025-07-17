/**
 * Performance Monitor for Countertop Tea Brewing Simulator
 * 
 * Advanced performance monitoring and optimization tools
 */

import * as THREE from 'three';
import * as main from '../main.js';

export class PerformanceMonitor {
    constructor() {
        this.enabled = true;
        this.stats = {
            fps: 0,
            frameTime: 0,
            memory: 0,
            drawCalls: 0,
            triangles: 0,
            geometries: 0,
            textures: 0
        };
        
        this.history = {
            fps: [],
            frameTime: [],
            memory: [],
            drawCalls: []
        };
        
        this.maxHistoryLength = 100;
        this.lastTime = performance.now();
        this.frameCount = 0;
        
        this.createUI();
        this.startMonitoring();
    }
    
    /**
     * Create performance monitoring UI
     */
    createUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'performance-monitor';
        this.ui.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            padding: 15px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            border-radius: 8px;
            border: 1px solid #00ff00;
            z-index: 10000;
            min-width: 250px;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        `;
        
        this.ui.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px; color: #00ff00;">
                🚀 Performance Monitor
            </div>
            <div id="perf-stats">
                Loading...
            </div>
            <div style="margin-top: 10px; font-size: 10px; color: #888;">
                Press P to toggle | Shift+P to reset
            </div>
        `;
        
        document.body.appendChild(this.ui);
        
        // Create canvas for graphs
        this.canvas = document.createElement('canvas');
        this.canvas.width = 250;
        this.canvas.height = 100;
        this.canvas.style.cssText = `
            margin-top: 10px;
            border: 1px solid #00ff00;
            border-radius: 4px;
        `;
        this.ui.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }
    
    /**
     * Start performance monitoring
     */
    startMonitoring() {
        if (!this.enabled) return;
        
        this.updateLoop();
        this.setupKeyboardControls();
    }
    
    /**
     * Main update loop
     */
    updateLoop() {
        if (!this.enabled) return;
        
        this.updateStats();
        this.updateUI();
        this.updateGraphs();
        
        requestAnimationFrame(() => this.updateLoop());
    }
    
    /**
     * Update performance statistics
     */
    updateStats() {
        const now = performance.now();
        const deltaTime = now - this.lastTime;
        
        this.frameCount++;
        
        if (deltaTime >= 1000) {
            this.stats.fps = Math.round((this.frameCount * 1000) / deltaTime);
            this.frameCount = 0;
            this.lastTime = now;
            
            // Add to history
            this.addToHistory('fps', this.stats.fps);
        }
        
        // Get renderer stats
        if (main.renderer && main.renderer.info) {
            const info = main.renderer.info;
            this.stats.drawCalls = info.render.calls;
            this.stats.triangles = info.render.triangles;
            this.stats.geometries = info.memory.geometries;
            this.stats.textures = info.memory.textures;
            
            this.addToHistory('drawCalls', this.stats.drawCalls);
        }
        
        // Memory usage (if available)
        if (performance.memory) {
            this.stats.memory = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            this.addToHistory('memory', this.stats.memory);
        }
        
        // Frame time
        this.stats.frameTime = Math.round(deltaTime);
        this.addToHistory('frameTime', this.stats.frameTime);
    }
    
    /**
     * Add data point to history
     */
    addToHistory(type, value) {
        if (!this.history[type]) this.history[type] = [];
        this.history[type].push(value);
        
        if (this.history[type].length > this.maxHistoryLength) {
            this.history[type].shift();
        }
    }
    
    /**
     * Update UI display
     */
    updateUI() {
        const statsDiv = document.getElementById('perf-stats');
        if (!statsDiv) return;
        
        const warningThreshold = 30; // FPS
        const dangerThreshold = 20; // FPS
        
        let fpsColor = '#00ff00';
        if (this.stats.fps < dangerThreshold) {
            fpsColor = '#ff0000';
        } else if (this.stats.fps < warningThreshold) {
            fpsColor = '#ffff00';
        }
        
        statsDiv.innerHTML = `
            <div style="color: ${fpsColor}">FPS: ${this.stats.fps}</div>
            <div>Frame Time: ${this.stats.frameTime}ms</div>
            <div>Memory: ${this.stats.memory}MB</div>
            <div>Draw Calls: ${this.stats.drawCalls}</div>
            <div>Triangles: ${this.stats.triangles.toLocaleString()}</div>
            <div>Geometries: ${this.stats.geometries}</div>
            <div>Textures: ${this.stats.textures}</div>
        `;
    }
    
    /**
     * Update performance graphs
     */
    updateGraphs() {
        if (!this.ctx) return;
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw FPS graph
        this.drawGraph('fps', '#00ff00', 60, 0, height / 2);
        
        // Draw memory graph
        this.drawGraph('memory', '#ff00ff', 100, 0, height);
    }
    
    /**
     * Draw a single graph
     */
    drawGraph(type, color, maxValue, yOffset, height) {
        if (!this.history[type] || this.history[type].length < 2) return;
        
        const data = this.history[type];
        const width = this.canvas.width;
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * width;
            const y = yOffset + height - (data[i] / maxValue) * height;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
        
        // Draw baseline
        this.ctx.strokeStyle = '#333';
        this.ctx.beginPath();
        this.ctx.moveTo(0, yOffset + height);
        this.ctx.lineTo(width, yOffset + height);
        this.ctx.stroke();
    }
    
    /**
     * Setup keyboard controls
     */
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'p') {
                if (event.shiftKey) {
                    this.reset();
                } else {
                    this.toggle();
                }
            }
        });
    }
    
    /**
     * Toggle performance monitor
     */
    toggle() {
        this.enabled = !this.enabled;
        this.ui.style.display = this.enabled ? 'block' : 'none';
        
        if (this.enabled) {
            this.startMonitoring();
        }
    }
    
    /**
     * Reset performance data
     */
    reset() {
        this.history = {
            fps: [],
            frameTime: [],
            memory: [],
            drawCalls: []
        };
        this.frameCount = 0;
        this.lastTime = performance.now();
        console.log('Performance monitor reset');
    }
    
    /**
     * Get performance report
     */
    getReport() {
        return {
            current: { ...this.stats },
            averages: {
                fps: this.getAverage('fps'),
                frameTime: this.getAverage('frameTime'),
                memory: this.getAverage('memory'),
                drawCalls: this.getAverage('drawCalls')
            },
            recommendations: this.getRecommendations()
        };
    }
    
    /**
     * Get average for a metric
     */
    getAverage(type) {
        if (!this.history[type] || this.history[type].length === 0) return 0;
        const sum = this.history[type].reduce((a, b) => a + b, 0);
        return Math.round(sum / this.history[type].length);
    }
    
    /**
     * Get performance recommendations
     */
    getRecommendations() {
        const recommendations = [];
        
        if (this.stats.fps < 30) {
            recommendations.push('Consider reducing model complexity');
            recommendations.push('Lower texture resolutions');
            recommendations.push('Reduce shadow quality');
        }
        
        if (this.stats.drawCalls > 1000) {
            recommendations.push('Batch similar objects');
            recommendations.push('Use instanced rendering');
            recommendations.push('Merge geometries where possible');
        }
        
        if (this.stats.memory > 100) {
            recommendations.push('Optimize texture sizes');
            recommendations.push('Unload unused assets');
            recommendations.push('Use texture compression');
        }
        
        return recommendations;
    }
    
    /**
     * Export performance data
     */
    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            stats: this.getReport(),
            history: this.history,
            userAgent: navigator.userAgent,
            screen: {
                width: window.innerWidth,
                height: window.innerHeight,
                pixelRatio: window.devicePixelRatio
            }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Memory leak detector
export class MemoryLeakDetector {
    constructor() {
        this.snapshots = [];
        this.monitoring = false;
    }
    
    /**
     * Take memory snapshot
     */
    takeSnapshot(label = 'snapshot') {
        if (!performance.memory) {
            console.warn('Memory API not available');
            return;
        }
        
        const snapshot = {
            label,
            timestamp: Date.now(),
            memory: {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            }
        };
        
        this.snapshots.push(snapshot);
        console.log(`Memory snapshot: ${label}`, snapshot);
        
        return snapshot;
    }
    
    /**
     * Compare snapshots
     */
    compareSnapshots(index1, index2) {
        if (index1 >= this.snapshots.length || index2 >= this.snapshots.length) {
            console.error('Invalid snapshot indices');
            return;
        }
        
        const snap1 = this.snapshots[index1];
        const snap2 = this.snapshots[index2];
        
        const delta = {
            label1: snap1.label,
            label2: snap2.label,
            timeDelta: snap2.timestamp - snap1.timestamp,
            memoryDelta: snap2.memory.used - snap1.memory.used,
            percentageChange: ((snap2.memory.used - snap1.memory.used) / snap1.memory.used) * 100
        };
        
        console.log('Memory comparison:', delta);
        return delta;
    }
    
    /**
     * Start monitoring
     */
    start(interval = 5000) {
        this.monitoring = true;
        this.takeSnapshot('start');
        
        this.intervalId = setInterval(() => {
            this.takeSnapshot(`interval-${Date.now()}`);
        }, interval);
    }
    
    /**
     * Stop monitoring
     */
    stop() {
        this.monitoring = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.takeSnapshot('end');
    }
}

// Asset loading monitor
export class AssetMonitor {
    constructor() {
        this.assets = new Map();
        this.loadingTimes = [];
        this.totalSize = 0;
    }
    
    /**
     * Track asset loading
     */
    trackAsset(name, url, startTime, endTime, size) {
        const loadingTime = endTime - startTime;
        const asset = {
            name,
            url,
            loadingTime,
            size,
            speed: size / (loadingTime / 1000) // bytes per second
        };
        
        this.assets.set(name, asset);
        this.loadingTimes.push(loadingTime);
        this.totalSize += size;
        
        console.log(`Asset loaded: ${name} (${loadingTime}ms, ${(size/1024/1024).toFixed(2)}MB)`);
    }
    
    /**
     * Get loading report
     */
    getLoadingReport() {
        const report = {
            totalAssets: this.assets.size,
            totalSize: this.totalSize,
            totalLoadingTime: Array.from(this.assets.values()).reduce((sum, asset) => sum + asset.loadingTime, 0),
            averageLoadingTime: this.loadingTimes.reduce((sum, time) => sum + time, 0) / this.loadingTimes.length,
            slowestAssets: Array.from(this.assets.values())
                .sort((a, b) => b.loadingTime - a.loadingTime)
                .slice(0, 5),
            largestAssets: Array.from(this.assets.values())
                .sort((a, b) => b.size - a.size)
                .slice(0, 5)
        };
        
        return report;
    }
}

// Usage examples:
// const monitor = new PerformanceMonitor();
// const leakDetector = new MemoryLeakDetector();
// const assetMonitor = new AssetMonitor();

// // Start monitoring
// leakDetector.start();
// 
// // Track asset loading
// assetMonitor.trackAsset('mug', 'assets/models/mug.glb', startTime, endTime, fileSize);
// 
// // Export performance data
// monitor.exportData();