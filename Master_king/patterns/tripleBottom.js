// patterns/tripleBottom.js
export function isTripleBottom(candles) {
  const period = 50;
  if (candles.length < period) return false;
  const highs = candles.slice(-period).map(c => c.high);
  const lows = candles.slice(-period).map(c => c.low);
  const closePrices = candles.slice(-period).map(c => c.close);
  let lowIndices = [];
  for (let i = lows.length - 2; i > 10; i--) {
    if (lows[i] < lows[i - 1] && lows[i] < lows[i + 1]) {
      lowIndices.push(i);
      if (lowIndices.length >= 3) break;
    }
  }
  if (lowIndices.length < 3) return false;
  const [firstLow, secondLow, thirdLow] = lowIndices.reverse();
  const lowLevels = [lows[firstLow], lows[secondLow], lows[thirdLow]];
  const maxLow = Math.max(...lowLevels);
  const minLow = Math.min(...lowLevels);
  const lowRange = (maxLow - minLow) / maxLow;
  if (lowRange < 0.002) {
    const necklineLevel = Math.max(...highs.slice(lowIndices[0], lowIndices[lowIndices.length - 1]));
    const lastClose = closePrices[closePrices.length - 1];
    if (lastClose > necklineLevel) return true;
  }
  return false;
}
