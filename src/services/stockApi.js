import axios from "axios"

const finnhubClient = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  timeout: 8000,
})

export function hasMarketApiKey(){
  return Boolean(import.meta.env.VITE_FINNHUB_API_KEY)
}

export async function fetchStockQuote(symbol){
  const token = import.meta.env.VITE_FINNHUB_API_KEY

  if(!token){
    return null
  }

  const response = await finnhubClient.get("/quote", {
    params: {
      symbol,
      token,
    },
  })

  return response.data
}

export async function fetchStockQuotes(symbols){
  const results = await Promise.allSettled(
    symbols.map(async(symbol) => {
      const quote = await fetchStockQuote(symbol)

      return [symbol, quote]
    })
  )
  const quotes = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
  const failedCount = results.filter((result) => result.status === "rejected").length
  const rateLimited = results.some((result) => (
    result.status === "rejected" && result.reason?.response?.status === 429
  ))

  return {
    failedCount,
    quotes: Object.fromEntries(quotes.filter(([, quote]) => quote?.c)),
    rateLimited,
  }
}

export async function fetchMarketNews(){
  const token = import.meta.env.VITE_FINNHUB_API_KEY

  if(!token){
    return []
  }

  const response = await finnhubClient.get("/news", {
    params: {
      category: "general",
      token,
    },
  })

  return response.data.slice(0, 5).map((item) => ({
    id: item.id,
    source: item.source,
    time: new Date(item.datetime * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    title: item.headline,
  }))
}

export async function fetchStockCandles(symbol){
  const token = import.meta.env.VITE_FINNHUB_API_KEY

  if(!token){
    return []
  }

  const now = Math.floor(Date.now() / 1000)
  const sevenDaysAgo = now - 7 * 24 * 60 * 60
  const response = await finnhubClient.get("/stock/candle", {
    params: {
      symbol,
      resolution: "D",
      from: sevenDaysAgo,
      to: now,
      token,
    },
  })

  if(response.data.s !== "ok"){
    return []
  }

  return response.data.c.slice(-5).map((price, index) => ({
    day: new Date(response.data.t.slice(-5)[index] * 1000).toLocaleDateString([], {
      weekday: "short",
    }),
    price,
  }))
}
