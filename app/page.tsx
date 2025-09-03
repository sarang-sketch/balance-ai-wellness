import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Brain, 
  Camera, 
  BarChart3, 
  Users, 
  Shield, 
  Heart, 
  Sparkles, 
  Star,
  CheckCircle,
  Zap
} from 'lucide-react';
import { siteConfig } from '@/lib/config';

export default function HomePage() {
  const features = [
    {
      icon: Brain,
      title: 'Mental Wellness Checkup',
      description: 'Complete our 7-question assessment with AI-powered insights and safety screening',
      href: '/checkup'
    },
    {
      icon: Camera,
      title: 'AI Photo Scanner',
      description: 'Analyze food nutrition and health indicators through intelligent photo recognition',
      href: '/scanner'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Visualize your wellness journey with personalized dashboards and gamification',
      href: '/progress'
    },
    {
      icon: Users,
      title: 'Parent Mode',
      description: 'Simplified summaries and age-appropriate insights for younger users',
      href: '/parent-mode'
    }
  ];

  const trustBadges = [
    { icon: Shield, text: 'Privacy First' },
    { icon: Heart, text: 'Mental Health Support' },
    { icon: Sparkles, text: 'AI-Powered' },
    { icon: Star, text: 'Trusted by Thousands' }
  ];

  return (
    <main className="flex-1 page-transition">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-teal-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-lg border border-primary/20 rounded-full px-4 py-2 mb-8 hover-lift fade-in">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm text-foreground">AI-Powered Mental Wellness Platform</span>
            </div>
            
            {/* Hero Title */}
            <h1 className="text-4xl font-bold text-foreground tracking-tight sm:text-5xl md:text-7xl lg:text-8xl slide-up">
              Your Journey to
              <span className="block gradient-text mt-2">Mental Balance</span>
            </h1>
            
            {/* Hero Description */}
            <p className="mt-8 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed slide-up stagger-1">
              Discover personalized mental wellness insights through AI-powered checkups, photo analysis, 
              and progress tracking. Take control of your mental health journey with BalanceAI.
            </p>
            
            {/* Hero CTA */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 slide-up stagger-2">
              <Button
                asChild
                size="lg"
                className="text-lg rounded-full px-8 py-4 glow-teal pulse-glow bg-primary hover:bg-primary/90 interactive-element"
              >
                <Link href="/checkup">
                  Start Your Checkup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg rounded-full px-8 py-4 glass-card border-primary/20 interactive-element"
              >
                <Link href="/scanner">
                  Try Photo Scanner
                  <Camera className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 fade-in stagger-3">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 text-muted-foreground hover-lift">
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="text-sm">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Comprehensive Mental Wellness Tools
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, track, and improve your mental health in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`slide-up stagger-${(index % 6) + 1}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 bg-card gradient-bg-card h-full hover-lift">
                    <CardContent className="p-6">
                      <Link href={feature.href}>
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="relative">
                            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </p>
                          
                          <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-sm font-medium">Get Started</span>
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose BalanceAI Section */}
      <section className="py-24 gradient-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-8">
                Why Choose BalanceAI?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 hover-lift fade-in stagger-1">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Privacy-First Approach</h3>
                    <p className="text-muted-foreground">Your mental health data is encrypted and never shared without your explicit consent.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover-lift fade-in stagger-2">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights</h3>
                    <p className="text-muted-foreground">Advanced algorithms provide personalized recommendations based on your unique patterns.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover-lift fade-in stagger-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Crisis Support</h3>
                    <p className="text-muted-foreground">Immediate safety screening and crisis intervention resources when you need them most.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover-lift fade-in stagger-4">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Family-Friendly</h3>
                    <p className="text-muted-foreground">Parent mode provides age-appropriate summaries and monitoring for younger users.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative slide-in-right">
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 interactive-element">
                    <Brain className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Mental Wellness Score</h4>
                      <div className="w-32 h-2 bg-muted rounded-full mt-1">
                        <div className="w-24 h-2 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 interactive-element">
                    <Heart className="h-8 w-8 text-accent" />
                    <div>
                      <h4 className="font-semibold text-foreground">Stress Level</h4>
                      <div className="w-32 h-2 bg-muted rounded-full mt-1">
                        <div className="w-16 h-2 bg-gradient-to-r from-accent to-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 interactive-element">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Progress Streak</h4>
                      <p className="text-muted-foreground text-sm">7 days active</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorations */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-500" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-8 slide-up">
            Ready to Start Your Wellness Journey?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto slide-up stagger-1">
            Join thousands of users who have already taken the first step towards better mental health with BalanceAI.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 slide-up stagger-2">
            <Button
              asChild
              size="lg"
              className="text-lg rounded-full px-8 py-4 glow-teal pulse-glow bg-primary hover:bg-primary/90 interactive-element"
            >
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg rounded-full px-8 py-4 interactive-element"
            >
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
          </div>
          
          {/* Privacy Policy Link */}
          <div className="mt-8 text-center slide-up stagger-3">
            <Link 
              href="/privacy" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors underline interactive-element"
            >
              Privacy Policy & Data Protection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}