# Portfolio Deployment Quick Reference

## GitHub Repository
```
https://github.com/hareesh08/portfolio-v1
```

---

## Deploy in 3 Minutes: Cloudflare Pages

```
1. Go to: https://dash.cloudflare.com/
2. Click: Pages → Create project
3. Select: Connect to Git
4. Choose: hareesh08/portfolio-v1
5. Deploy!
```

**Your Site:** `https://portfolio-v1.pages.dev/`

---

## Deployment Options

| Platform | URL | Setup Time | Cost |
|----------|-----|-----------|------|
| **Cloudflare Pages** ⭐ | `portfolio-v1.pages.dev` | 3 min | FREE |
| GitHub Pages | `hareesh08.github.io/portfolio-v1` | 5 min | FREE |
| VPS (Docker) | `your-domain.com` | 30 min | $5-50/mo |
| Traditional Hosting | `your-domain.com` | 10 min | $5-15/mo |
| Heroku | `portfolio-v1.herokuapp.com` | 10 min | FREE-$50/mo |

---

## Update Your Site

```bash
# Make changes
git add .
git commit -m "Update: description"
git push origin main

# Site auto-deploys in 1-5 minutes ✅
```

---

## Key Files

```
src/                        Your React app
├── components/            Page sections
├── pages/                Index page
└── App.tsx              Main app component

public/                    Static assets
├── _redirects            SPA routing (Cloudflare)
├── _headers              Security headers
└── Hareesh_Ragavendra_Resume.pdf

.github/workflows/         Auto-deploy scripts
├── deploy.yml            GitHub Pages
├── deploy-cloudflare.yml Cloudflare
├── deploy-vps.yml        VPS/Docker
└── deploy-webhosting.yml Traditional hosting

Dockerfile                 Docker image
docker-compose.yml        Local testing
nginx.conf               Web server config
```

---

## Documentation

- **DEPLOYMENT_SUMMARY.md** - Overview of all options
- **CLOUDFLARE_PAGES_SETUP.md** - Detailed Cloudflare guide
- **CLOUDFLARE_QUICK_START.md** - 3-minute Cloudflare setup
- **DEPLOYMENT_GUIDE.md** - All platforms detailed
- **GITHUB_PAGES_SETUP.md** - GitHub Pages guide

---

## Local Testing

```bash
# Build
npm run build

# Preview
npm run preview
# Visit: http://localhost:4173

# Docker
docker-compose up -d
# Visit: http://localhost:8080
```

---

## Troubleshooting

### Site not updating?
```bash
npm run build          # Build locally
npm run lint           # Check for errors
git push origin main   # Push changes
# Wait 2-5 minutes
```

### Build fails?
```bash
npm install            # Reinstall dependencies
npm run build          # Test build
npm run lint           # Check for errors
```

### Need to rollback?
```bash
git revert HEAD
git push origin main
# Previous version deployed
```

---

## Environment Variables

Create `.env.production`:
```
VITE_API_URL=https://api.example.com
```

Then use in code:
```tsx
const api = import.meta.env.VITE_API_URL;
```

---

## Custom Domain

### Cloudflare
1. In Pages → Settings → Domains
2. Add your domain
3. Update registrar nameservers to Cloudflare
4. Done!

### GitHub Pages
1. In Settings → Pages
2. Add custom domain
3. Update CNAME in registrar
4. Done!

---

## Performance Tips

✅ Use Cloudflare Pages (global CDN)  
✅ Optimize images (auto with Cloudflare)  
✅ Minify code (auto build process)  
✅ Cache static assets (configured)  
✅ Enable HTTPS (auto enabled)  

---

## Security

✅ HTTPS enabled  
✅ Security headers configured  
✅ XSS protection enabled  
✅ CSRF protection available  
✅ DDoS protection (Cloudflare)  

---

## Support

**Choose your platform:** See DEPLOYMENT_SUMMARY.md  
**Detailed setup:** See DEPLOYMENT_GUIDE.md  
**Cloudflare help:** See CLOUDFLARE_PAGES_SETUP.md  

---

**Ready to deploy?** Start with Cloudflare Pages for fastest setup! 🚀
