# GitHub Pages Deployment Guide

Your portfolio is configured to deploy on GitHub Pages!

## Prerequisites
- GitHub account
- Public repository (GitHub Pages requires public repos)

## Setup Steps

### Step 1: Repository is Already Set Up
Your repository is already configured with:
- Git initialized
- Remote added to GitHub
- Main branch set up

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub: https://github.com/hareesh08/portfolio-v1
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment" → **Source**, select **GitHub Actions**
4. Click **Save**

### Step 3: Automatic Deployment
The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Automatically trigger on every push to the `main` branch
- Build your project
- Deploy to GitHub Pages

### Step 4: Access Your Portfolio
Your site will be available at:
```
https://hareesh08.github.io/portfolio-v1/
```

## What's Configured for GitHub Pages

1. **Vite Config** - Set `base: "/portfolio-v1/"` for correct asset paths
2. **Router** - Uses `HashRouter` for proper URL routing without server configuration
3. **GitHub Actions** - Automated deployment workflow configured

## Deploy Updates

Simply commit and push changes to trigger automatic deployment:
```bash
git add .
git commit -m "Update: your changes"
git push origin main
```

Your portfolio will be live on GitHub Pages within 1-2 minutes!

## Manual Build & Test Locally

To build and test locally before deploying:

```bash
npm install
npm run build
npm run preview
```

Then open `http://localhost:4173` in your browser.

## Troubleshooting

### Assets Not Loading
- Check that `vite.config.ts` has `base: "/portfolio-v1/"` (matches your repo name)
- Clear browser cache
- Check browser console for 404 errors

### Routing Issues
- Verify `HashRouter` is used in `src/App.tsx`
- URLs should look like: `https://hareesh08.github.io/portfolio-v1/#/section`

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors
- Run `npm run build` locally to debug

### Site Not Publishing
- Verify GitHub Pages is enabled in Settings
- Check Actions tab for workflow failures
- Ensure `Source` is set to `GitHub Actions`

## Resume Download
The resume link automatically works from the public folder:
- Built into: `/Hareesh_Ragavendra_Resume.pdf`
- Served from: `public/Hareesh_Ragavendra_Resume.pdf`

## Important Notes

⚠️ **GitHub Pages requires your repository to be PUBLIC**

If you want to keep your repository private, use one of these alternatives:
- **Cloudflare Pages** (recommended)
- **Vercel**
- **Netlify**

See [Deployment Guide](../DEPLOYMENT.md) for other options.
