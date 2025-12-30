# Portfolio - Modern Animated Portfolio Website

A modern, fast, and fully responsive animated portfolio website built with React, TypeScript, and Tailwind CSS. Deploy on multiple platforms with automated CI/CD.

## Features

✨ **Modern Design**
- Animated hero section with smooth transitions
- Interactive project showcase
- Responsive design for all devices
- Dark mode ready

🚀 **Performance**
- Built with Vite for instant dev reload
- Optimized production builds
- Fast page load times
- SEO-friendly structure

🔧 **Developer Experience**
- TypeScript for type safety
- Component-based architecture
- Tailwind CSS for styling
- Hot module reloading in development

📱 **Fully Responsive**
- Mobile-first design
- Tablet and desktop layouts
- Touch-friendly interactions
- Accessible components

🚀 **Multiple Deployment Options**
- Cloudflare Pages (recommended)
- GitHub Pages
- VPS with Docker
- Traditional Web Hosting

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hareesh08/portfolio-v1.git
   cd portfolio-v1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint and fix code
npm run lint
```

## Project Structure

```
portfolio-v1/
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # UI components (shadcn-ui)
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── Skills.tsx       # Skills section
│   │   ├── Experience.tsx   # Experience section
│   │   ├── Contact.tsx      # Contact section
│   │   ├── Footer.tsx       # Footer
│   │   └── ...
│   ├── pages/               # Page components
│   │   └── Index.tsx        # Main page
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
│
├── public/                  # Static assets
│   ├── Hareesh_Ragavendra_Resume.pdf
│   ├── _redirects           # SPA routing config
│   ├── _headers             # Security headers
│   └── ...
│
├── docs/                    # Documentation
│   ├── DEPLOYMENT.md        # Deployment overview
│   └── deployment/          # Platform-specific guides
│       ├── CLOUDFLARE.md
│       ├── GITHUB_PAGES.md
│       ├── VPS_DOCKER.md
│       └── TRADITIONAL_HOSTING.md
│
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages deployment
│
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Local Docker setup
├── nginx.conf              # Nginx configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind CSS config
└── package.json            # Project dependencies
```

## Technology Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **CSS Framework:** Tailwind CSS
- **UI Components:** shadcn-ui
- **Router:** React Router (HashRouter for GitHub Pages)
- **HTTP Client:** Axios (optional)
- **State Management:** React Query
- **Styling:** CSS + Tailwind

## Customization

### Update Portfolio Content

Edit the following files to customize your portfolio:

1. **Hero Section:** `src/components/Hero.tsx`
2. **Projects:** `src/components/Projects.tsx`
3. **Skills:** `src/components/Skills.tsx`
4. **Experience:** `src/components/Experience.tsx`
5. **Contact:** `src/components/Contact.tsx`

### Update Resume
Replace `public/Hareesh_Ragavendra_Resume.pdf` with your resume PDF

### Update Favicon
Replace files in `public/` with your favicon files

### Color Scheme
Edit `tailwind.config.ts` to change colors

## Deployment

Choose your preferred deployment platform:

### 🌟 Cloudflare Pages (Recommended)
**3-minute setup, global CDN, free**

→ [Cloudflare Deployment Guide](./docs/deployment/CLOUDFLARE.md)

```bash
# Just push to GitHub, Cloudflare handles the rest
git push origin main
```

Live at: `https://portfolio-v1.pages.dev/`

### GitHub Pages
**5-minute setup, free, simple**

→ [GitHub Pages Deployment Guide](./docs/deployment/GITHUB_PAGES.md)

⚠️ *Requires public repository*

Live at: `https://hareesh08.github.io/portfolio-v1/`

### VPS with Docker
**30-minute setup, full control, custom domain**

→ [VPS Deployment Guide](./docs/deployment/VPS_DOCKER.md)

Supports: DigitalOcean, Linode, AWS, Hetzner, etc.

### Traditional Web Hosting
**10-minute setup, cPanel/Plesk, affordable**

→ [Traditional Hosting Guide](./docs/deployment/TRADITIONAL_HOSTING.md)

Supports: GoDaddy, Namecheap, Hostinger, etc.

### Full Deployment Guide
→ [Complete Deployment Documentation](./docs/DEPLOYMENT.md)

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

### Making Changes
1. Edit component files in `src/`
2. Changes hot-reload automatically
3. Build locally to test: `npm run build`

### Deploy
```bash
git add .
git commit -m "Update: your changes"
git push origin main
```

Automatic deployment triggers based on your platform:
- **Cloudflare:** 1-2 minutes
- **GitHub Pages:** 2-3 minutes
- **VPS:** 2-5 minutes
- **Traditional Hosting:** 3-5 minutes

## Configuration Files

### Vite Configuration (`vite.config.ts`)
- Build settings
- Dev server setup
- Base path for deployment

### Tailwind CSS (`tailwind.config.ts`)
- Color scheme
- Typography
- Component styling

### TypeScript (`tsconfig.json`)
- Type checking
- Module resolution
- Target settings

## Environment Variables

Create `.env.local` if needed:

```env
# Example (not required for this portfolio)
VITE_API_URL=https://api.example.com
```

## Performance Optimization

Already configured:
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ✅ CSS minification
- ✅ JS minification
- ✅ Gzip compression
- ✅ CDN-ready

## Security

- ✅ Content Security Policy headers
- ✅ XSS protection
- ✅ HTTPS enforced (on hosting)
- ✅ Secure headers configured
- ✅ Dependencies regularly updated

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Development Server Not Starting
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

## License

MIT License - Feel free to use this portfolio as a template

## Support

For questions or issues:
- Check [Documentation](./docs/DEPLOYMENT.md)
- Review [GitHub Issues](https://github.com/hareesh08/portfolio-v1/issues)
- Check platform-specific guides in `docs/deployment/`

## Next Steps

1. **Customize Content** - Edit components with your information
2. **Choose Deployment** - Pick your deployment platform
3. **Deploy** - Push to GitHub to go live
4. **Custom Domain** - Connect your domain (optional)
5. **Monitor** - Check your site regularly

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check code quality
npm run lint --fix       # Fix linting issues

# Git Workflow
git add .                # Stage changes
git commit -m "msg"      # Commit changes
git push origin main     # Push to GitHub
```

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

For detailed deployment instructions, see [Deployment Guide](./docs/DEPLOYMENT.md)
