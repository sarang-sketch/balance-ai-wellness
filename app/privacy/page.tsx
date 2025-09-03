import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Heart, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen gradient-bg-primary">
      <div className="max-w-4xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Privacy & Security</h1>
          </div>
          <p className="text-muted-foreground">
            Your mental health data is sacred. Here's how we protect it.
          </p>
        </div>

        {/* Privacy Commitments */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Lock className="h-5 w-5 mr-2" />
                Data Encryption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All your personal information and wellness data is encrypted using industry-standard 
                AES-256 encryption both in transit and at rest.
              </p>
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">End-to-end encryption enabled</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Eye className="h-5 w-5 mr-2" />
                Data Minimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We only collect data that's essential for your wellness journey. 
                No unnecessary tracking or data harvesting.
              </p>
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Zero unnecessary data collection</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Heart className="h-5 w-5 mr-2" />
                Never Sold or Shared
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your mental health data will never be sold, shared with third parties, 
                or used for advertising purposes. Period.
              </p>
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">100% commitment to privacy</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Shield className="h-5 w-5 mr-2" />
                HIPAA Compliant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our platform meets healthcare-grade security standards to protect 
                your sensitive mental health information.
              </p>
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Healthcare-grade security</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Privacy Policy */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Privacy Policy Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What We Collect</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Wellness checkup responses (mood, anxiety, sleep, etc.)</li>
                <li>• Photo analysis results (nutrition data, health indicators)</li>
                <li>• Progress tracking data and achievements</li>
                <li>• Account information (email, encrypted password)</li>
                <li>• Usage patterns to improve our AI recommendations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How We Use Your Data</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Provide personalized wellness insights and recommendations</li>
                <li>• Track your progress and identify patterns in your mental health</li>
                <li>• Improve our AI algorithms for better accuracy</li>
                <li>• Detect potential crisis situations for safety purposes</li>
                <li>• Enable parent mode features (with your explicit consent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Your Rights</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Access all your personal data at any time</li>
                <li>• Request correction of inaccurate information</li>
                <li>• Delete your account and all associated data</li>
                <li>• Export your data in a portable format</li>
                <li>• Opt out of any non-essential data processing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Data Retention</h3>
              <p className="text-muted-foreground text-sm">
                We retain your wellness data only as long as your account is active or as needed to provide 
                our services. Upon account deletion, all personal data is permanently removed within 30 days, 
                except where retention is required by law for safety or security purposes.
              </p>
            </div>

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                Crisis Intervention Exception
              </h4>
              <p className="text-sm text-muted-foreground">
                If our AI detects potential self-harm or crisis situations, we may contact emergency 
                services or mental health professionals to ensure your safety. This is the only 
                circumstance where we may share your information without explicit consent.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Measures */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Security Measures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Technical Safeguards</h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    SSL/TLS encryption for all data transmission
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    AES-256 encryption for data storage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Regular security audits and penetration testing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Multi-factor authentication support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Automated backup and disaster recovery
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Organizational Safeguards</h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Staff privacy and security training
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Access controls and role-based permissions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Incident response and breach notification procedures
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Third-party vendor security assessments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Regular compliance reviews and updates
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Questions or Concerns?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our privacy practices or would like to exercise 
              your data rights, please contact our privacy team:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@balanceai.com</p>
              <p><strong>Address:</strong> BalanceAI Privacy Team, 123 Wellness Street, Mental Health City, MH 12345</p>
              <p><strong>Phone:</strong> 1-800-BALANCE (1-800-225-2623)</p>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Last updated: January 2024 | This policy is effective immediately and supersedes all prior versions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}