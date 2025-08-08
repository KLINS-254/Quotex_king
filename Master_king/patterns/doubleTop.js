// patterns/doubleTop.js
export function isDoubleTop(candles) {
  const period = 50;
  if (candles.length < period) return false;
  const highs = candles.slice(-period).map(c => c.high);
  const lows = candles.slice(-period).map(c => c.low);
  const closePrices = candles.slice(-period).map(c => c.close);
  let firstHighIndex = -1, secondHighIndex = -1, troughIndex = -1;
  for (let i = highs.length - 2; i > 10; i--) {
    if (highs[i] > highs[i - 1] && highs[i] > highs[i + 1]) {
      if (secondHighIndex === -1) secondHighIndex = i;
      else if (firstHighIndex === -1) {
        firstHighIndex = i;
        const subLows = lows.slice(firstHighIndex, secondHighIndex);
        if (subLows.length > 0 && Math.min(...subLows) < highs[firstHighIndex] && Math.min(...subLows) < highs[secondHighIndex]) {
          const troughLevel = Math.min(...subLows);
          const lastClose = closePrices[closePrices.length - 1];
          const peakDifference = Math.abs(highs[firstHighIndex] - highs[secondHighIndex]);
          const averageHigh = (highs[firstHighIndex] + highs[secondHighIndex]) / 2;
          if (peakDifference / averageHigh < 0.002 && lastClose < troughLevel) return true;
        }
      }
    }
  }
  return false;
}
