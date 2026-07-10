/**
 * Anomaly Detection Service
 * Detects unusual price patterns and trading activity
 */

/**
 * Detect anomalies using statistical z-score method
 * @param {number[]} prices - historical prices
 * @param {number} threshold - z-score threshold (default 2 = 95% confidence)
 * @returns {object} - anomaly detection results
 */
export function detectAnomaliesZScore(prices, threshold = 2) {
  if (!prices || prices.length < 3) {
    return { anomalies: [], score: 0, method: "insufficient-data" }
  }

  // Calculate price changes
  const changes = []
  for (let i = 1; i < prices.length; i++) {
    changes.push(((prices[i] - prices[i - 1]) / prices[i - 1]) * 100)
  }

  // Calculate mean and standard deviation
  const mean = changes.reduce((a, b) => a + b, 0) / changes.length
  const variance = changes.reduce((a, b) => a + (b - mean) ** 2, 0) / changes.length
  const stdDev = Math.sqrt(variance)

  // Find anomalies
  const anomalies = []
  changes.forEach((change, index) => {
    if (stdDev > 0) {
      const zScore = (change - mean) / stdDev
      if (Math.abs(zScore) > threshold) {
        anomalies.push({
          day: index + 1,
          price: prices[index + 1],
          change: Math.round(change * 100) / 100,
          zScore: Math.round(zScore * 100) / 100,
          severity: Math.abs(zScore) > 3 ? "high" : "medium",
        })
      }
    }
  })

  return {
    anomalies,
    method: "z-score",
    score: Math.min(100, Math.round((anomalies.length / Math.max(changes.length, 1)) * 100)),
    mean: Math.round(mean * 100) / 100,
    stdDev: Math.round(stdDev * 100) / 100,
  }
}

/**
 * Detect anomalies using Isolation Forest concept (simplified)
 * Identifies extreme values in multiple dimensions
 * @param {number[]} prices - historical prices
 * @param {object} quote - current quote data
 * @returns {object} - anomaly flags
 */
export function detectAnomaliesMultivariate(prices, quote) {
  if (!prices || prices.length < 5) {
    return { anomalies: [], riskScore: 0 }
  }

  const anomalies = []
  const riskFactors = []

  // 1. Extreme price movement
  const lastPrice = prices[prices.length - 1]
  const prevPrice = prices[prices.length - 2]
  const dailyChange = ((lastPrice - prevPrice) / prevPrice) * 100

  if (Math.abs(dailyChange) > 5) {
    anomalies.push({
      type: "extreme-movement",
      severity: Math.abs(dailyChange) > 10 ? "high" : "medium",
      value: `${Math.round(dailyChange * 100) / 100}% change`,
      description: "Unusual price swing detected",
    })
    riskFactors.push(Math.abs(dailyChange) > 10 ? 3 : 2)
  }

  // 2. Volume spike (if available)
  if (quote && quote.v && quote.pv) {
    const volumeChange = ((quote.v - quote.pv) / quote.pv) * 100
    if (volumeChange > 100) {
      anomalies.push({
        type: "volume-spike",
        severity: volumeChange > 200 ? "high" : "medium",
        value: `${Math.round(volumeChange)}% increase`,
        description: "Unusual trading volume",
      })
      riskFactors.push(volumeChange > 200 ? 3 : 2)
    }
  }

  // 3. Gap detection (opening vs previous close)
  if (quote && quote.o && quote.pc) {
    const gap = ((quote.o - quote.pc) / quote.pc) * 100
    if (Math.abs(gap) > 2) {
      anomalies.push({
        type: "gap",
        severity: Math.abs(gap) > 5 ? "high" : "medium",
        value: `${Math.round(gap * 100) / 100}% gap`,
        description: "Opening gap from previous close",
      })
      riskFactors.push(Math.abs(gap) > 5 ? 2 : 1)
    }
  }

  // 4. Range breakout (high/low extremes)
  if (quote && quote.h && quote.l) {
    const range = quote.h - quote.l
    const avgRange = prices.slice(-10).reduce((a, b) => a + Math.abs(b - prices[prices.indexOf(b) - 1]), 0) / 9
    if (range > avgRange * 2) {
      anomalies.push({
        type: "range-expansion",
        severity: "medium",
        value: `${Math.round(range * 100) / 100}`,
        description: "Wider than average trading range",
      })
      riskFactors.push(1)
    }
  }

  const riskScore = Math.min(100, Math.round((riskFactors.reduce((a, b) => a + b, 0) / 10) * 100))

  return {
    anomalies,
    riskScore,
    method: "multivariate",
    hasAnomalies: anomalies.length > 0,
  }
}

/**
 * Detect patterns that might precede reversals
 * @param {number[]} prices - historical prices (last 20+ days)
 * @returns {object} - reversal signals
 */
export function detectReversalPatterns(prices) {
  if (!prices || prices.length < 10) {
    return { signals: [], confidence: 0 }
  }

  const signals = []
  const recentPrices = prices.slice(-10)

  // 1. V-shaped recovery
  if (recentPrices[0] > recentPrices[5] && recentPrices[5] < recentPrices[9]) {
    signals.push({
      pattern: "v-recovery",
      description: "V-shaped recovery pattern detected",
      bullish: true,
      confidence: 65,
    })
  }

  // 2. Downtrend then plateau
  const trend = prices.slice(-5).every((p, i, arr) => i === 0 || p <= arr[i - 1])
  const plateau = recentPrices.slice(-3).every((p, i, arr) => i === 0 || Math.abs(p - arr[i - 1]) < 0.5)

  if (trend && plateau) {
    signals.push({
      pattern: "support-plateau",
      description: "Price stabilizing after decline",
      bullish: true,
      confidence: 58,
    })
  }

  // 3. Resistance rejection
  const high = Math.max(...recentPrices)
  const recent = recentPrices.slice(-3)
  if (recent[0] >= high && recent[2] < recent[0] * 0.99) {
    signals.push({
      pattern: "resistance-rejection",
      description: "Selling pressure at resistance level",
      bullish: false,
      confidence: 60,
    })
  }

  const avgConfidence =
    signals.length > 0 ? Math.round(signals.reduce((a, b) => a + b.confidence, 0) / signals.length) : 0

  return {
    signals,
    avgConfidence,
    method: "pattern-detection",
  }
}
