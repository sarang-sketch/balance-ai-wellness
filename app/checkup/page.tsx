'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  ArrowRight, 
  ArrowLeft, 
  Brain, 
  Heart, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Shield,
  Phone,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  type: 'scale' | 'safety';
  options: Array<{
    value: string;
    label: string;
    emoji?: string;
    isCrisis?: boolean;
  }>;
}

const questions: Question[] = [
  {
    id: 'mood',
    text: 'How would you describe your overall mood today?',
    type: 'scale',
    options: [
      { value: '5', label: 'Excellent', emoji: '😊' },
      { value: '4', label: 'Good', emoji: '🙂' },
      { value: '3', label: 'Neutral', emoji: '😐' },
      { value: '2', label: 'Poor', emoji: '😔' },
      { value: '1', label: 'Very Poor', emoji: '😢' }
    ]
  },
  {
    id: 'anxiety',
    text: 'How anxious or worried have you felt this week?',
    type: 'scale',
    options: [
      { value: '1', label: 'Not at all', emoji: '😌' },
      { value: '2', label: 'Slightly', emoji: '😕' },
      { value: '3', label: 'Moderately', emoji: '😰' },
      { value: '4', label: 'Very', emoji: '😨' },
      { value: '5', label: 'Extremely', emoji: '😱' }
    ]
  },
  {
    id: 'sleep',
    text: 'How would you rate your sleep quality this week?',
    type: 'scale',
    options: [
      { value: '5', label: 'Excellent', emoji: '😴' },
      { value: '4', label: 'Good', emoji: '😊' },
      { value: '3', label: 'Fair', emoji: '😐' },
      { value: '2', label: 'Poor', emoji: '😫' },
      { value: '1', label: 'Very Poor', emoji: '🥱' }
    ]
  },
  {
    id: 'energy',
    text: 'What has your energy level been like recently?',
    type: 'scale',
    options: [
      { value: '5', label: 'High energy', emoji: '⚡' },
      { value: '4', label: 'Good energy', emoji: '💪' },
      { value: '3', label: 'Average energy', emoji: '🚶' },
      { value: '2', label: 'Low energy', emoji: '😴' },
      { value: '1', label: 'No energy', emoji: '🪫' }
    ]
  },
  {
    id: 'social',
    text: 'How connected do you feel to friends and family?',
    type: 'scale',
    options: [
      { value: '5', label: 'Very connected', emoji: '🤗' },
      { value: '4', label: 'Connected', emoji: '😊' },
      { value: '3', label: 'Somewhat connected', emoji: '🙂' },
      { value: '2', label: 'Disconnected', emoji: '😞' },
      { value: '1', label: 'Very isolated', emoji: '😔' }
    ]
  },
  {
    id: 'stress',
    text: 'How well are you managing stress in your life?',
    type: 'scale',
    options: [
      { value: '5', label: 'Very well', emoji: '🧘‍♀️' },
      { value: '4', label: 'Well', emoji: '😌' },
      { value: '3', label: 'Okay', emoji: '😐' },
      { value: '2', label: 'Struggling', emoji: '😤' },
      { value: '1', label: 'Overwhelmed', emoji: '😵‍💫' }
    ]
  },
  {
    id: 'safety',
    text: 'Have you had thoughts of hurting yourself or others in the past week?',
    type: 'safety',
    options: [
      { value: 'no', label: 'No, not at all' },
      { value: 'mild', label: 'Briefly, but I don\'t plan to act on them' },
      { value: 'moderate', label: 'Yes, and I\'m concerned about these thoughts', isCrisis: true },
      { value: 'severe', label: 'Yes, and I have a plan or intent', isCrisis: true }
    ]
  }
];

