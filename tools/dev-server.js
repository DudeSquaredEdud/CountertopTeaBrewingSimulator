#!/usr/bin/env node
/**
 * Development Server for Countertop Tea Brewing Simulator
 * 
 * A simple HTTP server with live reload and CORS support for development.
 * Usage: node tools/dev-server.js [port]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

class DevServer {
    constructor(port = 3000) {
        this.port = port;
        this.server = null;
        this.watchers = new Map();
        this.clients = [];
        
        // MIME types for file serving
        this.mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.glb': 'model/gltf-binary',
            '.gltf': 'model/gltf+json',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/wav',
            '.webp': 'image/webp',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2'
        };
        
        this.setupFileWatcher();
    }
    
    /**
     * Start the development server
     */
    start() {
        this.server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });
        
        // Setup WebSocket for live reload
        this.server.on('upgrade', (request, socket, head) => {
            if (request.headers['upgrade'] === 'websocket') {
                this.handleWebSocketUpgrade(request, socket, head);
            }
        });
        
        this.server.listen(this.port, () => {
            console.log(`🚀 Development server running at http://localhost:${this.port}`);
            console.log(`📁 Serving files from: ${process.cwd()}`);
            console.log(`🔄 Live reload enabled`);
            console.log(`🎯 Press Ctrl+C to stop`);
        });
        
        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n👋 Shutting down development server...');
            this.cleanup();
            process.exit(0);
        });
    }
    
    /**
     * Handle HTTP requests
     */
    async handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        
        // Security: prevent directory traversal
        const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
        let filePath = path.join(process.cwd(), safePath);
        
        // Default to index.html for root
        if (pathname === '/') {
            filePath = path.join(process.cwd(), 'index.html');
        }
        
        // Check if file exists
        try {
            const stats = await fs.promises.stat(filePath);
            
            if (stats.isDirectory()) {
                // Serve directory listing or index.html
                const indexPath = path.join(filePath, 'index.html');
                try {
                    await fs.promises.access(indexPath);
                    filePath = indexPath;
                } catch {
                    return this.serveDirectoryListing(res, filePath, pathname);
                }
            }
            
            await this.serveFile(res, filePath);
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.serve404(res, pathname);
            } else {
                this.serve500(res, error);
            }
        }
    }
    
    /**
     * Serve a file with appropriate headers
     */
    async serveFile(res, filePath) {
        try {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = this.mimeTypes[ext] || 'application/octet-stream';
            
            const data = await fs.promises.readFile(filePath);
            
            // Add CORS headers for development
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Cache-Control', 'no-cache');
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
            
        } catch (error) {
            this.serve500(res, error);
        }
    }
    
    /**
     * Serve directory listing
     */
    serveDirectoryListing(res, dirPath, pathname) {
        fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                this.serve500(res, err);
                return;
            }
            
            const items = files.map(file => ({
                name: file.name,
                isDirectory: file.isDirectory(),
                path: path.join(pathname, file.name)
            }));
            
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Directory Listing - ${pathname}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        h1 { color: #333; }
                        ul { list-style: none; padding: 0; }
                        li { margin: 5px 0; }
                        a { text-decoration: none; color: #0066cc; }
                        a:hover { text-decoration: underline; }
                        .directory { font-weight: bold; }
                        .file { color: #666; }
                    </style>
                </head>
                <body>
                    <h1>Directory: ${pathname}</h1>
                    <ul>
                        ${items.map(item => `
                            <li>
                                <a href="${item.path}" class="${item.isDirectory ? 'directory' : 'file'}">
                                    ${item.isDirectory ? '📁' : '📄'} ${item.name}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </body>
                </html>
            `;
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    }
    
    /**
     * Serve 404 error
     */
    serve404(res, pathname) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>404 - Not Found</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
                    h1 { color: #e74c3c; }
                </style>
            </head>
            <body>
                <h1>404 - File Not Found</h1>
                <p>The requested file <code>${pathname}</code> was not found.</p>
                <p><a href="/">← Back to Home</a></p>
            </body>
            </html>
        `;
        
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(html);
    }
    
    /**
     * Serve 500 error
     */
    serve500(res, error) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>500 - Server Error</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
                    h1 { color: #e74c3c; }
                    pre { background: #f8f8f8; padding: 20px; text-align: left; }
                </style>
            </head>
            <body>
                <h1>500 - Server Error</h1>
                <p>An error occurred while serving the file.</p>
                <pre>${error.message}</pre>
            </body>
            </html>
        `;
        
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(html);
    }
    
    /**
     * Setup file watching for live reload
     */
    setupFileWatcher() {
        const watchPaths = [
            '.',
            'assets/'
        ];
        
        watchPaths.forEach(watchPath => {
            try {
                const watcher = fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
                    if (filename && !filename.startsWith('.') && !filename.includes('node_modules')) {
                        console.log(`🔄 File changed: ${filename}`);
                        this.broadcastReload(filename);
                    }
                });
                
                this.watchers.set(watchPath, watcher);
            } catch (error) {
                // Directory might not exist, skip silently
            }
        });
    }
    
    /**
     * Handle WebSocket upgrade for live reload
     */
    handleWebSocketUpgrade(request, socket, head) {
        const key = request.headers['sec-websocket-key'];
        const accept = this.generateWebSocketAccept(key);
        
        socket.write([
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: websocket',
            'Connection: Upgrade',
            `Sec-WebSocket-Accept: ${accept}`,
            '',
            ''
        ].join('\r\n'));
        
        this.clients.push(socket);
        
        socket.on('close', () => {
            const index = this.clients.indexOf(socket);
            if (index > -1) {
                this.clients.splice(index, 1);
            }
        });
        
        // Send initial connection message
        socket.write(this.createWebSocketFrame('connected'));
    }
    
    /**
     * Generate WebSocket accept key
     */
    generateWebSocketAccept(key) {
        const crypto = require('crypto');
        const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
        return crypto.createHash('sha1').update(key + magic).digest('base64');
    }
    
    /**
     * Create WebSocket frame
     */
    createWebSocketFrame(message) {
        const payload = Buffer.from(message, 'utf8');
        const frame = Buffer.alloc(2 + payload.length);
        
        frame[0] = 0x81; // Text frame
        frame[1] = payload.length;
        payload.copy(frame, 2);
        
        return frame;
    }
    
    /**
     * Broadcast reload message to all clients
     */
    broadcastReload(filename) {
        const message = JSON.stringify({ type: 'reload', file: filename });
        const frame = this.createWebSocketFrame(message);
        
        this.clients.forEach(client => {
            try {
                client.write(frame);
            } catch (error) {
                // Client disconnected
            }
        });
    }
    
    /**
     * Cleanup resources
     */
    cleanup() {
        // Close file watchers
        this.watchers.forEach(watcher => watcher.close());
        this.watchers.clear();
        
        // Close WebSocket connections
        this.clients.forEach(client => {
            try {
                client.end();
            } catch (error) {
                // Already closed
            }
        });
        this.clients = [];
        
        if (this.server) {
            this.server.close();
        }
    }
}

// Live reload client script (injected into HTML)
const liveReloadScript = `
<script>
(function() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = protocol + '//' + window.location.host;
    
    let ws;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    
    function connect() {
        try {
            ws = new WebSocket(wsUrl);
            
            ws.onopen = function() {
                console.log('🔌 Live reload connected');
                reconnectAttempts = 0;
            };
            
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'reload') {
                    console.log('🔄 Reloading due to file change:', data.file);
                    location.reload();
                }
            };
            
            ws.onclose = function() {
                console.log('🔌 Live reload disconnected');
                if (reconnectAttempts < maxReconnectAttempts) {
                    reconnectAttempts++;
                    setTimeout(connect, 1000 * reconnectAttempts);
                }
            };
            
            ws.onerror = function(error) {
                console.error('Live reload error:', error);
            };
        } catch (error) {
            console.error('Failed to connect to live reload server');
        }
    }
    
    // Start connection
    connect();
})();
</script>
`;

// CLI interface
if (require.main === module) {
    const port = process.argv[2] || 3000;
    const server = new DevServer(port);
    server.start();
}

module.exports = DevServer;