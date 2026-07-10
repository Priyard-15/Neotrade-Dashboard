# NeoTrade AI

NeoTrade AI is a placement-ready stock trend analysis workspace built with React, Tailwind CSS, Firebase Authentication, Recharts, and a Finnhub-ready quote service.

## Highlights

- Firebase login and registration flow
- Searchable stock universe with sector filters and smart sorting
- Live quote integration when `VITE_FINNHUB_API_KEY` is configured
- **ML Prediction Engine**: Ensemble model (exponential smoothing, linear regression, MACD) forecasting next-day trends with confidence scores
- **Anomaly Detection**: Real-time alerts for unusual price patterns, volume spikes, gaps, and reversal signals
- Explainable trend engine with momentum, drawdown, relative-strength, and confidence scoring
- Portfolio diagnostics with weighted AI score, concentration risk, diversification score, and rebalance actions
- Watchlist, smart alerts, stock comparison, sector allocation, and market news panels
- **Startup Analytics Integration**: Connect non-stock business data via API for KPI analysis

## Resume Pitch

Built an authenticated financial analytics dashboard that combines market data, technical indicators, portfolio risk diagnostics, and explainable decision recommendations in a responsive React interface.

## Tech Stack

- React 19 and Vite
- Tailwind CSS
- Firebase Authentication
- Recharts
- Axios
- Finnhub API integration
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

Create a `.env` file when using live market quotes or startup analytics:

```bash
VITE_FINNHUB_API_KEY=your_api_key
VITE_STARTUP_ANALYTICS_API_BASE_URL=https://your-startup-api.example.com
```

- `VITE_FINNHUB_API_KEY` enables live stock quote data.
- `VITE_STARTUP_ANALYTICS_API_BASE_URL` enables the startup analytics connection.

## Deployment

Deploy to **Render**, **Heroku**, or **AWS** with one click:

- **Render**: Connect GitHub repo → auto-deploy on push
- **Heroku**: Use `app.json` or CLI (`heroku create && git push heroku main`)
- **AWS**: Use CloudFormation template (`template.yaml`) for S3 + CloudFront hosting
- **Docker**: `docker-compose up` for local testing or push to any container registry

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step instructions.

## Features

### ML Prediction
Ensemble model combining exponential smoothing, linear regression, and MACD for next-day trend forecasting with confidence scores.

### Anomaly Detection
Statistical and pattern-based detection of:
- Extreme price movements (>5% daily change)
- Volume spikes (>100% increase)
- Opening gaps (>2% deviation)
- Range expansions (wider than 2x average)
- Reversal patterns (V-recovery, support plateaus, resistance rejection)

### Startup Analytics
Connect non-stock business data sources for KPI analysis:
- Sales and revenue trends
- Inventory levels
- Customer metrics
- Custom business data
