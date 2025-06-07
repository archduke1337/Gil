import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure for serverless environment
if (process.env.VERCEL) {
  neonConfig.fetchConnectionCache = true;
  neonConfig.useSecureWebSocket = true;
  neonConfig.pipelineConnect = false;
} else {
  neonConfig.webSocketConstructor = ws;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Serverless-optimized connection configuration
const connectionConfig = process.env.VERCEL ? {
  connectionString: process.env.DATABASE_URL,
  max: 1, // Single connection for serverless
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 10000,
} : {
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
};

export const pool = new Pool(connectionConfig);

export const db = drizzle({ client: pool, schema });