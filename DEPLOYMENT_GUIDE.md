# Deployment Guide - PromptAtWork.com

## Pre-Deployment Checklist

- [ ] All data files updated with correct information
- [ ] Images replaced with actual images (or keep Unsplash placeholders)
- [ ] Personal information verified (email, phone, LinkedIn)
- [ ] Content proofread for typos
- [ ] Local build successful (`npm run build`)
- [ ] All pages tested locally (`npm run dev`)

## Step 1: Prepare Your Repository

### Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: PromptAtWork website"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Name: `promptatwork-website` (or your choice)
3. Keep it public or private
4. Don't initialize with README (you have one)
5. Click "Create repository"

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/promptatwork-website.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended for First Time)

1. **Sign Up / Login**
   - Go to https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your repositories

2. **Import Project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Find your `promptatwork-website` repository
   - Click "Import"

3. **Configure Project**
   - **Project Name**: promptatwork (or your choice)
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete
   - You'll get a URL like: `https://promptatwork.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

## Step 3: Configure Custom Domain

### Get Your Domain Ready
Make sure you own `promptatwork.com` through a domain registrar (GoDaddy, Namecheap, Google Domains, etc.)

### Add Domain in Vercel

1. Go to your project in Vercel Dashboard
2. Click "Settings" tab
3. Click "Domains" in sidebar
4. Click "Add Domain"
5. Enter `promptatwork.com`
6. Click "Add"
7. Repeat for `www.promptatwork.com`

### Configure DNS at Your Registrar

Vercel will show you DNS records to add. Typically:

#### For Root Domain (promptatwork.com)
**Option 1: A Record (Most Common)**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or default)
```

**Option 2: CNAME (if supported by registrar)**
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600
```

#### For WWW Subdomain (www.promptatwork.com)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Popular Registrar Instructions

#### GoDaddy
1. Login to GoDaddy
2. My Products → Domains → DNS
3. Click "Add" for new record
4. Add records as shown above

#### Namecheap
1. Login to Namecheap
2. Domain List → Manage → Advanced DNS
3. Click "Add New Record"
4. Add records as shown above

#### Google Domains
1. Login to Google Domains
2. My Domains → Manage → DNS
3. Scroll to "Custom resource records"
4. Add records as shown above

#### Cloudflare
1. Login to Cloudflare
2. Select your domain
3. DNS → Add record
4. Add records as shown above

### Verify Domain

1. Return to Vercel Dashboard
2. Go to Settings → Domains
3. Wait for DNS propagation (can take 5 mins - 48 hours, usually < 1 hour)
4. Click "Verify" next to your domain
5. When verified, you'll see a checkmark ✓

### Set Primary Domain

1. In Vercel Dashboard → Settings → Domains
2. Find your preferred domain (e.g., `www.promptatwork.com`)
3. Click the three dots → "Set as Primary"
4. Other domains will redirect to primary

## Step 4: SSL Certificate (Automatic)

Vercel automatically provisions SSL certificates via Let's Encrypt.
- No configuration needed
- Takes a few minutes after domain verification
- Your site will be accessible via HTTPS

## Step 5: Automatic Deployments

Once connected to GitHub:
- **Every push to `main` branch** → Automatic production deployment
- **Every push to other branches** → Automatic preview deployment
- Each deployment gets a unique URL

### Make Changes
```bash
# Make changes to your code
# Commit changes
git add .
git commit -m "Updated landing page content"

# Push to GitHub
git push origin main

# Vercel automatically deploys!
```

## Step 6: Environment Variables (If Needed)

If you add API keys or secrets later:

1. Vercel Dashboard → Settings → Environment Variables
2. Add variable name and value
3. Select environments (Production, Preview, Development)
4. Click "Save"
5. Redeploy to apply changes

## Monitoring & Analytics

### Built-in Analytics
- Vercel Dashboard → Analytics
- See page views, performance metrics
- Available on Pro plan

### Add Google Analytics (Optional)
1. Get Google Analytics tracking ID
2. Add to `index.html` in `<head>` section
3. Commit and push

## Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# Check error messages
# Fix errors
# Push again
```

### Domain Not Working
- Check DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Use https://dnschecker.org to check propagation
- Verify domain in Vercel Dashboard

### 404 on Routes
- Should be fixed by `vercel.json`
- If issue persists, check `vercel.json` exists with:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Images Not Loading
- Check image URLs in `data/images.json`
- Ensure URLs are complete (include https://)
- Check browser console for errors

## Continuous Deployment Workflow

```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Build to verify
npm run build

# 4. Commit changes
git add .
git commit -m "Description of changes"

# 5. Push to GitHub
git push origin main

# 6. Vercel automatically deploys!
# 7. Check deployment status in Vercel Dashboard
# 8. Visit https://promptatwork.com to see changes
```

## Cost

- **Vercel Hobby Plan**: FREE
  - Unlimited personal projects
  - Automatic HTTPS
  - Global CDN
  - Automatic deployments
  - 100 GB bandwidth/month
  - No credit card required

- **Domain Cost**: $10-15/year (from registrar)

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: Create issue in your repository

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Git
git status              # Check status
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub

# Vercel CLI
vercel login            # Login to Vercel
vercel                  # Deploy to preview
vercel --prod          # Deploy to production
vercel domains ls       # List domains
vercel env ls          # List environment variables
```

## Post-Deployment

After successful deployment:
- [ ] Test all pages: /, /resume, /cover-letter
- [ ] Test on mobile devices
- [ ] Share URL with others for feedback
- [ ] Update LinkedIn with website URL
- [ ] Add website to email signature
- [ ] Test PDF export on resume and cover letter
- [ ] Check all links work correctly
- [ ] Verify contact information is correct

## Success!

Your website is now live at:
- https://promptatwork.com
- https://www.promptatwork.com
- https://promptatwork.vercel.app (Vercel subdomain)

Share it with the world! 🚀
