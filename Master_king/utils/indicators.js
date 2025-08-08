// utils/indicators.js

export function calculateRSI(prices, period = 14) {
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  const avgGain = gains / period;
  const avgLoss = losses / period;
  const rs = avgGain / (avgLoss || 1);
  return +(100 - 100 / (1 + rs)).toFixed(2);
}

export function calculateEMA(prices, period = 10) {
  const k = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  return +ema.toFixed(5);
}

export function calculateMACD(prices, fast = 12, slow = 26, signal = 9) {
  const emaFast = calculateEMA(prices, fast);
  const emaSlow = calculateEMA(prices, slow);
  const macdLine = emaFast - emaSlow;
  const signalLine = calculateEMA([macdLine], signal); // simplified
  return {
    macd: +macdLine.toFixed(5),
    signal: +signalLine.toFixed(5),
    histogram: +(macdLine - signalLine).toFixed(5)
  };
}

export function calculateBollingerBands(prices, period = 20, multiplier = 2) {
  const slice = prices.slice(-period);
  const mean = slice.reduce((a, b) => a + b, 0) / period;
  const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
  const stdDev = Math.sqrt(variance);
  return {
    upper: +(mean + multiplier * stdDev).toFixed(5),
    lower: +(mean - multiplier * stdDev).toFixed(5),
    middle: +mean.toFixed(5)
  };
                                 }
