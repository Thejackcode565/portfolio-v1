# Multi-Platform Deployment Guide

Your portfolio is configured to deploy on multiple hosting platforms. Choose the one that best fits your needs.

---

## Quick Reference

| Platform | Best For | Difficulty | Cost |
|----------|----------|-----------|------|
| **GitHub Pages** | Free hosting | Easiest | Free |
| **Cloudflare Pages** | Fast CDN delivery | Easy | Free |
| **Traditional Hosting** | cPanel/Plesk | Easy | $5-15/mo |
| **VPS (Docker)** | Full control | Medium | $5-50/mo |
| **Cloud (AWS/Heroku)** | Scalability | Advanced | $0-100+/mo |

---

## 1. GitHub Pages (Already Configured)

### Setup
Already configured in `.github/workflows/deploy.yml`

### Deploy
```bash
git push origin main
```

### Live URL
```
https://github.com/hareesh08/portfolio-v1
Settings → Pages → Select gh-pages branch
Live at: https://hareesh08.github.io/portfolio-v1/
```

### Key Files
- `vite.config.ts` - `base: "/portfolio-v1/"`
- `src/App.tsx` - Uses `HashRouter`

---

## 2. Cloudflare Pages

### Prerequisites
- Cloudflare account
- Domain connected to Cloudflare (optional)

### Setup Steps

#### 2.1 Get Credentials
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Create Token with "Cloudflare Pages" permissions
3. Copy `API_TOKEN`
4. Go to https://dash.cloudflare.com/profile/api-tokens and find `ACCOUNT_ID`

#### 2.2 Add GitHub Secrets
Go to repo → Settings → Secrets and variables → Actions

Add:
- `CLOUDFLARE_API_TOKEN` - Your API token
- `CLOUDFLARE_ACCOUNT_ID` - Your account ID

#### 2.3 Deploy
1. Edit `wrangler.toml`:
   ```toml
   account_id = "YOUR_ACTUAL_ACCOUNT_ID"
   ```

2. Commit and push
   ```bash
   git add wrangler.toml
   git commit -m "Configure Cloudflare"
   git push origin main
   ```

3. Workflow `.github/workflows/deploy-cloudflare.yml` runs automatically

### Live URL
```
https://portfolio-v1.pages.dev/
```

### Features
- Free HTTPS
- Global CDN
- Automatic builds
- Preview deployments

---

## 3. Traditional Web Hosting (cPanel/Plesk)

### Prerequisites
- FTP/SFTP access credentials from hosting provider
- Domain pointing to hosting

### Setup Steps

#### 3.1 Get Credentials
Contact your hosting provider for:
- FTP Server (ftp.yourdomain.com)
- FTP Username
- FTP Password
- Server Directory (usually `/public_html/`)

#### 3.2 Add GitHub Secrets
Add to repo → Settings → Secrets and variables → Actions:
- `FTP_SERVER` - ftp.yourdomain.com
- `FTP_USERNAME` - Your FTP username
- `FTP_PASSWORD` - Your FTP password
- `FTP_SERVER_DIR` - /public_html/

#### 3.3 Deploy
Workflow `.github/workflows/deploy-webhosting.yml` runs on push

### Manual Upload (Without CI/CD)
```bash
npm run build
# FTP into server and upload dist/ folder to public_html/
```

### Live URL
```
https://yourdomain.com/
```

---

## 4. VPS with Docker (DigitalOcean, Linode, AWS EC2)

### Prerequisites
- VPS with Docker & Docker Compose installed
- SSH access
- A domain pointing to your VPS

### Setup Steps

#### 4.1 Install Docker on VPS
```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 4.2 Create Deployment Directory
```bash
mkdir -p /var/www/portfolio
cd /var/www/portfolio
```

#### 4.3 Generate SSH Key for GitHub
```bash
# On your VPS
ssh-keygen -t ed25519 -f /root/.ssh/github_deploy -N ""
cat /root/.ssh/github_deploy.pub
```

Copy the public key and add to GitHub repo → Settings → Deploy keys (with write access)

#### 4.4 Add GitHub Secrets
Add to repo → Settings → Secrets and variables → Actions:
- `VPS_HOST` - Your VPS IP or domain
- `VPS_USER` - root (or your user)
- `VPS_SSH_PRIVATE_KEY` - Content of `/root/.ssh/github_deploy`
- `VPS_TARGET_DIR` - /var/www/portfolio

#### 4.5 Deploy
```bash
git push origin main
```

Workflow `.github/workflows/deploy-vps.yml` automatically:
1. Builds the app
2. Deploys to VPS via SSH
3. Restarts Docker containers

### Manual Docker Deployment
```bash
# On your VPS
cd /var/www/portfolio
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Setup Reverse Proxy (Nginx)
```bash
sudo apt-get install nginx

# Create nginx config at /etc/nginx/sites-available/portfolio
sudo nano /etc/nginx/sites-available/portfolio
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Enable HTTPS with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Live URL
```
https://yourdomain.com/
```

---

## 5. Cloud Hosting (AWS ECS, Heroku, Railway, Google Cloud)

### 5.1 Heroku (Simplest Cloud Option)

#### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

#### Setup
```bash
# Login to Heroku
heroku login

