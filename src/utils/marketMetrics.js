export function formatCurrency(value, options = {}){
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "USD",
    ...options,
  })
}

export function getPrediction(change){
  if(change >= 1.5){
    return "Bullish Trend"
  }

  if(change <= -0.5){
    return "Bearish Trend"
  }

  return "Neutral Trend"
}

export function getPredictionTone(prediction){
  if(prediction === "Bullish Trend"){
    return "text-emerald-300"
  }

  if(prediction === "Bearish Trend"){
    return "text-rose-300"
  }

  return "text-amber-200"
}

export function getRiskProfile(stock){
  const prices = stock.history.map((item) => item.price)
  const high = Math.max(...prices)
  const low = Math.min(...prices)
  const volatility = Number((((high - low) / stock.price) * 100).toFixed(1))
  const momentum = Number((stock.history.at(-1).price - stock.history[0].price).toFixed(2))
  const target = Number((stock.price * (1 + (stock.aiScore - 50) / 1000)).toFixed(2))
  const stopLoss = Number((stock.price * (1 - Math.max(volatility, 3) / 100)).toFixed(2))
  const level = volatility >= 7 ? "High" : volatility >= 4 ? "Medium" : "Low"

  return {
    high,
    low,
    level,
    momentum,
    stopLoss,
    target,
    volatility,
  }
}

export function getTechnicalSignal(stock){
  const prices = stock.history.map((item) => item.price)
  const firstPrice = prices[0]
  const lastPrice = prices.at(-1)
  const recentAverage = prices.slice(-3).reduce((total, price) => total + price, 0) / 3
  const baseAverage = prices.slice(0, 3).reduce((total, price) => total + price, 0) / 3
  const momentum = Number((((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2))
  const averageBreakout = Number((((recentAverage - baseAverage) / baseAverage) * 100).toFixed(2))
  const peak = Math.max(...prices)
  const drawdown = Number((((peak - lastPrice) / peak) * 100).toFixed(2))
  const gains = prices.slice(1).reduce((total, price, index) => {
    const difference = price - prices[index]
    return total + Math.max(difference, 0)
  }, 0)
  const losses = prices.slice(1).reduce((total, price, index) => {
    const difference = price - prices[index]
    return total + Math.abs(Math.min(difference, 0))
  }, 0)
  const relativeStrength = losses === 0 ? 100 : 100 - (100 / (1 + gains / losses))
  const confidence = Math.min(
    98,
    Math.max(45, Math.round(stock.aiScore + averageBreakout * 2 - drawdown))
  )
  const action = confidence >= 78 && momentum > 0
    ? "Accumulate"
    : confidence <= 58 || momentum < -1
      ? "Protect capital"
      : "Hold and watch"

  return {
    action,
    averageBreakout,
    confidence,
    drawdown,
    momentum,
    relativeStrength: Math.round(relativeStrength),
  }
}

export function getMarketMood(stocks){
  const positiveCount = stocks.filter((stock) => stock.change >= 0).length
  const averageAiScore = Math.round(
    stocks.reduce((total, stock) => total + stock.aiScore, 0) / stocks.length
  )
  const averageChange = Number(
    (stocks.reduce((total, stock) => total + stock.change, 0) / stocks.length).toFixed(2)
  )
  const label = averageChange >= 1.5
    ? "Risk-on"
    : averageChange < 0
      ? "Defensive"
      : "Selective"

  return {
    averageAiScore,
    averageChange,
    label,
    positiveCount,
  }
}

export function getSectorAllocation(stocks){
  const totals = stocks.reduce((accumulator, stock) => {
    const value = stock.price * stock.holdings
    accumulator[stock.sector] = (accumulator[stock.sector] || 0) + value
    return accumulator
  }, {})
  const totalValue = Object.values(totals).reduce((total, value) => total + value, 0)

  return Object.entries(totals).map(([sector, value]) => ({
    sector,
    value,
    weight: totalValue ? Math.round((value / totalValue) * 100) : 0,
  }))
}

export function getPortfolioDiagnostics(stocks){
  const totalValue = stocks.reduce((total, stock) => total + stock.price * stock.holdings, 0)
  const weightedAiScore = totalValue
    ? Math.round(stocks.reduce((total, stock) => {
      const value = stock.price * stock.holdings
      return total + stock.aiScore * (value / totalValue)
    }, 0))
    : 0
  const positions = stocks.map((stock) => {
    const value = stock.price * stock.holdings

    return {
      ...stock,
      value,
      weight: totalValue ? Math.round((value / totalValue) * 100) : 0,
    }
  }).toSorted((first, second) => second.weight - first.weight)
  const topHolding = positions[0]
  const concentrationRisk = topHolding?.weight >= 45
    ? "High"
    : topHolding?.weight >= 30
      ? "Medium"
      : "Balanced"
  const diversificationScore = Math.max(35, Math.min(100, 100 - (topHolding?.weight || 0) + stocks.length * 4))
  const rebalanceActions = positions.slice(0, 3).map((stock) => {
    if(stock.weight > 38){
      return `Trim ${stock.symbol} below 35% to reduce concentration risk`
    }

    if(stock.aiScore >= 85 && stock.change >= 0){
      return `Keep ${stock.symbol} as a high-conviction momentum position`
    }

    if(stock.change < 0){
      return `Review ${stock.symbol} stop-loss before adding exposure`
    }

    return `Hold ${stock.symbol} and monitor next trend confirmation`
  })

  return {
    concentrationRisk,
    diversificationScore,
    rebalanceActions,
    topHolding,
    weightedAiScore,
  }
}