export default function CheckupPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Check for crisis answers
    const question = questions[currentQuestion];
    if (question.type === 'safety') {
      const selectedOption = question.options.find(opt => opt.value === value);
      if (selectedOption?.isCrisis) {
        setShowCrisisSupport(true);
        return;
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Start AI analysis when completing the checkup
      setIsCompleted(true);
      analyzeWellnessWithAI();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const analyzeWellnessWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/ai/analyze-wellness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses: answers }),
      });
      
      const data = await response.json();
      
      if (data.success && data.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        console.error('AI Analysis failed:', data.error);
        // Fallback to mock analysis
        setAiAnalysis({
          overallScore: 75,
          category: 'good',
          insights: 'Taking regular wellness checkups shows great self-awareness and commitment to your mental health.',
          recommendations: ['Continue with regular self-reflection', 'Consider mindfulness practices', 'Maintain consistent sleep schedule'],
          strengths: ['Self-awareness', 'Proactive approach to wellness'],
          concerns: ['Monitor stress levels'],
          encouragement: 'You\'re taking positive steps for your mental wellness!'
        });
      }
    } catch (error) {
      console.error('Error calling AI analysis:', error);
      // Fallback analysis
      setAiAnalysis({
        overallScore: 75,
        category: 'good',
        insights: 'Thank you for completing your wellness checkup. Your engagement with self-care is commendable.',
        recommendations: ['Continue regular check-ins', 'Practice mindfulness', 'Maintain healthy routines'],
        strengths: ['Self-reflection', 'Wellness awareness'],
        concerns: ['General wellness maintenance'],
        encouragement: 'Keep up the great work on your wellness journey!'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const restartCheckup = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowCrisisSupport(false);
    setIsCompleted(false);
    setAiAnalysis(null);
    setIsAnalyzing(false);
  };

  const currentAnswer = answers[questions[currentQuestion]?.id];
  const progress = ((currentQuestion + (currentAnswer ? 1 : 0)) / questions.length) * 100;

  // Crisis Support Modal
  if (showCrisisSupport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900/20 to-red-800/20 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-red-500/20 bg-card">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-3 bg-red-500/10 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-500">Crisis Support Available</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-center">
              It sounds like you might be going through a difficult time. Your safety is our top priority, 
              and there are people who want to help.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Crisis Hotlines
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>National Suicide Prevention Lifeline:</strong>
                    <br />
                    <a href="tel:988" className="text-primary hover:underline">988</a> (Available 24/7)
                  </div>
                  <div>
                    <strong>Crisis Text Line:</strong>
                    <br />
                    Text HOME to <a href="sms:741741" className="text-primary hover:underline">741741</a>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Emergency Resources
                </h3>
                <p className="text-sm text-muted-foreground">
                  If you're in immediate danger, please call <strong>911</strong> or go to your nearest emergency room.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => setShowCrisisSupport(false)}
                variant="outline"
                className="flex-1"
              >
                Continue Checkup
              </Button>
              <Button
                onClick={() => router.push('/')}
                className="flex-1"
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Completion Screen
  if (isCompleted) {
    // Use AI analysis if available, otherwise fall back to simple scoring
    const analysis = aiAnalysis || {
      overallScore: 75,
      category: 'good',
      insights: 'Analyzing your responses...',
      recommendations: ['Continue with self-care practices'],
      encouragement: 'Thank you for taking time for your mental wellness!'
    };
    
    // Show loading state while analyzing
    if (isAnalyzing) {
      return (
        <div className="min-h-screen gradient-bg-primary flex items-center justify-center p-4">
          <div className="scale-in">
            <div className="max-w-2xl w-full hover-lift">
              <Card className="gradient-bg-card border-border/20">
                <CardContent className="p-12 text-center">
                  <div className="mb-6 flex justify-center">
                    <RefreshCw className="h-12 w-12 text-primary animate-spin" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Analyzing Your Wellness Profile
                  </h2>
                  <div className="text-muted-foreground mb-6">
                    Processing your responses with AI...
                  </div>
                  <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <div className="fade-in">✓ Evaluating emotional patterns</div>
                    <div className="fade-in stagger-1">✓ Identifying strengths and concerns</div>
                    <div className="fade-in stagger-2">✓ Generating personalized recommendations</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
    
    const getScoreColor = (category: string) => {
      switch (category) {
        case 'excellent': return 'text-green-500';
        case 'good': return 'text-primary';
        case 'fair': return 'text-yellow-500';
        case 'needs-attention': return 'text-red-500';
        default: return 'text-primary';
      }
    };

    return (
      <div className="min-h-screen gradient-bg-primary flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full glass-card">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl gradient-text">Checkup Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(analysis.category)} mb-2 capitalize`}>
                {analysis.category.replace('-', ' ')}
              </div>
              <div className="text-muted-foreground">
                Wellness Score: {analysis.overallScore}/100
              </div>
              <div className="w-full bg-muted/20 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${analysis.overallScore}%` }}
                />
              </div>
            </div>
            
            {isAnalyzing ? (
              <div className="p-4 bg-card/20 rounded-lg border border-primary/10 text-center">
                <div className="animate-pulse text-primary mb-2">🧠 AI Analysis in Progress...</div>
                <p className="text-sm text-muted-foreground">Generating personalized insights from your responses</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-card/20 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">AI Insights</h4>
                  <p className="text-muted-foreground text-sm">{analysis.insights}</p>
                </div>
                
                {analysis.recommendations && analysis.recommendations.length > 0 && (
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-accent" />
                      Personalized Recommendations
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {analysis.recommendations.slice(0, 3).map((rec: string, index: number) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysis.strengths && analysis.strengths.length > 0 && (
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-green-500" />
                      Your Strengths
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {analysis.strengths.map((strength: string, index: number) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-center text-muted-foreground italic">✨ {analysis.encouragement}</p>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={restartCheckup}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake Checkup
              </Button>
              <Button
                onClick={() => router.push('/progress')}
                className="flex-1"
              >
                View Progress
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Checkup Interface
  return (
    <div className="min-h-screen gradient-bg-primary">
      <div className="max-w-4xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Mental Wellness Checkup</h1>
          </div>
          <p className="text-muted-foreground">
            Take a few minutes to reflect on your mental wellness. Your responses are private and secure.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="glass-card mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">
              {questions[currentQuestion]?.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentAnswer}
              onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
              className="space-y-4"
            >
              {questions[currentQuestion]?.options.map((option, index) => (
                <Label
                  key={option.value}
                  htmlFor={option.value}
                  className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  {option.emoji && (
                    <span className="text-2xl">{option.emoji}</span>
                  )}
                  <span className="flex-1 text-foreground">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={previousQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-2 text-muted-foreground">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-sm">Your privacy is protected</span>
          </div>

          <Button
            onClick={nextQuestion}
            disabled={!currentAnswer}
            className="flex items-center"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}