# Create app
heroku create portfolio-v1

# Get API key
heroku auth:token

# Add to GitHub Secrets:
# HEROKU_API_KEY - Your token
# HEROKU_APP_NAME - portfolio-v1
# HEROKU_EMAIL - Your email
```

#### Deploy
```bash
git push origin main
```

Workflow `.github/workflows/deploy-cloud.yml` handles deployment

### 5.2 Railway.app (Recommended Alternative)

#### Setup
1. Create account at https://railway.app
2. Connect GitHub repo
3. Create new service from GitHub
4. Select this repository
5. Deploy!

#### Live URL
```
https://portfolio-v1.railway.app/
```

### 5.3 AWS ECS (Enterprise)

#### Prerequisites
- AWS Account
- ECS Cluster created
- ECR Repository created

#### Setup
```bash
# Add GitHub Secrets:
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_ACCOUNT_ID
# AWS_REGION
# ECR_REPOSITORY_NAME
```

Create `task-definition.json`:
```json
{
  "family": "portfolio",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "portfolio",
      "image": "YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ]
    }
  ]
}
```

---

## 6. Docker Hub Registry

### Push Image to Docker Hub
```bash
# Login
docker login

# Build image
docker build -t yourusername/portfolio-v1:latest .

# Push
docker push yourusername/portfolio-v1:latest
```

### Add GitHub Secrets
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub token

Workflow automatically pushes on every push to main.

---

## Local Testing

### Test with Docker Locally
```bash
# Build image
docker build -t portfolio:latest .

# Run container
docker run -p 8080:80 portfolio:latest

# Or use docker-compose
docker-compose up -d

# Visit http://localhost:8080
```

### Test Build Locally
```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

---

## Environment Variables

If you need environment variables in production:

1. Create `.env.production` locally (don't commit)
2. Add to hosting platform's environment settings:
   - GitHub Secrets → Use in workflow
   - Cloudflare → Pages settings
   - VPS → Docker environment file
   - Heroku → Config vars
   - AWS → ECS task definition

---

## Monitoring & Logs

### GitHub Pages
- Settings → Pages → View deployment status

### Cloudflare Pages
- https://dash.cloudflare.com → Pages → Deployments

### VPS with Docker
```bash
ssh root@YOUR_VPS_IP
docker-compose logs -f
```

### Heroku
```bash
heroku logs --tail -a portfolio-v1
```

---

## Updating Your Portfolio

### Push Updates
```bash
git add .
git commit -m "Update: new features"
git push origin main
```

All configured workflows will automatically:
1. Build your app
2. Deploy to all enabled platforms
3. Update your live site within 1-5 minutes

---

## Rollback Deployment

### GitHub Pages
```bash
git revert HEAD
git push origin main
```

### Cloudflare Pages
- Dashboard → Pages → Select previous deployment → Rollback

### VPS
```bash
# SSH into VPS
docker-compose down
docker-compose up -d  # Runs previous image
```

---

## Tips & Best Practices

1. **Test locally first**: `npm run build && npm run preview`
2. **Use meaningful commits**: Makes rollbacks easier
3. **Monitor your site**: Set up uptime monitoring
4. **Keep secrets safe**: Never commit `.env` files
5. **Use CDN**: Cloudflare or Vercel for faster loads
6. **Enable HTTPS**: All platforms support it
7. **Backup your code**: Git is your backup
8. **Use domains**: Avoid relying on free subdomains

---

## Support & Troubleshooting

### Build Fails
- Check logs in Actions tab
- Verify `npm install` works locally
- Check for TypeScript errors: `npm run lint`

### Deploy Fails
- Verify secrets are correctly set
- Check workflow logs in Actions tab
- Test SSH/FTP credentials manually

### Site Not Loading
- Check domain DNS settings
- Verify build output in `dist/` folder
- Check security headers aren't blocking
- Clear browser cache

---

Need help with a specific platform? Check the official docs:
- GitHub Pages: https://docs.github.com/en/pages
- Cloudflare: https://developers.cloudflare.com/pages/
- Docker: https://docs.docker.com/
- Heroku: https://devcenter.heroku.com/
- Railway: https://docs.railway.app/
- AWS: https://docs.aws.amazon.com/
