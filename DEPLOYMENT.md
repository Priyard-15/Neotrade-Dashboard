# Deployment Guide - NeoTrade Dashboard

This guide covers deploying the NeoTrade Dashboard to Render, Heroku, or AWS.

## Prerequisites

- Git repository pushed to GitHub
- `VITE_FINNHUB_API_KEY` (required for live stock data)
- `VITE_STARTUP_ANALYTICS_API_BASE_URL` (optional for startup analytics)
- Node.js 18+ and npm

---

## Option 1: Deploy to Render (Recommended)

### Steps

1. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `neotrade-dashboard`
   - Environment: `Node`
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm run preview`
   - Plan: Free (or Starter)

3. **Set Environment Variables**
   - `VITE_FINNHUB_API_KEY`: Your Finnhub API key
   - `VITE_STARTUP_ANALYTICS_API_BASE_URL`: Your API base URL (if applicable)

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy from your GitHub branch

> Note: For Firebase Hosting, the `VITE_FINNHUB_API_KEY` must be present during the build step, because Vite injects it into the generated static files.
> Build locally with `.env` configured, then run `npm run build` before `firebase deploy --only hosting`.

### View Live
- Your app will be available at: `https://neotrade-dashboard.onrender.com`

---

## Option 2: Deploy to Heroku

### Steps

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create neotrade-dashboard
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set VITE_FINNHUB_API_KEY=your_api_key
   heroku config:set VITE_STARTUP_ANALYTICS_API_BASE_URL=https://your-api.com
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### View Live
- Your app will be available at: `https://neotrade-dashboard.herokuapp.com`

### Using app.json for One-Click Deploy
- Push this repo to GitHub
- Click the "Deploy to Heroku" button (if configured) or use:
  ```bash
  heroku create --stack heroku-22
  git push heroku main
  ```

---

## Option 3: Deploy to AWS

### Option 3A: AWS S3 + CloudFront (Static Hosting)

1. **Build the App**
   ```bash
   npm run build
   ```

2. **Deploy Stack**
   ```bash
   aws cloudformation deploy \
     --template-file template.yaml \
     --stack-name neotrade-dashboard \
     --parameter-overrides \
       FinnhubApiKey=your_api_key \
       StartupAnalyticsUrl=https://your-api.com \
     --capabilities CAPABILITY_NAMED_IAM
   ```

3. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://neotrade-dashboard-${ACCOUNT_ID}/ --delete
   ```

### Option 3B: AWS EC2 (Full Server)

1. **Launch an EC2 Instance**
   - Ubuntu 22.04 LTS, t2.micro or t3.micro
   - Allow ports 80, 443, and 22

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update && sudo apt install -y nodejs npm nginx
   ```

4. **Clone and Build**
   ```bash
   git clone https://github.com/your-username/neotrade-dashboard.git
   cd neotrade-dashboard
   npm ci
   npm run build
   ```

5. **Serve with Nginx**
   ```bash
   sudo cp -r dist/* /var/www/html/
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

6. **Configure SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Option 4: Deploy with Docker

### Local Testing
```bash
docker-compose up --build
```

Access at `http://localhost:4173`

### Deploy to Docker Registry

1. **Build Image**
   ```bash
   docker build -t neotrade-dashboard:latest .
   ```

2. **Tag for Registry**
   ```bash
   docker tag neotrade-dashboard:latest your-registry/neotrade-dashboard:latest
   ```

3. **Push to Registry**
   ```bash
   docker push your-registry/neotrade-dashboard:latest
   ```

4. **Deploy to Container Service** (AWS ECS, Google Cloud Run, etc.)
   - Use the pushed image URL
   - Set environment variables for API keys

---

## Environment Variables

### Required
- `VITE_FINNHUB_API_KEY`: API key from [finnhub.io](https://finnhub.io)

### Optional
- `VITE_STARTUP_ANALYTICS_API_BASE_URL`: Your custom startup API endpoint

---

## CI/CD with GitHub Actions

The `.github/workflows/deploy.yml` file automates deployment:

1. **Linting**: `npm run lint`
2. **Building**: `npm run build`
3. **Deploy to Render**: Triggered on push to `main`

### To Enable
1. Add these secrets to your GitHub repository:
   - `VITE_FINNHUB_API_KEY`
   - `VITE_STARTUP_ANALYTICS_API_BASE_URL`
   - `RENDER_API_KEY` (from Render dashboard)
   - `RENDER_SERVICE_ID` (your Render service ID)

2. Push to main branch to trigger deployment

---

## Monitoring & Logs

### Render
- Dashboard: [render.com/dashboard](https://dashboard.render.com)
- Logs: View in service details

### Heroku
```bash
heroku logs --tail
```

### AWS CloudWatch
```bash
aws logs tail /aws/lambda/neotrade-dashboard --follow
```

---

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 18+)
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules package-lock.json && npm ci`

### API Key Errors
- Ensure `VITE_FINNHUB_API_KEY` is set as environment variable
- Verify API key is valid: `curl https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY`

### Startup Analytics Not Working
- Check `VITE_STARTUP_ANALYTICS_API_BASE_URL` is correct
- Verify backend API is running and accessible

### Firebase Auth Issues
- Ensure Firebase config is updated in `src/firebase.js`
- Verify CORS settings if using different domain

---

## Performance Tips

1. **Enable Gzip Compression** (Nginx/Heroku default)
2. **CloudFront Caching** (AWS): Set cache headers in `vite.config.js`
3. **Monitor Bundle Size**:
   ```bash
   npm run build
   npm install -g https://github.com/btakita/vite-plugin-visualizer
   ```

---

## Support

- Render Docs: https://render.com/docs
- Heroku Docs: https://devcenter.heroku.com
- AWS Docs: https://docs.aws.amazon.com
- Finnhub API: https://finnhub.io/docs/api
