# Traditional Web Hosting Deployment Guide

Deploy your portfolio on traditional web hosting (cPanel/Plesk) using automated CI/CD.

## Why Traditional Web Hosting?

✅ **Affordable** - $5-15/month  
✅ **Easy** - cPanel/Plesk dashboard  
✅ **Reliable** - Mature hosting infrastructure  
✅ **Support** - 24/7 hosting provider support  
✅ **Auto-Deploy** - GitHub Actions triggers deployment  

## Popular Providers

- **GoDaddy** - Popular, good pricing
- **Namecheap** - Affordable, solid support
- **Hostinger** - Fast, good uptime
- **Bluehost** - WordPress-optimized
- **A2 Hosting** - Performance-focused
- **SiteGround** - Premium quality

## Prerequisites

- Web hosting account with cPanel/Plesk
- FTP access credentials
- SSH access (optional but recommended)
- Domain name connected to hosting

## Setup Steps

### Step 1: Choose & Purchase Hosting

1. Select a hosting provider (see list above)
2. Purchase a plan (usually includes domain)
3. Complete setup and receive credentials via email

### Step 2: Get FTP Credentials

In your hosting control panel:

1. Go to **FTP Accounts** or **File Manager**
2. Create FTP account or find existing credentials:
   - FTP Host/Server
   - FTP Username
   - FTP Password
   - FTP Port (usually 21)

You'll use these for GitHub Actions.

### Step 3: Set Up GitHub Secrets

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

```
HOSTING_FTP_SERVER   = ftp.yourhosting.com
HOSTING_FTP_USERNAME = your_ftp_username
HOSTING_FTP_PASSWORD = your_ftp_password
HOSTING_FTP_PORT     = 21
HOSTING_FTP_PATH     = /public_html  (or /home/username/public_html)
```

### Step 4: Verify Build Settings

The workflow builds your portfolio and uploads to hosting.

No additional configuration needed - the workflow handles:
- Installing dependencies
- Building with Vite
- Uploading dist/ to public_html

### Step 5: Deploy

Push to GitHub to trigger automatic deployment:

```bash
git add .
git commit -m "Update: your changes"
git push origin main
```

The workflow will:
1. Build your portfolio
2. Connect via FTP
3. Upload files to public_html
4. Deploy complete (usually 3-5 minutes)

### Step 6: Access Your Site

Your domain will automatically serve the uploaded files:

```
https://your-domain.com
```

## Manual Deployment (Without CI/CD)

If you prefer to upload manually:

1. **Build locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Connect via FTP:**
   - Use FileZilla, WinSCP, or hosting's File Manager
   - Connect with credentials from Step 2

3. **Upload dist/ folder:**
   - Delete old files in `/public_html`
   - Upload all files from `dist/` folder
   - Maintain folder structure

4. **Verify:**
   - Visit your domain
   - Check console for errors (F12)

## Using cPanel File Manager

Alternative to FTP:

1. Log into cPanel
2. Go to **File Manager**
3. Navigate to **public_html**
4. Delete old files
5. Upload `dist/` folder contents
6. Set permissions to 644 for files, 755 for folders

## SSL Certificate (HTTPS)

Most hosting includes free Let's Encrypt SSL:

1. In cPanel → **SSL/TLS**
2. Click **Manage SSL sites**
3. Select your domain
4. Install certificate (usually auto-installed)
5. Access your site with `https://`

## SPA Routing Configuration

Important for client-side routing to work:

Your hosting needs `.htaccess` file (usually pre-configured):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This is already included in the workflow - no action needed.

## Troubleshooting

### Build Fails
- Check Action logs in GitHub
- Verify `npm run build` works locally
- Ensure all dependencies in package.json

### FTP Connection Fails
- Verify FTP credentials are correct
- Check FTP port (usually 21, sometimes 22 for SFTP)
- Ensure firewall allows FTP connections
- Try different FTP client (FileZilla, WinSCP)

### Site Shows 404
- Verify files uploaded to correct directory (`/public_html`)
- Check .htaccess exists and is readable
- Verify permissions (644 for files, 755 for dirs)
- Clear browser cache

### HTTPS Not Working
- In cPanel, verify SSL certificate is installed
- Wait up to 24 hours for DNS propagation
- Check certificate in browser (may take time to activate)

### Site Very Slow
- Check hosting CPU/memory limits
- Reduce image sizes
- Enable gzip compression (usually pre-enabled)
- Consider upgrading hosting plan
- Try CDN like Cloudflare in front

## Performance Tips

1. **Enable Gzip:** Usually enabled by default
2. **Browser Caching:** Add to `.htaccess`:
   ```apache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType text/html "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType image/* "access plus 1 year"
   </IfModule>
   ```

3. **Use CDN:** Put Cloudflare in front for free CDN + caching

## More Resources

- [Hosting cPanel Tutorials](https://documentation.cpanel.net/)
- [FTP Upload Guide](https://docs.cpanel.net/cpanel/file-manager/)
- [.htaccess Guide](https://httpd.apache.org/docs/2.4/howto/htaccess.html)
