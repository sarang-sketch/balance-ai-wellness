import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI client lazily to avoid build-time errors
let genAI: GoogleGenerativeAI | null = null;

function getGoogleAI() {
  if (!genAI) {
    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error('GOOGLE_AI_API_KEY environment variable is not set');
    }
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  }
  return genAI;
}

export async function analyzeMentalWellness(responses: Record<string, string | number>) {
  try {
    const model = getGoogleAI().getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
    As a mental health AI assistant, analyze these wellness checkup responses and provide personalized insights:
    
    Responses:
    ${Object.entries(responses).map(([key, value]) => `${key}: ${value}`).join('\n')}
    
    Please provide:
    1. Overall wellness score (0-100)
    2. Key insights about their mental state
    3. Personalized recommendations (3-5 specific, actionable suggestions)
    4. Areas of strength to celebrate
    5. Areas that need attention
    
    Format as JSON:
    {
      "overallScore": number,
      "category": "excellent" | "good" | "fair" | "needs-attention",
      "insights": string,
      "recommendations": string[],
      "strengths": string[],
      "concerns": string[],
      "encouragement": string
    }
    
    Be supportive, professional, and focus on actionable advice. Never provide medical diagnosis.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON from the response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON:', parseError);
    }
    
    // Fallback response if JSON parsing fails
    return {
      overallScore: 75,
      category: 'good',
      insights: text.substring(0, 200) + '...',
      recommendations: ['Continue with regular self-check-ins', 'Consider mindfulness practices', 'Maintain healthy sleep habits'],
      strengths: ['Self-awareness', 'Proactive wellness approach'],
      concerns: ['Monitor stress levels'],
      encouragement: 'You\'re taking positive steps for your mental wellness!'
    };
    
  } catch (error) {
    console.error('Google AI analysis error:', error);
    throw new Error('Failed to analyze wellness data');
  }
}

export async function generatePersonalizedInsights(userData: {
  recentScores: number[];
  patterns: Record<string, any>;
  goals: string[];
}) {
  try {
    const model = getGoogleAI().getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
    Analyze this user's mental wellness data and provide personalized insights:
    
    Recent Wellness Scores: ${userData.recentScores.join(', ')}
    Patterns: ${JSON.stringify(userData.patterns)}
    Goals: ${userData.goals.join(', ')}
    
    Provide insights in JSON format:
    {
      "trendAnalysis": string,
      "personalizedTips": string[],
      "motivationalMessage": string,
      "nextSteps": string[]
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.warn('Failed to parse insights as JSON:', parseError);
    }
    
    return {
      trendAnalysis: 'Your wellness journey shows positive engagement with self-care practices.',
      personalizedTips: ['Continue your current wellness routine', 'Set small, achievable daily goals'],
      motivationalMessage: 'Every small step counts in your mental wellness journey!',
      nextSteps: ['Keep tracking your progress', 'Consider new wellness activities']
    };
    
  } catch (error) {
    console.error('Google AI insights error:', error);
    throw new Error('Failed to generate personalized insights');
  }
}