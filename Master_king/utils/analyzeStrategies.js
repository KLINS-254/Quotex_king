// utils/analyzeStrategies.js

import { calculateRSI } from './indicators/rsi'; import { calculateMACD } from './indicators/macd'; import { calculateEMA } from './indicators/ema'; import { calculateBollingerBands } from './indicators/bollinger'; import { detectChartPatterns } from './patterns/detectPatterns'; import { fetchMultiplePairs } from './fetchLiveData';

export async function analyzeMarket(pairs = ['EURUSD','AUDUSD','GBPJPY','USDCHF','USDCAD','NZDUSD','GBPUSD']) { const marketData = await fetchMultiplePairs(pairs);

const results = await Promise.all( marketData.map(async ({ pair, data }) => { if (!data) return null;

const candles = await fetchHistoricalCandles(pair); // implement this

  const rsi = calculateRSI(candles);
  const macd = calculateMACD(candles);
  const emaSignal = calculateEMA(candles);
  const bbSignal = calculateBollingerBands(candles);
  const patterns = detectChartPatterns(candles);

  const score = getConfidenceScore({ rsi, macd, emaSignal, bbSignal, patterns });

  return {
    pair,
    score,
    signals: {
      rsi,
      macd,
      ema: emaSignal,
      bb: bbSignal,
      patterns
    }
  };
})

);

const sorted = results.filter(Boolean).sort((a, b) => b.score - a.score); return sorted; }

function getConfidenceScore({ rsi, macd, emaSignal, bbSignal, patterns }) { let score = 0;

if (rsi.signal === 'BUY') score += 2; else if (rsi.signal === 'SELL') score += 2;

if (macd.signal === rsi.signal) score += 2; if (emaSignal.signal === rsi.signal) score += 2; if (bbSignal.signal === rsi.signal) score += 1; if (patterns.length > 0) score += patterns.some(p => p.signal === rsi.signal) ? 3 : 0;

return score; }

// Placeholder: Fetch 100 historical candles (Open/High/Low/Close) async function fetchHistoricalCandles(pair) { // Replace this with real historical data API call return []; }

