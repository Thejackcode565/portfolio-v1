# GitHub Pages Deployment Guide

Your portfolio is now configured to deploy on GitHub Pages! Follow these steps:

## Prerequisites
- GitHub account
- Repository created (can be named anything, but `Portfolio` is recommended)

## Setup Steps

### 1. Initialize Git Repository (if not already done)
```bash
cd d:\WebDevelopment\Portfolio
git init
git add .
git commit -m "Initial commit: Portfolio with animated design"
```

### 2. Add Remote Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **gh-pages** branch (will be created automatically after first deploy)
5. Click **Save**

### 4. Automatic Deployment
The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Automatically trigger on every push to the `main` branch
- Build your project
- Deploy to GitHub Pages

### 5. Access Your Portfolio
Your site will be available at:
```
https://YOUR_USERNAME.github.io/Portfolio/
```

## What Changed for GitHub Pages

1. **Vite Config** - Added `base: "/Portfolio/"` for correct asset paths
2. **Router** - Changed from `BrowserRouter` to `HashRouter` for proper URL routing without server configuration
3. **GitHub Actions** - Automated deployment workflow created

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
- Check that `vite.config.ts` has `base: "/Portfolio/"` (matches your repo name)

### Routing Issues
- Verify `HashRouter` is used in `App.tsx`
- URLs should look like: `https://username.github.io/Portfolio/#/section`

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: files should have no syntax issues

## Resume Download
The resume link automatically works from the public folder:
- Local: `/Hareesh_Ragavendra_Resume.pdf`
- GitHub Pages: Works automatically (served from `public/`)

## Push Updates
Simply commit and push changes to trigger automatic deployment:
```bash
git add .
git commit -m "Update: new changes"
git push
```

Your portfolio will be live on GitHub Pages within 1-2 minutes!
