import { NextRequest, NextResponse } from 'next/server';
import { analyzeMentalWellness } from '@/lib/ai/google-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { responses } = body;

    if (!responses || typeof responses !== 'object') {
      return NextResponse.json(
        { error: 'Invalid wellness responses data' },
        { status: 400 }
      );
    }

    const analysis = await analyzeMentalWellness(responses);
    
    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Wellness analysis API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze wellness data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}