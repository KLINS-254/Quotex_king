export function calculateIndicators(candles: any[]) {
  const closes = candles.map(c => c.close);

  // Example quick calculations (replace with full versions later)
  const ema50 = closes.slice(-50).reduce((a, b) => a + b, 0) / 50;
  const ema200 = closes.slice(-200).reduce((a, b) => a + b, 0) / 200;
  const rsi = 50; // placeholder
  const macd = ema50 - ema200;
  const bbMid = closes.slice(-20).reduce((a, b) => a + b, 0) / 20;

  let signal = "WAIT";
  let confidence = 50;

  if (ema50 > ema200 && macd > 0) {
    signal = "UP";
    confidence = 80;
  } else if (ema50 < ema200 && macd < 0) {
    signal = "DOWN";
    confidence = 80;
  }

  return {
    signal,
    confidence,
    indicators: {
      ema50,
      ema200,
      rsi,
      macd,
      bbMid,
    },
  };
                                          }
