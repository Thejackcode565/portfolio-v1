# VPS with Docker Deployment Guide

Deploy your portfolio on a VPS with full control using Docker and automated CI/CD.

## Why VPS with Docker?

✅ **Full Control** - Own your infrastructure  
✅ **Custom Domain** - Use any domain you own  
✅ **Scalable** - Handle any traffic volume  
✅ **Fast** - Direct server, no CDN limits  
✅ **Auto-Deploy** - GitHub Actions triggers deployment  

## Prerequisites

- VPS account (DigitalOcean, Linode, AWS EC2, Hetzner, etc.)
- Domain name (optional, can use VPS IP)
- SSH key for VPS access
- Docker pre-installed on VPS

## Setup Steps

### Step 1: Choose a VPS Provider

Popular options:
- **DigitalOcean** - $5/month droplets, easy setup
- **Linode** - $5/month Nanode, reliable
- **AWS EC2** - Free tier available, scalable
- **Hetzner** - $3.29/month, good performance
- **Vultr** - $2.50/month, global locations

### Step 2: Launch Ubuntu VPS

Most providers offer Ubuntu 22.04 LTS - recommended for stability.

After launch:
1. SSH into your VPS
2. Update system: `sudo apt update && sudo apt upgrade -y`
3. Install Docker: `curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh`
4. Add your user to docker group: `sudo usermod -aG docker $USER`

### Step 3: Set Up GitHub Secrets

Configure automated deployment:

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

```
VPS_HOST       = Your VPS IP address (e.g., 123.45.67.89)
VPS_USERNAME   = SSH user (usually 'root' or 'ubuntu')
VPS_SSH_KEY    = Your private SSH key
VPS_PORT       = SSH port (default 22)
```

**How to get your SSH key:**
- Check your VPS provider's dashboard for the private key
- Or generate one: `ssh-keygen -t rsa -b 4096`

### Step 4: Configure Deployment Directory

SSH into your VPS and create deployment directory:

```bash
# SSH into VPS
ssh root@YOUR_VPS_IP

# Create app directory
mkdir -p /app/portfolio
cd /app/portfolio

# Exit VPS
exit
```

### Step 5: Deploy Automatically

The GitHub Actions workflow (`.github/workflows/deploy-vps.yml`) will:

1. Build Docker image
2. SSH into your VPS
3. Pull latest code
4. Rebuild Docker container
5. Deploy with zero downtime

Just push to GitHub:
```bash
git add .
git commit -m "Update: your changes"
git push origin main
```

The workflow will automatically deploy in 2-5 minutes!

### Step 6: Connect Your Domain (Optional)

If you have a domain:

1. Update DNS records to point to your VPS IP
2. Set up SSL with Let's Encrypt (nginx handles this in the container)
3. Update your portfolio URL

## Docker Configuration Files

These are pre-configured for you:

**Dockerfile** - Container image
- Uses Node.js 18 for build
- Serves with Nginx for production

**docker-compose.yml** - Local testing
```bash
docker-compose up
# Visit http://localhost:3000
```

**nginx.conf** - Web server configuration
- Production-ready settings
- Compression enabled
- Security headers configured

## Manual Deployment

To deploy without CI/CD:

```bash
# On your VPS
ssh root@YOUR_VPS_IP
cd /app/portfolio

# Clone/pull latest code
git clone https://github.com/YOUR_USERNAME/portfolio-v1.git .
# OR if already cloned: git pull origin main

# Build and run
docker build -t portfolio .
docker run -d -p 80:3000 --name portfolio portfolio

# Check if running
docker ps
```

## Monitoring & Maintenance

```bash
# SSH into VPS
ssh root@YOUR_VPS_IP

# Check container status
docker ps

# View logs
docker logs portfolio

# Restart container
docker restart portfolio

# Stop container
docker stop portfolio

# Remove old containers
docker rm portfolio
```

## SSL Certificate (HTTPS)

The nginx configuration includes SSL support. For Let's Encrypt:

1. Install certbot on your VPS:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. Get certificate:
   ```bash
   sudo certbot certonly --nginx -d your-domain.com
   ```

3. Update nginx.conf with certificate paths and rebuild

## Troubleshooting

### Connection Refused
- Verify VPS is running and accessible
- Check SSH key permissions: `chmod 600 private_key`
- Ensure port 22 (SSH) is not blocked

### Build Fails
- SSH into VPS and check Docker logs: `docker logs portfolio`
- Run `npm install` locally to verify dependencies
- Check `npm run build` works locally

### High CPU/Memory Usage
- Container might be restarting
- Check logs: `docker logs portfolio`
- Increase VPS size if needed

### Cannot Access Site
- Verify port 80 is open in VPS firewall
- Check nginx is running: `docker logs portfolio`
- Verify DNS propagation for custom domain

## Performance Tuning

For better performance:
- Enable gzip compression (enabled by default)
- Use CDN like Cloudflare in front of VPS
- Optimize Docker image size
- Use multi-stage builds (already configured)

## More Resources

- [Docker Docs](https://docs.docker.com/)
- [Nginx Docs](https://nginx.org/en/docs/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
