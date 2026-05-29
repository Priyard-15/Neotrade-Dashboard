# NeoTrade AI

NeoTrade AI is a placement-ready stock trend analysis workspace built with React, Tailwind CSS, Firebase Authentication, Recharts, and a Finnhub-ready quote service.

## Highlights

- Firebase login and registration flow
- Searchable stock universe with sector filters and smart sorting
- Live quote integration when `VITE_FINNHUB_API_KEY` is configured
- Explainable trend engine with momentum, drawdown, relative-strength, and confidence scoring
- Portfolio diagnostics with weighted AI score, concentration risk, diversification score, and rebalance actions
- Watchlist, smart alerts, stock comparison, sector allocation, and market news panels

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

Create a `.env` file when using live market quotes:

```bash
VITE_FINNHUB_API_KEY=your_api_key
```
