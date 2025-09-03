import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: ''
      };
    }

    const path = event.path.replace('/.netlify/functions/api', '');
    
    // Create URL for the request
    const url = `https://${event.headers.host || 'localhost'}${path}${
      event.multiValueQueryStringParameters ? 
        '?' + new URLSearchParams(
          Object.entries(event.multiValueQueryStringParameters).reduce((acc, [key, values]) => {
            if (values) acc[key] = values[0];
            return acc;
          }, {} as Record<string, string>)
        ).toString() : ''
    }`;

    // Create NextRequest-like object with required properties
    const requestInit: RequestInit = {
      method: event.httpMethod,
      headers: new Headers(event.headers as Record<string, string>),
      body: event.body || undefined,
    };

    let responseData: any;
    let contentType = 'application/json';

    // Route to appropriate handler based on path and method
    switch (true) {
      case path === '/user' && event.httpMethod === 'GET':
        // Import and call the handler dynamically to avoid build issues
        const { GET: userGET } = await import('../../app/api/user/route');
        const userResponse = await userGET();
        responseData = await userResponse.json();
        contentType = userResponse.headers.get('Content-Type') || 'application/json';
        break;
        
      case path === '/ai/analyze-photo' && event.httpMethod === 'POST':
        const { POST: analyzePhotoPOST } = await import('../../app/api/ai/analyze-photo/route');
        const request1 = new Request(url, requestInit);
        const photoResponse = await analyzePhotoPOST(request1 as any);
        responseData = await photoResponse.json();
        contentType = photoResponse.headers.get('Content-Type') || 'application/json';
        break;
        
      case path === '/ai/analyze-wellness' && event.httpMethod === 'POST':
        const { POST: analyzeWellnessPOST } = await import('../../app/api/ai/analyze-wellness/route');
        const request2 = new Request(url, requestInit);
        const wellnessResponse = await analyzeWellnessPOST(request2 as any);
        responseData = await wellnessResponse.json();
        contentType = wellnessResponse.headers.get('Content-Type') || 'application/json';
        break;
        
      case path === '/ai/insights' && event.httpMethod === 'POST':
        const { POST: insightsPOST } = await import('../../app/api/ai/insights/route');
        const request3 = new Request(url, requestInit);
        const insightsResponse = await insightsPOST(request3 as any);
        responseData = await insightsResponse.json();
        contentType = insightsResponse.headers.get('Content-Type') || 'application/json';
        break;
        
      default:
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
          body: JSON.stringify({ error: 'Not Found', path, method: event.httpMethod })
        };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        ...corsHeaders,
      },
      body: typeof responseData === 'string' ? responseData : JSON.stringify(responseData)
    };

  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler };