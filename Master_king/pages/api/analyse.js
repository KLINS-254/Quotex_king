// pages/api/analyse.js

import { detectPatterns } from '../../utils/patterns';
import { computeIndicators } from '../../utils/indicators';
import { calculateIndicators } from '@/utils/indicators'

const mockAssets = ['AUDUSD', 'EURUSD', 'GBPJPY', 'USDJPY']

// Simulated price data generator
function generatePrices() {
  const base = 1.2 + Math.random() * 0.5
  return Array.from({ length: 20 }, (_, i) => {
    return parseFloat((base + Math.sin(i / 3) * 0.01 + Math.random() * 0.005).toFixed(5))
  })
}

export default function handler(req, res) {
  const analysis = []

  mockAssets.forEach(asset => {
    const prices = generatePrices()
    const indicators = calculateIndicators(prices)
    const patterns = detectAllPatterns(prices)

    let direction = 'WAIT'
    let reason = ''
    let confidence = 60

    if (indicators.rsi < 30 && indicators.macd.histogram > 0 && patterns.doubleBottom) {
      direction = 'BUY'
      reason = 'RSI Oversold + MACD Bullish + Double Bottom'
      confidence = 87
    } else if (indicators.rsi > 70 && indicators.macd.histogram < 0 && patterns.doubleTop) {
      direction = 'SELL'
      reason = 'RSI Overbought + MACD Bearish + Double Top'
      confidence = 85
    } else if (patterns.headAndShoulders) {
      direction = 'SELL'
      reason = 'Head & Shoulders'
      confidence = 82
    } else if (patterns.triangle) {
      direction = 'BUY'
      reason = 'Triangle Breakout'
      confidence = 76
    }

    analysis.push({
      asset,
      direction,
      confidence,
      reason,
      indicators,
      patterns,
      time: new Date().toLocaleTimeString(),
    })
  })

  // Pick the best
  const top = analysis.sort((a, b) => b.confidence - a.confidence)[0]

  res.status(200).json({ signal: top })
}
