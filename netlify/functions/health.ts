import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { testDatabaseConnection } from '../../lib/db/drizzle';

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Test database connection
    const dbResult = await testDatabaseConnection();
    
    // Check environment variables
    const envCheck = {
      hasPostgresUrl: !!process.env.POSTGRES_URL,
      hasAuthSecret: !!process.env.AUTH_SECRET,
      hasBaseUrl: !!process.env.BASE_URL,
      hasGoogleAI: !!process.env.GOOGLE_AI_API_KEY,
      hasOpenRouter: !!process.env.OPENROUTER_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    };

    const allEnvVarsPresent = envCheck.hasPostgresUrl && 
                              envCheck.hasAuthSecret && 
                              envCheck.hasBaseUrl;

    return {
      statusCode: dbResult.success && allEnvVarsPresent ? 200 : 500,
      headers,
      body: JSON.stringify({
        status: dbResult.success && allEnvVarsPresent ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        database: dbResult,
        environment: envCheck,
        version: process.env.npm_package_version || 'unknown'
      })
    };

  } catch (error) {
    console.error('Health check failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler };