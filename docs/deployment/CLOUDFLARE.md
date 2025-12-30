# Cloudflare Pages Deployment Guide

Your portfolio is ready to deploy on **Cloudflare Pages** - a fast, secure, and free hosting solution.

## Why Cloudflare Pages?

✅ **Free** - No cost for unlimited deployments  
✅ **Fast** - Global CDN with 200+ data centers  
✅ **Secure** - Free HTTPS, DDoS protection, security headers  
✅ **Easy** - Git integration, automatic builds  
✅ **Reliable** - 99.95% uptime SLA  
✅ **Preview Deployments** - Test before going live  

## Setup Steps (3 Minutes)

### Step 1: Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email or GitHub (recommended)
3. Verify email

### Step 2: Connect GitHub Repository
1. Go to https://dash.cloudflare.com/
2. Select **Pages** in the left sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access GitHub
6. Select repository: `hareesh08/portfolio-v1`
7. Click **Begin setup**

### Step 3: Configure Build Settings
The build settings should auto-detect:

```
Production branch: main
Build command: npm run build
Build output directory: dist
```

If not auto-detected, set them manually:

**Framework preset:** None (custom)

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory (advanced):** `/`

**Node.js version:** 18.x

### Step 4: Environment Variables (Optional)
Add any environment variables needed:

1. After creating project, go to **Settings → Environment variables**
2. Add variables (e.g., API keys, if needed)
3. Click **Save**

For this portfolio, no variables are required.

### Step 5: Deploy
1. Click **Save and Deploy**
2. Cloudflare will:
   - Clone your repository
   - Run `npm run build`
   - Deploy to their global CDN
   - Give you a live URL

### Step 6: Custom Domain (Optional)
To use your own domain:

1. Go to your **Pages project → Settings → Domains**
2. Click **Add a custom domain**
3. Enter your domain (e.g., `portfolio.example.com`)
4. Add the DNS record or CNAME record shown by Cloudflare
5. Wait for DNS propagation (usually instant with Cloudflare)

## Your Live Site

```
https://portfolio-v1.pages.dev/
```

## Automatic Updates

Simply push changes to GitHub - Cloudflare will automatically:
1. Detect the push
2. Build your site
3. Deploy to all 200+ data centers
4. Go live (usually in 1-2 minutes)

```bash
git add .
git commit -m "Update: your changes"
git push origin main
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify `npm run build` works locally
- Check `.gitignore` (should exclude `node_modules`, `dist`, etc.)

### Site Returns 404
- Verify build output directory is `dist`
- Check that `_redirects` file exists in `public/`

### Custom Domain Not Working
- Verify DNS records in domain registrar
- Check CNAME record in Cloudflare
- Wait for DNS propagation (can take 24 hours)

## More Info

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
