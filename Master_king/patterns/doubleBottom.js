// patterns/doubleBottom.js
export function isDoubleBottom(candles) {
  const period = 50;
  if (candles.length < period) return false;
  const highs = candles.slice(-period).map(c => c.high);
  const lows = candles.slice(-period).map(c => c.low);
  const closePrices = candles.slice(-period).map(c => c.close);
  let firstLowIndex = -1, secondLowIndex = -1, peakIndex = -1;
  for (let i = lows.length - 2; i > 10; i--) {
    if (lows[i] < lows[i - 1] && lows[i] < lows[i + 1]) {
      if (secondLowIndex === -1) secondLowIndex = i;
      else if (firstLowIndex === -1) {
        firstLowIndex = i;
        const subHighs = highs.slice(firstLowIndex, secondLowIndex);
        if (subHighs.length > 0 && Math.max(...subHighs) > lows[firstLowIndex] && Math.max(...subHighs) > lows[secondLowIndex]) {
          const peakLevel = Math.max(...subHighs);
          const lastClose = closePrices[closePrices.length - 1];
          const troughDifference = Math.abs(lows[firstLowIndex] - lows[secondLowIndex]);
          const averageLow = (lows[firstLowIndex] + lows[secondLowIndex]) / 2;
          if (troughDifference / averageLow < 0.002 && lastClose > peakLevel) return true;
        }
      }
    }
  }
  return false;
}
