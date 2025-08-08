// indicators/rsi.js
import { RSI } from 'technicalindicators';

export function calculateRSI(closePrices, period = 14) {
  if (closePrices.length < period) return null;
  const input = { values: closePrices, period: period };
  const rsiValues = RSI.calculate(input);
  return rsiValues[rsiValues.length - 1];
}
