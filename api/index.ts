import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "../server/routes";
import { serveStatic } from "../server/vite";

const app = express();

// Performance optimizations
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Set security and performance headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Vary', 'Accept-Encoding');
  
  // Different cache strategies for different content types
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes for API
  } else if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year for static assets
  } else {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour for HTML
  }
  
  next();
});

// Request logging middleware for API routes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: any = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

let isInitialized = false;

async function initializeServer() {
  if (isInitialized) return app;
  
  try {
    await registerRoutes(app);
    
    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      res.status(status).json({ message });
      console.error('Server error:', err);
    });
    
    // Serve static files for non-API routes
    serveStatic(app);
    
    isInitialized = true;
    return app;
  } catch (error) {
    console.error('Failed to initialize server:', error);
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  try {
    const server = await initializeServer();
    return server(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}