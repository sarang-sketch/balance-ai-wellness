import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Lazy initialization to avoid build-time errors
let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function getConnectionConfig() {
  return {
    max: process.env.PGPOOL_MAX ? parseInt(process.env.PGPOOL_MAX) : 10,
    idle_timeout: process.env.PGPOOL_TIMEOUT ? parseInt(process.env.PGPOOL_TIMEOUT) : 30,
    connect_timeout: 60,
    // Enable connection pooling for Netlify Functions
    ...(process.env.PGBOUNCER === 'true' && {
      prepare: false,
      max_lifetime: 60 * 30 // 30 minutes
    })
  };
}

function getClient() {
  if (!_client) {
    if (!process.env.POSTGRES_URL) {
      throw new Error('POSTGRES_URL environment variable is not set. Please configure it in your Netlify environment variables.');
    }
    _client = postgres(process.env.POSTGRES_URL, getConnectionConfig());
  }
  return _client;
}

function getDb() {
  if (!_db) {
    _db = drizzle(getClient(), { schema });
  }
  return _db;
}

// Export getters instead of direct instances
export const client = new Proxy({} as ReturnType<typeof postgres>, {
  get(target, prop) {
    return getClient()[prop as keyof ReturnType<typeof postgres>];
  }
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});

// Health check function for deployment verification
export async function testDatabaseConnection() {
  try {
    if (!process.env.POSTGRES_URL) {
      return {
        success: false,
        message: 'POSTGRES_URL environment variable is not set',
        error: 'Database not configured'
      };
    }
    const testClient = getClient();
    await testClient`SELECT 1`;
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
