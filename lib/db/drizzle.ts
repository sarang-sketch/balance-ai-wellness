import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set. Please configure it in your Netlify environment variables.');
}

// Netlify-optimized PostgreSQL configuration
const connectionConfig = {
  max: process.env.PGPOOL_MAX ? parseInt(process.env.PGPOOL_MAX) : 10,
  idle_timeout: process.env.PGPOOL_TIMEOUT ? parseInt(process.env.PGPOOL_TIMEOUT) : 30,
  connect_timeout: 60,
  // Enable connection pooling for Netlify Functions
  ...(process.env.PGBOUNCER === 'true' && {
    prepare: false,
    max_lifetime: 60 * 30 // 30 minutes
  })
};

export const client = postgres(process.env.POSTGRES_URL, connectionConfig);
export const db = drizzle(client, { schema });

// Health check function for deployment verification
export async function testDatabaseConnection() {
  try {
    await client`SELECT 1`;
    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { 
      success: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
