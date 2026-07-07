# 📈 NeoTrade AI – Stock Market Trend Analysis Dashboard

An AI-powered stock market dashboard that provides real-time stock prices, market trends, company insights, and interactive visualizations. Built using **React.js**, **Firebase**, **Tailwind CSS**, and the **Finnhub API**, the application delivers a fast, responsive, and user-friendly experience for monitoring stock market performance.

🌐 **Live Demo:** https://neotrade-ai-26d0b.web.app

---

## 🚀 Features

- 🔐 Secure user authentication using Firebase Authentication
- 📊 Real-time stock price tracking and market updates
- 📈 Interactive charts and trend visualization
- 🔍 Search companies and view detailed stock information
- 📱 Responsive dashboard for desktop, tablet, and mobile
- ⚡ Fast loading and intuitive user interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS

### Backend & Cloud
- Firebase
- Firebase Authentication
- Firebase Hosting

### API
- Finnhub Stock Market API

---

## 📂 Project Structure

```
Neotrade-Dashboard/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── assets/
│   └── App.js
├── .firebase/
├── firebase.json
├── package.json
└── README.md
```

---

## 🏗️ Architecture

```
                User
                  │
                  ▼
         React Frontend
                  │
         Firebase Authentication
                  │
                  ▼
        Finnhub Stock Market API
                  │
                  ▼
          Firebase Hosting
```

---

## 📸 Screenshots

> Add your project screenshots inside an **assets/** folder.

### Login Page

![Login](assets/login.png)

### Dashboard

![Dashboard](assets/dashboard.png)

### Stock Search

![Search](assets/search.png)

### Market Trends

![Market](assets/market.png)

### Interactive Charts

![Charts](assets/chart.png)

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Priyard-15/Neotrade-Dashboard.git
```

### Navigate to the project

```bash
cd Neotrade-Dashboard
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## 💡 Future Enhancements

- 📈 Portfolio tracking
- ⭐ Watchlist functionality
- 📊 Advanced technical indicators
- 📰 AI-powered market news analysis
- 📧 Price alerts and notifications
- 🌙 Dark mode support

---

## 🎯 Skills Demonstrated

- Frontend Development
- React.js
- API Integration
- Firebase Authentication
- Responsive Web Design
- Data Visualization
- UI/UX Design
- Cloud Deployment
- State Management

---

## 👩‍💻 Author

**Priya Dharshini R**

- GitHub: https://github.com/Priyard-15
- LinkedIn: https://www.linkedin.com/in/priya-dharshini-805a03320/
- Email: priyadharshinird1415@gmail.com

---

## ⭐ If you like this project

If you found this project useful, consider giving it a ⭐ on GitHub.
Create a `.env` file when using live market quotes:

```bash
VITE_FINNHUB_API_KEY=your_api_key
```
