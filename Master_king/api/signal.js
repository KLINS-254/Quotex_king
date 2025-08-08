// api/signal.js
import { getBars } from '../lib/dataFeed';
import { runStrategy } from '../lib/strategyEngine';

export default async function handler(req, res) {
  const symbol = 'EURUSD';
  const timeframe = 'min';
  const candles = await getBars(symbol, timeframe);
  if (!candles) return res.status(500).json({ error: 'Failed to fetch market data.' });
  const signal = runStrategy(candles);
  res.status(200).json({
    pair: symbol,
    timeframe: `1 ${timeframe}`,
    signal: signal.status,
    reason: signal.reason,
    confidence: signal.confidence,
    timestamp: candles[candles.length - 1].timestamp,
  });
}
