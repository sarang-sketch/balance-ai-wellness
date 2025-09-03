'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Shield, 
  Heart, 
  Eye,
  Bell,
  Settings,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  Clock,
  MessageCircle,
  Lock,
  User
} from 'lucide-react';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  lastCheckup: string;
  overallStatus: 'good' | 'fair' | 'needs-attention';
  recentScore: number;
}

interface ParentAlert {
  id: string;
  type: 'positive' | 'concern' | 'milestone';
  message: string;
  timestamp: string;
  childName: string;
}

export default function ParentModePage() {
  const [selectedChild, setSelectedChild] = useState<string>('child1');
  const [showSetup, setShowSetup] = useState(false);

  // Mock data - would come from API in real app
  const childProfiles: ChildProfile[] = [
    {
      id: 'child1',
      name: 'Emma',
      age: 14,
      avatar: '👧',
      lastCheckup: '2024-01-21',
      overallStatus: 'good',
      recentScore: 85
    },
    {
      id: 'child2',
      name: 'Alex',
      age: 12,
      avatar: '👦',
      lastCheckup: '2024-01-20',
      overallStatus: 'fair',
      recentScore: 67
    }
  ];

  const parentAlerts: ParentAlert[] = [
    {
      id: '1',
      type: 'positive',
      message: 'Emma completed her 7-day wellness streak! 🎉',
      timestamp: '2024-01-21T10:30:00',
      childName: 'Emma'
    },
    {
      id: '2',
      type: 'concern',
      message: 'Alex reported feeling more anxious than usual this week',
      timestamp: '2024-01-20T15:45:00',
      childName: 'Alex'
    },
    {
      id: '3',
      type: 'milestone',
      message: 'Emma unlocked the "Mood Tracker" achievement',
      timestamp: '2024-01-19T09:15:00',
      childName: 'Emma'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'fair': return 'text-yellow-500';
      case 'needs-attention': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/10';
      case 'fair': return 'bg-yellow-500/10';
      case 'needs-attention': return 'bg-red-500/10';
      default: return 'bg-muted/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'positive': return CheckCircle;
      case 'concern': return AlertTriangle;
      case 'milestone': return Star;
      default: return Bell;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-500';
      case 'concern': return 'text-yellow-500';
      case 'milestone': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const selectedChildData = childProfiles.find(child => child.id === selectedChild);

  if (showSetup) {
    return (
      <div className="min-h-screen gradient-bg-primary flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full glass-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl gradient-text">Set Up Parent Mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Age-Appropriate Monitoring
                </h3>
                <p className="text-sm text-muted-foreground">
                  Receive simplified summaries of your child's mental wellness progress, 
                  tailored to their age and development stage.
                </p>
              </div>
              
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Smart Alerts
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get notified about important changes in mood, achievements, 
                  or when additional support might be beneficial.
                </p>
              </div>
              
              <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Privacy Respected
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your child's detailed responses remain private. You'll only see 
                  general wellness trends and important safety information.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowSetup(false)}
                className="flex-1"
              >
                Enable Parent Mode
              </Button>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg-primary">
      <div className="max-w-7xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Parent Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Monitor your children's mental wellness journey with age-appropriate insights
          </p>
        </div>

        {/* Child Selector */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-1 rounded-full">
            <div className="flex space-x-1">
              {childProfiles.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center space-x-2 ${
                    selectedChild === child.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-lg">{child.avatar}</span>
                  <span>{child.name}</span>
                  <span className="text-xs opacity-70">({child.age}y)</span>
                </button>
              ))}
              <button className="px-6 py-3 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground">
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {selectedChildData && (
          <>
            {/* Overview Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Status</p>
                      <div className={`text-lg font-semibold capitalize ${getStatusColor(selectedChildData.overallStatus)}`}>
                        {selectedChildData.overallStatus.replace('-', ' ')}
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${getStatusBackground(selectedChildData.overallStatus)}`}>
                      <Heart className={`h-6 w-6 ${getStatusColor(selectedChildData.overallStatus)}`} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Overall wellness indicator
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Recent Score</p>
                      <div className="text-2xl font-bold text-primary">
                        {selectedChildData.recentScore}
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-primary/10">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Latest wellness checkup
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Checkup</p>
                      <div className="text-lg font-semibold text-foreground">
                        {new Date(selectedChildData.lastCheckup).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-accent/10">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {Math.floor((Date.now() - new Date(selectedChildData.lastCheckup).getTime()) / (1000 * 60 * 60 * 24))} days ago
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Streak</p>
                      <div className="text-2xl font-bold text-accent">5</div>
                    </div>
                    <div className="p-3 rounded-full bg-accent/10">
                      <Star className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    consecutive checkups
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Weekly Summary */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                      Weekly Summary for {selectedChildData.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Positive Trends
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Consistent daily check-ins</li>
                          <li>• Improved sleep patterns</li>
                          <li>• High engagement with activities</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-yellow-500" />
                          Areas to Watch
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Slightly elevated stress levels</li>
                          <li>• Social connection scores varying</li>
                          <li>• Energy dips midweek</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Simple Chart Representation */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Weekly Wellness Trend</h4>
                      <div className="h-32 bg-muted/10 rounded-lg flex items-end justify-between p-4 space-x-2">
                        {[78, 82, 75, 85, 88, 79, 83].map((score, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-gradient-to-t from-primary to-accent rounded-t-sm"
                              style={{ height: `${(score / 100) * 100}%` }}
                            />
                            <span className="text-xs text-muted-foreground mt-2">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Parenting Tip of the Week
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedChildData.name} shows great consistency with daily check-ins. 
                        Consider having regular family conversations about emotions and feelings 
                        to complement their self-reflection practice.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts & Notifications */}
              <div>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-primary" />
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {parentAlerts.map((alert) => {
                      const AlertIcon = getAlertIcon(alert.type);
                      return (
                        <div
                          key={alert.id}
                          className="flex items-start space-x-3 p-3 bg-card/20 rounded-lg border border-border/50"
                        >
                          <AlertIcon className={`h-4 w-4 mt-0.5 ${getAlertColor(alert.type)}`} />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{alert.message}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {new Date(alert.timestamp).toLocaleDateString()}
                              </span>
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(alert.timestamp).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="glass-card mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Schedule Family Check-in
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Detailed History
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Adjust Notification Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Safety & Support */}
            <div className="mt-8">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Shield className="h-5 w-5 mr-2" />
                    Safety & Support Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
                      <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-sm mb-1">Crisis Resources</h4>
                      <p className="text-xs text-muted-foreground">
                        24/7 support hotlines and emergency contacts for immediate help
                      </p>
                    </div>
                    
                    <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg text-center">
                      <MessageCircle className="h-6 w-6 text-accent mx-auto mb-2" />
                      <h4 className="font-semibold text-sm mb-1">Family Resources</h4>
                      <p className="text-xs text-muted-foreground">
                        Tips and guides for supporting your child's mental wellness
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg text-center">
                      <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
                      <h4 className="font-semibold text-sm mb-1">Professional Help</h4>
                      <p className="text-xs text-muted-foreground">
                        Find qualified mental health professionals in your area
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Remember: This dashboard provides insights to support family conversations, 
                      but cannot replace professional mental health assessment when needed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}