import { NextRequest, NextResponse } from 'next/server';
import { analyzeFood, analyzeHealthIndicators } from '@/lib/ai/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, analysisType } = body;

    if (!imageBase64 || !analysisType) {
      return NextResponse.json(
        { error: 'Missing image data or analysis type' },
        { status: 400 }
      );
    }

    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    let analysis;
    
    if (analysisType === 'food') {
      analysis = await analyzeFood(base64Data);
    } else if (analysisType === 'health') {
      analysis = await analyzeHealthIndicators(base64Data);
    } else {
      return NextResponse.json(
        { error: 'Invalid analysis type. Must be "food" or "health"' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      analysis,
      analysisType
    });

  } catch (error) {
    console.error('Photo analysis API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze photo',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}