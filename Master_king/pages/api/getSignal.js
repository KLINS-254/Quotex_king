export default function handler(req, res) {
  // Simulated real-time data (replace with real data fetch later)
  const mockData = {
    asset: "AUDUSD",
    timeframe: "1m",
    indicators: {
      rsi: 65,
      macd: {
        histogram: 0.002,
        signal: 0.001,
        macd: 0.004,
      },
      ema50: 0.6591,
      ema200: 0.6584,
      currentPrice: 0.6598,
      upperBB: 0.6612,
      lowerBB: 0.6567,
    },
    patterns: {
      doubleBottom: true,
      wedge: false,
      headShoulders: false
    }
  };

  // Signal logic
  const { rsi, macd, ema50, ema200, currentPrice, upperBB } = mockData.indicators;
  const { doubleBottom } = mockData.patterns;

  let direction = "WAIT";
  let confidence = 0;

  // 🔁 Strategy rules
  if (rsi < 70 && macd.macd > macd.signal && ema50 > ema200 && currentPrice > ema50) {
    direction = "UP";
    confidence += 30;
  }

  if (rsi > 70 || currentPrice >= upperBB) {
    direction = "SELL";
    confidence += 20;
  }

  if (doubleBottom) {
    direction = "UP";
    confidence += 40;
  }

  // Boost confidence
  if (direction !== "WAIT") confidence += 10;

  // Limit to 100%
  confidence = Math.min(confidence, 100);

  // Return the signal
  res.status(200).json({
    asset: mockData.asset,
    timeframe: mockData.timeframe,
    direction,
    confidence
  });
}
