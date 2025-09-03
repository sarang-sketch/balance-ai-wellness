'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ClientOnly from '@/components/client-only';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  Award,
  Flame,
  Star,
  Trophy,
  Heart,
  Brain,
  Zap,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface ProgressData {
  date: string;
  wellnessScore: number;
  mood: number;
  anxiety: number;
  sleep: number;
  energy: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  date?: string;
}

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Mock data - would come from API in real app
  const progressData: ProgressData[] = [
    { date: '2024-01-15', wellnessScore: 78, mood: 4, anxiety: 2, sleep: 4, energy: 3 },
    { date: '2024-01-16', wellnessScore: 82, mood: 4, anxiety: 2, sleep: 5, energy: 4 },
    { date: '2024-01-17', wellnessScore: 75, mood: 3, anxiety: 3, sleep: 3, energy: 3 },
    { date: '2024-01-18', wellnessScore: 85, mood: 5, anxiety: 1, sleep: 4, energy: 4 },
    { date: '2024-01-19', wellnessScore: 88, mood: 5, anxiety: 1, sleep: 5, energy: 5 },
    { date: '2024-01-20', wellnessScore: 79, mood: 4, anxiety: 2, sleep: 4, energy: 3 },
    { date: '2024-01-21', wellnessScore: 83, mood: 4, anxiety: 2, sleep: 4, energy: 4 },
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-checkup',
      title: 'First Steps',
      description: 'Completed your first wellness checkup',
      icon: Brain,
      unlocked: true,
      date: '2024-01-15'
    },
    {
      id: 'week-streak',
      title: 'Week Warrior',
      description: 'Completed checkups for 7 days straight',
      icon: Flame,
      unlocked: true,
      date: '2024-01-21'
    },
    {
      id: 'photo-scanner',
      title: 'Scanner Pro',
      description: 'Used the photo scanner 10 times',
      icon: Zap,
      unlocked: true,
      date: '2024-01-18'
    },
    {
      id: 'mood-improver',
      title: 'Mood Booster',
      description: 'Improved your mood score by 20%',
      icon: Heart,
      unlocked: false
    },
    {
      id: 'consistency-king',
      title: 'Consistency Champion',
      description: 'Complete checkups for 30 days',
      icon: Trophy,
      unlocked: false
    }
  ];

  const currentScore = progressData[progressData.length - 1]?.wellnessScore || 0;
  const previousScore = progressData[progressData.length - 2]?.wellnessScore || 0;
  const scoreTrend = currentScore - previousScore;
  const streakDays = 7; // Mock streak

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500/10';
    if (score >= 60) return 'bg-primary/10';
    if (score >= 40) return 'bg-yellow-500/10';
    return 'bg-red-500/10';
  };

  return (
    <div className="min-h-screen gradient-bg-primary">
      <div className="max-w-7xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Progress Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Track your mental wellness journey and celebrate your achievements
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Score</p>
                  <div className={`text-3xl font-bold ${getScoreColor(currentScore)}`}>
                    {currentScore}
                  </div>
                </div>
                <div className={`p-3 rounded-full ${getScoreBackground(currentScore)}`}>
                  <Target className={`h-6 w-6 ${getScoreColor(currentScore)}`} />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {scoreTrend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${scoreTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {scoreTrend > 0 ? '+' : ''}{scoreTrend} from last checkup
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <div className="text-3xl font-bold text-accent">{streakDays}</div>
                </div>
                <div className="p-3 rounded-full bg-accent/10">
                  <Flame className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                days in a row
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <div className="text-3xl font-bold text-primary">
                    {achievements.filter(a => a.unlocked).length}
                  </div>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                out of {achievements.length} unlocked
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Checkups</p>
                  <div className="text-3xl font-bold text-primary">23</div>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Wellness Trends
                  </CardTitle>
                  <div className="flex space-x-2">
                    {(['week', 'month', 'year'] as const).map((period) => (
                      <Button
                        key={period}
                        variant={selectedPeriod === period ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedPeriod(period)}
                        className="text-xs"
                      >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Mock Chart - In real app, use a charting library */}
                  <div className="h-64 bg-muted/10 rounded-lg flex items-end justify-between p-4 space-x-2">
                    {progressData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-primary to-accent rounded-t-sm"
                          style={{ height: `${(data.wellnessScore / 100) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground mt-2">
                          {new Date(data.date).getDate()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Metrics Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-card/20 rounded-lg">
                      <div className="text-lg font-semibold text-primary">4.2</div>
                      <div className="text-xs text-muted-foreground">Avg Mood</div>
                    </div>
                    <div className="text-center p-3 bg-card/20 rounded-lg">
                      <div className="text-lg font-semibold text-accent">2.1</div>
                      <div className="text-xs text-muted-foreground">Avg Anxiety</div>
                    </div>
                    <div className="text-center p-3 bg-card/20 rounded-lg">
                      <div className="text-lg font-semibold text-primary">4.1</div>
                      <div className="text-xs text-muted-foreground">Avg Sleep</div>
                    </div>
                    <div className="text-center p-3 bg-card/20 rounded-lg">
                      <div className="text-lg font-semibold text-accent">3.7</div>
                      <div className="text-xs text-muted-foreground">Avg Energy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        achievement.unlocked
                          ? 'bg-card/20 border border-primary/20'
                          : 'bg-muted/10 opacity-60'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        achievement.unlocked 
                          ? 'bg-primary/10' 
                          : 'bg-muted/20'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          achievement.unlocked 
                            ? 'text-primary' 
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-primary mt-1">
                            Unlocked {achievement.date && (
                              <ClientOnly fallback="Loading...">
                                {new Date(achievement.date).toLocaleDateString()}
                              </ClientOnly>
                            )}
                          </p>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Star className="h-4 w-4 text-accent" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  Great Progress This Week! 🎉
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your wellness score has improved by 12% over the last 7 days. 
                  Your consistency with daily checkups is paying off.
                </p>
              </div>
              
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  Sleep Pattern Optimization
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your sleep scores show improvement on days when you complete 
                  checkups before 8 PM. Consider establishing an evening routine.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Goals & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground">Reach 90 Wellness Score</span>
                    <span className="text-sm text-muted-foreground">{currentScore}/90</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: `${(currentScore / 90) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground">30-Day Streak</span>
                    <span className="text-sm text-muted-foreground">{streakDays}/30</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-accent to-primary h-2 rounded-full"
                      style={{ width: `${(streakDays / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Take Today's Checkup
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center justify-between p-4 h-auto">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-3 text-primary" />
                    <span>New Checkup</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="flex items-center justify-between p-4 h-auto">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <span>View History</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="flex items-center justify-between p-4 h-auto">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-3 text-primary" />
                    <span>Set Goals</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}