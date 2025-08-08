// indicators/macd.js
import { MACD } from 'technicalindicators';

export function calculateMACD(closePrices) {
  const input = {
    values: closePrices,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMA: false,
  };
  const macdValues = MACD.calculate(input);
  return macdValues[macdValues.length - 1];
}
