# BalanceAI - Mental Wellness Platform

A comprehensive AI-powered mental wellness platform built with Next.js, React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Interactive Mental Wellness Checkup**: 7-question assessment with AI-powered insights
- **AI Photo Scanner**: Nutrition analysis and health indicator detection using computer vision
- **Progress Dashboard**: Gamified wellness tracking with streaks and achievements
- **Parent Mode**: Simplified summaries for younger users
- **Dark Theme**: Elegant black gradient design with interactive animations
- **Privacy-Focused**: Encrypted data with user consent controls
- **Crisis Support**: Immediate safety screening and intervention resources

## 🎨 Design & Animations

- **Modern Dark Theme**: Black gradients with cyan and neon green accents
- **Smooth Page Transitions**: Framer Motion powered navigation
- **Scroll Animations**: Reveal effects and staggered animations
- **Interactive Elements**: 3D hover effects and micro-interactions
- **Loading States**: Elegant spinners and typing animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS V4, Custom CSS animations
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: 
  - Google AI (Gemini 1.5 Flash) for wellness analysis
  - OpenRouter (Gemini Flash 1.5) for vision analysis
- **Authentication**: JWT-based sessions
- **Deployment**: Vercel-optimized

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google AI API key
- OpenRouter API key

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd balanceai
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a \`.env\` file with:
   \`\`\`env
   # Database
   POSTGRES_URL=your_postgresql_connection_string
   
   # App Configuration
   BASE_URL=http://localhost:3000
   AUTH_SECRET=your_jwt_secret_key
   
   # AI API Keys
   GOOGLE_AI_API_KEY=your_google_ai_key
   OPENROUTER_API_KEY=your_openrouter_key
   \`\`\`

4. **Database Setup**
   \`\`\`bash
   npm run db:generate
   npm run db:migrate
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Vercel Deployment

### Automatic Deployment

1. **Fork/Clone to GitHub**
2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   
   \`\`\`
   POSTGRES_URL=your_production_postgresql_url
   BASE_URL=https://your-app.vercel.app
   AUTH_SECRET=your_production_jwt_secret
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   \`\`\`

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at \`https://your-app.vercel.app\`

### Manual Deployment

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
\`\`\`

## 🗄️ Database Setup for Production

### Option 1 - Vercel Postgres
1. Go to Vercel Dashboard → Storage → Create Database
2. Select PostgreSQL
3. Copy connection string to \`POSTGRES_URL\`

### Option 2 - External PostgreSQL
- **Neon**: [neon.tech](https://neon.tech) (Recommended)
- **Supabase**: [supabase.com](https://supabase.com)
- **Railway**: [railway.app](https://railway.app)
- **PlanetScale**: [planetscale.com](https://planetscale.com)

## 🔑 Getting API Keys

### Google AI (Gemini)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Copy to \`GOOGLE_AI_API_KEY\`

### OpenRouter
1. Go to [OpenRouter](https://openrouter.ai/keys)
2. Create account and generate API key
3. Copy to \`OPENROUTER_API_KEY\`

## 📱 Pages & Features

- **\`/\`** - Landing page with hero and features
- **\`/checkup\`** - Interactive mental wellness assessment
- **\`/scanner\`** - AI photo analysis for food and health
- **\`/progress\`** - Wellness dashboard with gamification
- **\`/parent-mode\`** - Simplified monitoring for families
- **\`/privacy\`** - Privacy policy and data protection
- **\`/sign-in\`** & **\`/sign-up\`** - Authentication

## 🎯 Performance Optimizations

- **Server-Side Rendering** with Next.js App Router
- **Image Optimization** with Next.js Image component
- **Code Splitting** for reduced bundle sizes
- **API Route Optimization** with 30s timeout
- **Database Connection Pooling**
- **Framer Motion** lazy loading for animations

## 🔒 Security Features

- **JWT Authentication** with secure sessions
- **Input Validation** on all forms and APIs
- **SQL Injection Protection** with Drizzle ORM
- **XSS Protection** with Content Security Policy
- **HTTPS Enforced** in production
- **Environment Variable** protection

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Crisis Resources

If you or someone you know is in crisis:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency**: 911

---

Built with ❤️ for mental wellness and powered by AI innovation.