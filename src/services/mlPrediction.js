/**
 * ML Prediction Service
 * Uses simple statistical models to forecast next day's trend
 */

/**
 * Calculate simple exponential smoothing prediction
 * @param {number[]} prices - historical prices
 * @param {number} alpha - smoothing factor (0-1)
 * @returns {object} - prediction with confidence
 */
export function predictTrendExponentialSmoothing(prices, alpha = 0.3) {
  if (!prices || prices.length < 2) {
    return { prediction: 0, confidence: 0, method: "insufficient-data" }
  }

  let smoothedValue = prices[0]
  for (let i = 1; i < prices.length; i++) {
    smoothedValue = alpha * prices[i] + (1 - alpha) * smoothedValue
  }

  const lastPrice = prices[prices.length - 1]
  const prevPrice = prices[prices.length - 2]
  const momentum = ((lastPrice - prevPrice) / prevPrice) * 100

  // Simple trend continuation with dampening
  const predictedChange = momentum * 0.6
  const confidence = Math.min(100, (prices.length / 30) * 100)

  return {
    prediction: predictedChange,
    confidence: Math.round(confidence),
    method: "exponential-smoothing",
    direction: predictedChange > 0.5 ? "bullish" : predictedChange < -0.5 ? "bearish" : "neutral",
  }
}

/**
 * Linear regression based trend prediction
 * @param {number[]} prices - historical prices
 * @returns {object} - prediction with slope and confidence
 */
export function predictTrendLinearRegression(prices) {
  if (!prices || prices.length < 2) {
    return { prediction: 0, confidence: 0, method: "insufficient-data" }
  }

  const n = prices.length
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0

  for (let i = 0; i < n; i++) {
    sumX += i
    sumY += prices[i]
    sumXY += i * prices[i]
    sumX2 += i * i
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  // Calculate R-squared for confidence
  const yMean = sumY / n
  let ssRes = 0, ssTot = 0
  for (let i = 0; i < n; i++) {
    const yPred = intercept + slope * i
    ssRes += (prices[i] - yPred) ** 2
    ssTot += (prices[i] - yMean) ** 2
  }

  const rSquared = 1 - (ssRes / ssTot)
  const confidence = Math.max(0, Math.min(100, rSquared * 100))

  // Predict next value (day n)
  const nextValue = intercept + slope * n
  const currentPrice = prices[prices.length - 1]
  const predictedChange = ((nextValue - currentPrice) / currentPrice) * 100

  return {
    prediction: predictedChange,
    confidence: Math.round(confidence),
    method: "linear-regression",
    direction: predictedChange > 0.5 ? "bullish" : predictedChange < -0.5 ? "bearish" : "neutral",
    rSquared: Math.round(rSquared * 100),
  }
}

/**
 * Moving average convergence divergence (MACD)-inspired predictor
 * @param {number[]} prices - historical prices
 * @returns {object} - MACD signal and prediction
 */
export function predictTrendMACD(prices) {
  if (!prices || prices.length < 26) {
    return { prediction: 0, confidence: 0, method: "insufficient-data" }
  }

  // EMA calculation helper
  const ema = (data, period) => {
    const k = 2 / (period + 1)
    let emaValue = data[0]
    const result = [emaValue]
    for (let i = 1; i < data.length; i++) {
      emaValue = data[i] * k + emaValue * (1 - k)
      result.push(emaValue)
    }
    return result
  }

  const ema12 = ema(prices, 12)
  const ema26 = ema(prices, 26)
  const macdLine = ema12.map((v, i) => v - ema26[i])
  const signal = ema(macdLine, 9)

  const currentMACD = macdLine[macdLine.length - 1]
  const currentSignal = signal[signal.length - 1]
  const histogram = currentMACD - currentSignal

  const confidence = Math.min(100, (Math.abs(histogram) / prices[prices.length - 1]) * 500)

  return {
    prediction: histogram > 0 ? 1.5 : -1.5,
    confidence: Math.round(Math.min(100, confidence)),
    method: "macd",
    direction: histogram > 0 ? "bullish" : histogram < 0 ? "bearish" : "neutral",
    histogram: Math.round(histogram * 100) / 100,
  }
}

/**
 * Ensemble prediction combining multiple models
 * @param {number[]} prices - historical prices
 * @returns {object} - ensemble prediction
 */
export function predictTrendEnsemble(prices) {
  const expSmoothing = predictTrendExponentialSmoothing(prices)
  const linReg = predictTrendLinearRegression(prices)
  const macd = predictTrendMACD(prices)

  // Weight predictions by confidence
  const totalConfidence = expSmoothing.confidence + linReg.confidence + macd.confidence
  const avgPrediction =
    (expSmoothing.prediction * expSmoothing.confidence +
      linReg.prediction * linReg.confidence +
      macd.prediction * macd.confidence) /
    (totalConfidence || 1)

  const avgConfidence = Math.round(totalConfidence / 3)

  return {
    prediction: Math.round(avgPrediction * 100) / 100,
    confidence: Math.min(100, avgConfidence),
    method: "ensemble",
    direction: avgPrediction > 0.5 ? "bullish" : avgPrediction < -0.5 ? "bearish" : "neutral",
    models: {
      expSmoothing: expSmoothing.prediction,
      linearRegression: linReg.prediction,
      macd: macd.prediction,
    },
  }
}
