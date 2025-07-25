# Complete Manual for Setting Up Nech Mě Růst Website with Custom Domain

## Table of Contents
1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Step-by-Step - Deployment on Lovable](#step-by-step---deployment-on-lovable)
4. [Connecting Custom Domain](#connecting-custom-domain)
5. [Alternative Deployment](#alternative-deployment)
6. [Maintenance and Updates](#maintenance-and-updates)
7. [Troubleshooting](#troubleshooting)
8. [Support](#support)

## Project Overview

Your Nech Mě Růst website is built with modern technologies:
- **React 18** - For interactive user interface
- **TypeScript** - For safe and maintainable code
- **Tailwind CSS** - For beautiful and responsive design
- **Vite** - For fast development and build
- **React Big Calendar** - For functional event calendar
- **React i18next** - For bilingual support (Czech/English)

### Website Features:
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌍 Bilingual support (Czech/English)
- 📅 Interactive event calendar with registration
- 📧 Contact forms
- 🎨 Nature-inspired design with forest and growth themes
- ⚡ Fast loading and modern user experience

## Requirements

### For Lovable deployment (recommended):
- Account on [Lovable.dev](https://lovable.dev)
- Custom domain (optional)
- Basic knowledge of domain management

### For self-hosting:
- Node.js version 18 or higher
- npm or yarn
- Web hosting supporting static files
- Basic command line knowledge

## Step-by-Step - Deployment on Lovable

### 1. Publishing on Lovable (easiest method)

1. **Open your Lovable project**
   - Go to [https://lovable.dev/projects/6c9b4385-07c7-43b9-9d56-2d4ce4314035](https://lovable.dev/projects/6c9b4385-07c7-43b9-9d56-2d4ce4314035)

2. **Publish the website**
   - Click the "Share" button in the top right corner
   - Select "Publish"
   - Your website will be available at: `https://your-project.lovable.app`

3. **Verify functionality**
   - Open the published URL
   - Verify all sections work correctly
   - Test language switching
   - Test the event calendar
   - Try the contact forms

### 2. Basic Configuration

After publishing, check:
- ✅ Responsive design on all devices
- ✅ Calendar functionality
- ✅ Language switching
- ✅ Contact forms
- ✅ Loading speed

## Connecting Custom Domain

### Step 1: Acquiring a Domain
1. Register a domain with a registrar (e.g. GoDaddy, Namecheap, Cloudflare)
2. Recommended domain: `nechmerust.org` or `nechmerust.com`

### Step 2: Connecting Domain in Lovable

1. **Go to project settings**
   - In your Lovable project, click "Settings"
   - Select the "Domains" tab

2. **Add domain**
   - Click "Connect Domain"
   - Enter your domain (e.g. `nechmerust.org`)
   - Lovable will provide DNS records for configuration

### Step 3: DNS Configuration at Registrar

**IMPORTANT:** Configure these records at your domain registrar.

Add the following DNS records:

#### A Records (for root domain):
```
Type: A
Name: @
Value: 185.158.133.1
TTL: 3600
```

#### A Records (for www subdomain):
```
Type: A
Name: www
Value: 185.158.133.1
TTL: 3600
```

#### Examples for common registrars:

**GoDaddy:**
1. Sign in to your account
2. Go to DNS Management
3. Add A records as specified above

**Namecheap:**
1. Sign in to your account
2. Domain List → Manage → Advanced DNS
3. Add new A records

**Cloudflare:**
1. Sign in to your account
2. DNS → Records
3. Add A records (ensure proxy is disabled for initial setup)

### Step 4: Verification and Propagation Wait

1. **DNS Propagation**
   - DNS changes can take 24-48 hours
   - You can check status at [DNSChecker.org](https://dnschecker.org)

2. **SSL Certificate**
   - Lovable will automatically generate SSL certificate
   - Your website will be accessible via HTTPS

3. **Final Verification**
   - Try visiting your domain
   - Verify both `http://yourdomain.com` and `http://www.yourdomain.com` work
   - Check that the site automatically redirects to HTTPS

## Alternative Deployment

### Self-Hosting (Advanced)

If you want to host the website yourself:

#### 1. Download Code
```bash
# Export project to GitHub via Lovable
# Then clone the repository
git clone YOUR_GITHUB_URL
cd your-project-name
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Build for Production
```bash
npm run build
```

#### 4. Upload to Hosting
- Upload the contents of `dist/` folder to your web hosting
- Ensure it's configured for Single Page Application (SPA)

#### 5. Server Configuration
Add `.htaccess` file (for Apache) or nginx configuration for proper React router functionality.

**Example .htaccess:**
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Hosting on Netlify/Vercel

#### Netlify:
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add redirects for SPA

#### Vercel:
1. Import from GitHub
2. Framework Preset: Vite
3. Automatic deployment on push

## Maintenance and Updates

### Content Updates
1. **Texts and translations**: Edit files in `src/i18n/locales/`
2. **Events**: Update data in `src/components/Events.tsx`
3. **Contact information**: Edit in `src/components/Contact.tsx`
4. **Colors and design**: Edit in `src/index.css` and `tailwind.config.ts`

### Regular Maintenance
- Check form functionality
- Update events in calendar
- Backup important data
- Monitor website performance

### Security Updates
- Regularly update dependencies: `npm update`
- Monitor security alerts
- Always use HTTPS

## Troubleshooting

### Common Issues and Solutions:

#### 1. Domain Not Propagating
- **Issue**: Domain doesn't point to correct website
- **Solution**: 
  - Check DNS records at registrar
  - Wait up to 48 hours for propagation
  - Use [DNSChecker.org](https://dnschecker.org) for verification

#### 2. SSL Certificate Not Working
- **Issue**: Website shows "insecure connection"
- **Solution**:
  - Wait 24 hours after DNS setup
  - Check that A records point correctly
  - Contact Lovable support

#### 3. Calendar Not Loading
- **Issue**: Event calendar is empty
- **Solution**:
  - Check browser console (F12)
  - Verify internet connection
  - Refresh the page

#### 4. Translations Not Working
- **Issue**: Language switching doesn't work
- **Solution**:
  - Clear browser cache
  - Check that all language files are correct

#### 5. Forms Not Submitting
- **Issue**: Contact form doesn't send messages
- **Solution**:
  - Implement backend for form processing
  - Or use services like Formspree, Netlify Forms

### Troubleshooting Checklist:
- [ ] Clear browser cache
- [ ] Check console (F12) for errors
- [ ] Verify DNS records
- [ ] Try different browser
- [ ] Check mobile version
- [ ] Test different website sections

## Advanced Features

### Backend System Integration
- **Newsletter**: Integration with MailChimp or ConvertKit
- **Payments**: Add PayPal or Stripe for event payments
- **CMS**: Connect Strapi or Sanity for easy content management
- **Analytics**: Google Analytics 4 for visitor tracking

### SEO Optimization
- Add meta tags for better Google visibility
- Structured data for events
- Sitemap.xml for search engines
- Open Graph tags for social media

### Performance
- Image optimization
- Lazy loading for faster loading
- CDN for global speed
- Performance monitoring

## Support

### Lovable Support
- **Documentation**: [docs.lovable.dev](https://docs.lovable.dev)
- **Discord Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Email Support**: Available on Lovable website

### Technical Website Support
For technical questions about your website, contact the developer or use:
- GitHub Issues (if you have a repository)
- React, Tailwind CSS documentation
- Stack Overflow for programming questions

### Recommended Resources
- **React Documentation**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **TypeScript**: [typescriptlang.org](https://typescriptlang.org)

---

## Conclusion

This manual will guide you through the entire process of setting up the Nech Mě Růst website. The website is designed to be easily maintainable and extensible.

**Tip**: Start with publishing on Lovable and later optionally move to self-hosting if you need more advanced features.

Your website is ready to grow together with your organization! 🌱

---

*Created with love for nature and technology • © 2025 Nech Mě Růst*