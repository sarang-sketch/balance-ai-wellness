import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  Sparkles, 
  Target, 
  Award, 
  Globe, 
  MessageCircle,
  Camera,
  BarChart3,
  Zap,
  CheckCircle,
  Star,
  User
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms provide personalized mental wellness insights based on your unique patterns and responses.'
    },
    {
      icon: Camera,
      title: 'Visual Health Scanning',
      description: 'Revolutionary photo analysis technology that evaluates food nutrition and detects health indicators through computer vision.'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Comprehensive dashboards with gamification elements to visualize your wellness journey and maintain motivation.'
    },
    {
      icon: Users,
      title: 'Family-Friendly',
      description: 'Parent mode provides age-appropriate content and monitoring capabilities for younger users and family wellness.'
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'Enterprise-grade encryption and privacy controls ensure your mental health data remains secure and confidential.'
    },
    {
      icon: MessageCircle,
      title: 'Crisis Support',
      description: 'Immediate safety screening and crisis intervention resources with 24/7 access to mental health professionals.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users', icon: Users },
    { value: '50,000+', label: 'Wellness Assessments', icon: Brain },
    { value: '25,000+', label: 'Photos Analyzed', icon: Camera },
    { value: '98%', label: 'User Satisfaction', icon: Star }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'BalanceAI Founded',
      description: 'Launched with a vision to democratize mental wellness through AI technology.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Integrated advanced AI models for personalized mental health analysis and photo scanning.'
    },
    {
      year: '2024',
      title: 'Privacy Certification',
      description: 'Achieved HIPAA compliance and SOC 2 Type II certification for data security.'
    },
    {
      year: '2024',
      title: '10K+ Users',
      description: 'Reached 10,000+ active users across 15 countries with 98% satisfaction rate.'
    }
  ];

  return (
    <main className="flex-1 page-transition">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg-primary py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-lg border border-primary/20 rounded-full px-4 py-2 mb-8 hover-lift fade-in">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm text-foreground">About BalanceAI</span>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground tracking-tight sm:text-5xl md:text-6xl lg:text-7xl slide-up">
              Revolutionizing Mental Wellness
              <span className="block gradient-text mt-2">Through AI Innovation</span>
            </h1>
            
            <p className="mt-8 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed slide-up stagger-1">
              BalanceAI combines cutting-edge artificial intelligence with compassionate mental health care 
              to provide personalized wellness insights that empower individuals on their journey to better mental health.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 slide-up stagger-2">
              <Button
                asChild
                size="lg"
                className="text-lg rounded-full px-8 py-4 glow-teal pulse-glow bg-primary hover:bg-primary/90 interactive-element"
              >
                <Link href="/checkup">
                  Try Our Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg rounded-full px-8 py-4 glass-card border-primary/20 interactive-element"
              >
                <Link href="#mission">
                  Our Mission
                  <Target className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000" />
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-8">
                Our Mission
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At BalanceAI, we believe that mental wellness should be accessible, personalized, and stigma-free. 
                  Our mission is to harness the power of artificial intelligence to democratize mental health care 
                  and provide everyone with the tools they need to understand and improve their mental well-being.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're committed to creating technology that respects privacy, promotes understanding, and 
                  empowers individuals to take control of their mental health journey with confidence and support.
                </p>
                
                <div className="flex items-start space-x-4 hover-lift fade-in stagger-1">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Accessibility First</h3>
                    <p className="text-muted-foreground">Making mental wellness tools available to everyone, regardless of background or resources.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover-lift fade-in stagger-2">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Evidence-Based Approach</h3>
                    <p className="text-muted-foreground">Grounding our AI models in clinical research and validated psychological frameworks.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover-lift fade-in stagger-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Continuous Innovation</h3>
                    <p className="text-muted-foreground">Constantly improving our platform based on user feedback and advancing AI capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative slide-in-right">
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="text-center mb-6">
                  <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground">Global Impact</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center interactive-element">
                        <Icon className="h-8 w-8 text-accent mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground gradient-text-static">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Floating decorations */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 gradient-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
              What Makes BalanceAI Special
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines advanced AI technology with human-centered design to deliver 
              personalized mental wellness experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`slide-up stagger-${(index % 6) + 1}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 bg-card gradient-bg-card h-full hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                          <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 gradient-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              From concept to impact - the milestones that shaped BalanceAI.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`slide-up stagger-${(index % 6) + 1}`}>
                <div className="flex items-start space-x-6 hover-lift">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                      <span className="text-primary font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="slide-up">
            <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-8">
              Join the Mental Wellness Revolution
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto slide-up stagger-1">
            Be part of a community that's redefining mental health care through technology, 
            compassion, and personalized support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 slide-up stagger-2">
            <Button
              asChild
              size="lg"
              className="text-lg rounded-full px-8 py-4 glow-teal pulse-glow bg-primary hover:bg-primary/90 interactive-element"
            >
              <Link href="/checkup">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg rounded-full px-8 py-4 interactive-element"
            >
              <Link href="/sign-up">
                Create Account
                <User className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-12 text-center slide-up stagger-3">
            <p className="text-muted-foreground mb-4">Questions? We'd love to hear from you.</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="mailto:hello@balanceai.app" className="text-primary hover:text-accent transition-colors underline">
                hello@balanceai.app
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}