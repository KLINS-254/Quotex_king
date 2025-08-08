// patterns/tripleTop.js
export function isTripleTop(candles) {
  const highs = candles.slice(-50).map(c => c.high);
  const lastHighs = highs.slice(-3);
  if (lastHighs.length < 3) return false;
  const maxHigh = Math.max(...lastHighs);
  const minHigh = Math.min(...lastHighs);
  const highRange = (maxHigh - minHigh) / maxHigh;
  if (highRange < 0.001) {
    const lastClose = candles[candles.length - 1].close;
    if (lastClose < minHigh) return true;
  }
  return false;
}
