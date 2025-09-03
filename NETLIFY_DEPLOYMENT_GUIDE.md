# BalanceAI Netlify Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Required Services Setup

Before deploying to Netlify, ensure you have:

- **PostgreSQL Database**: Set up a PostgreSQL instance (recommended: Neon, Supabase, or Railway)
- **Google AI API Key**: Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **OpenRouter API Key**: Get API key from [OpenRouter](https://openrouter.ai/keys)
- **GitHub Repository**: Push your code to a GitHub repository

### 2. Database Setup

1. Create a PostgreSQL database on your preferred provider
2. Note down the connection string (should look like: `postgresql://username:password@hostname:5432/database_name`)
3. Run migrations to set up the database schema

## 🚀 Netlify Deployment Steps

### Step 1: Connect Repository to Netlify

1. Log in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose your Git provider (GitHub)
4. Select your BalanceAI repository
5. Configure build settings:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `.next`
   - **Functions directory**: `netlify/functions` (auto-detected)

### Step 2: Configure Environment Variables

Go to Site settings > Environment variables and add the following:

#### Required Variables
```bash
# Database Configuration
POSTGRES_URL=postgresql://username:password@hostname:5432/database_name

# Base URL (replace with your actual Netlify URL)
BASE_URL=https://your-site-name.netlify.app

# Authentication Secret (generate a random 32+ character string)
AUTH_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

# AI API Keys
GOOGLE_AI_API_KEY=your-google-ai-api-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
```

#### Optional Optimization Variables
```bash
# Node Environment
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Database Connection Optimization
PGBOUNCER=true
PGPOOL_MAX=10
PGPOOL_TIMEOUT=30000

# Debug logging (set to true for troubleshooting)
DEBUG=false
```

### Step 3: Install Required Plugins

Netlify should automatically detect and install the `@netlify/plugin-nextjs` plugin from your `netlify.toml` configuration.

### Step 4: Deploy

1. Click "Deploy site"
2. Monitor the build process in the deploy log
3. Once deployed, test your application

## 🔧 Configuration Files

The following files have been configured for Netlify deployment:

### `netlify.toml`
- Build configuration
- Function settings
- Redirects and headers
- Next.js plugin configuration

### `netlify/functions/`
- `api.ts`: Main API router for all `/api/*` endpoints
- `health.ts`: Health check endpoint for deployment verification

### Modified Files
- `next.config.ts`: Updated for Netlify compatibility
- `lib/db/drizzle.ts`: Enhanced database connection with pooling
- `middleware.ts`: Updated to exclude Netlify functions
- `package.json`: Added Netlify dependencies and build script

## 🧪 Testing Your Deployment

### 1. Health Check
Visit `https://your-site-name.netlify.app/.netlify/functions/health` to verify:
- Database connection
- Environment variables
- Overall system health

### 2. Application Features
Test all major features:
- User authentication (sign up/sign in)
- Wellness checkups
- Photo analysis
- Progress tracking
- Parent mode

### 3. API Endpoints
Verify API routes work correctly:
- `/api/user` - User data
- `/api/ai/analyze-photo` - Photo analysis
- `/api/ai/analyze-wellness` - Wellness analysis
- `/api/ai/insights` - AI insights

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Build Failures

**Issue**: `POSTGRES_URL environment variable is not set`
**Solution**: Ensure all environment variables are set in Netlify dashboard

**Issue**: Module resolution errors
**Solution**: Check that all dependencies are listed in `package.json`

#### Runtime Issues

**Issue**: Database connection timeouts
**Solution**: 
- Verify your database is accessible from external connections
- Check if your database provider requires IP whitelisting
- Consider enabling `PGBOUNCER=true` for better connection handling

**Issue**: API routes returning 404
**Solution**: 
- Verify Netlify Functions are deployed correctly
- Check the Functions tab in Netlify dashboard
- Ensure `netlify/functions/api.ts` is properly configured

#### Environment Variable Issues

**Issue**: Application works locally but fails on Netlify
**Solution**:
- Double-check all environment variables in Netlify dashboard
- Ensure no typos in variable names
- Verify sensitive values are not exposed in build logs

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive values to Git
2. **Database Access**: Use connection pooling and set appropriate timeouts
3. **API Keys**: Rotate keys regularly and monitor usage
4. **CORS**: API endpoints are configured with appropriate CORS headers

## 📊 Monitoring and Maintenance

### Performance Monitoring
- Use Netlify Analytics to monitor site performance
- Check Function logs for API performance
- Monitor database connection pool usage

### Regular Maintenance
- Keep dependencies updated
- Monitor API usage and costs
- Regular database backups
- Review and rotate API keys

## 🔄 CI/CD Setup

For automatic deployments:

1. Enable auto-deploy from your main branch
2. Set up branch previews for pull requests
3. Configure build notifications
4. Set up environment-specific deployments

## 📞 Support

If you encounter issues:

1. Check Netlify's deploy logs
2. Use the health check endpoint for diagnostics
3. Review this guide for common solutions
4. Check Netlify's documentation for platform-specific issues

---

## 📋 Quick Reference

### Essential URLs
- **Site URL**: `https://your-site-name.netlify.app`
- **Health Check**: `https://your-site-name.netlify.app/.netlify/functions/health`
- **Netlify Dashboard**: `https://app.netlify.com/sites/your-site-name`

### Build Commands
- **Development**: `npm run dev`
- **Production Build**: `npm run build:netlify`
- **Database Setup**: `npm run db:setup`

### Environment Files
- **Local Development**: `.env`
- **Netlify Reference**: `.env.netlify`
- **Example Template**: `.env.example`

---

**Happy Deploying! 🚀**