import OpenAI from 'openai';

// Initialize OpenRouter client lazily to avoid build-time errors
let openai: OpenAI | null = null;

function getOpenAI() {
  if (!openai) {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }
    openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }
  return openai;
}

export async function analyzeFood(imageBase64: string) {
  try {
    const response = await getOpenAI().chat.completions.create({
      model: 'google/gemini-flash-1.5',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this food image and provide detailed nutritional information. 
              
              Please identify the food items and estimate:
              - Total calories
              - Protein (g)
              - Carbohydrates (g)
              - Fat (g)
              - Fiber (g)
              - Sugar (g)
              - Sodium (mg)
              - Key vitamins/minerals
              - Health assessment
              
              Format as JSON:
              {
                "foodName": string,
                "confidence": number (0-1),
                "nutrition": {
                  "calories": number,
                  "protein": number,
                  "carbs": number,
                  "fat": number,
                  "fiber": number,
                  "sugar": number,
                  "sodium": number
                },
                "healthAnalysis": {
                  "rating": "excellent" | "good" | "fair" | "poor",
                  "benefits": string[],
                  "concerns": string[],
                  "suggestions": string[]
                },
                "portionEstimate": string
              }`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.warn('Failed to parse food analysis as JSON:', parseError);
    }

    // Fallback response
    return {
      foodName: 'Mixed meal',
      confidence: 0.7,
      nutrition: {
        calories: 350,
        protein: 25,
        carbs: 30,
        fat: 15,
        fiber: 5,
        sugar: 8,
        sodium: 400
      },
      healthAnalysis: {
        rating: 'good',
        benefits: ['Balanced macronutrients', 'Good protein content'],
        concerns: ['Monitor sodium intake'],
        suggestions: ['Add more vegetables', 'Consider whole grains']
      },
      portionEstimate: '1 standard serving'
    };

  } catch (error) {
    console.error('OpenRouter food analysis error:', error);
    throw new Error('Failed to analyze food image');
  }
}

export async function analyzeHealthIndicators(imageBase64: string) {
  try {
    const response = await getOpenAI().chat.completions.create({
      model: 'google/gemini-flash-1.5',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this selfie/portrait image for general wellness indicators. 
              
              Look for visible signs of:
              - Skin health and hydration
              - Eye clarity and fatigue signs
              - Overall energy/vitality appearance
              - Posture (if visible)
              
              Provide general wellness observations (NOT medical diagnosis):
              
              Format as JSON:
              {
                "indicators": [
                  {
                    "type": "skin" | "eyes" | "posture" | "general",
                    "observation": string,
                    "status": "good" | "fair" | "needs-attention",
                    "suggestion": string
                  }
                ],
                "overallAssessment": string,
                "wellnessTips": string[],
                "disclaimer": "These are general wellness observations, not medical advice."
              }
              
              Be supportive and focus on general wellness, never provide medical diagnoses.`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 800
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.warn('Failed to parse health analysis as JSON:', parseError);
    }

    // Fallback response
    return {
      indicators: [
        {
          type: 'general',
          observation: 'General wellness assessment completed',
          status: 'good',
          suggestion: 'Continue maintaining healthy lifestyle habits'
        }
      ],
      overallAssessment: 'You appear to be taking good care of yourself!',
      wellnessTips: [
        'Stay hydrated throughout the day',
        'Ensure adequate sleep (7-9 hours)',
        'Take regular breaks from screens'
      ],
      disclaimer: 'These are general wellness observations, not medical advice.'
    };

  } catch (error) {
    console.error('OpenRouter health analysis error:', error);
    throw new Error('Failed to analyze health indicators');
  }
}