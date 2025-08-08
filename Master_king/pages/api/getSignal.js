// pages/api/getSignal.js

export default function handler(req, res) {
  const signals = [
    {
      asset: "AUDUSD",
      timeframe: "1 min",
      direction: "BUY",
      confidence: 92,
      pattern: "Double Bottom",
      reason: ["RSI < 30", "MACD crossover up", "EMA 50 above 200"],
      validUntil: "1 min from now"
    },
    {
      asset: "EURUSD",
      timeframe: "5 min",
      direction: "SELL",
      confidence: 89,
      pattern: "Triple Top",
      reason: ["RSI > 70", "MACD cross down", "Price below neckline"],
      validUntil: "4 min from now"
    }
  ];

  res.status(200).json(signals);
}
