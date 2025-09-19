import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Request, Response } from 'express';
import { expressApp } from '../server';

const app = expressApp;

// Initialize promises for async resources
let initPromise: Promise<void> | null = null;

async function initialize() {
  if (!initPromise) {
    initPromise = new Promise(async (resolve) => {
      // Add any async initialization here
      resolve();
    });
  }
  return initPromise;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Ensure initialization is complete
    await initialize();
    
    // Convert VercelRequest/Response to Express Request/Response
    const expressReq = Object.assign(req, {
      get: (header: string) => req.headers[header],
      header: (header: string) => req.headers[header],
    }) as unknown as Request;

    const expressRes = Object.assign(res, {
      header: (header: string, value: string) => res.setHeader(header, value),
    }) as unknown as Response;
    
    // Handle the request using express app
    await new Promise((resolve, reject) => {
      app(expressReq, expressRes, (err?: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}