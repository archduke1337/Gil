#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function build() {
  console.log('Building production application...');
  
  try {
    // Build client
    console.log('Building client...');
    const { stdout: clientBuild } = await execAsync('cd client && npm run build');
    console.log(clientBuild);
    
    // Ensure uploads directory exists
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads', { recursive: true });
      console.log('Created uploads directory');
    }
    
    // Create .vercelignore
    const vercelIgnore = `
node_modules
.env
.env.local
*.log
dist
client/node_modules
client/dist
`;
    
    fs.writeFileSync('.vercelignore', vercelIgnore.trim());
    console.log('Created .vercelignore');
    
    console.log('Build completed successfully!');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();