// lib/dataFeed.js
import Alpaca from '@alpacahq/alpaca-trade-api';

const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY_ID,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: true,
});

export async function getBars(symbol, timeframe) {
  try {
    const bars = alpaca.getBarsV2(symbol, {
      limit: 200,
      timeframe: `1${timeframe.toUpperCase()}`,
      feed: 'sip',
    });

    const candles = [];
    for await (const bar of bars) {
      candles.push({
        open: bar.Open,
        high: bar.High,
        low: bar.Low,
        close: bar.Close,
        volume: bar.Volume,
        timestamp: bar.Timestamp,
      });
    }

    return candles;
  } catch (error) {
    console.error(`Error fetching bars for ${symbol}:`, error);
    return null;
  }
}
