import { NextRequest, NextResponse } from 'next/server';
import { generatePersonalizedInsights } from '@/lib/ai/google-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recentScores, patterns, goals } = body;

    if (!recentScores || !Array.isArray(recentScores)) {
      return NextResponse.json(
        { error: 'Invalid recent scores data' },
        { status: 400 }
      );
    }

    const userData = {
      recentScores,
      patterns: patterns || {},
      goals: goals || []
    };

    const insights = await generatePersonalizedInsights(userData);
    
    return NextResponse.json({
      success: true,
      insights
    });

  } catch (error) {
    console.error('Insights API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}