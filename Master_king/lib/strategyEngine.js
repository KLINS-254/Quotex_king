// lib/strategyEngine.js
import { calculateRSI } from '../indicators/rsi';
import { calculateMACD } from '../indicators/macd';
import { isTripleTop } from '../patterns/tripleTop';
import { isDoubleTop } from '../patterns/doubleTop';
import { isDoubleBottom } from '../patterns/doubleBottom';
import { isTripleBottom } from '../patterns/tripleBottom';
import { getConfidenceScore } from '../utils/confidenceScore';

export function runStrategy(candles) {
  if (!candles || candles.length < 50) {
    return { status: 'Wait', reason: 'Insufficient data for analysis.', confidence: 0 };
  }
  const closePrices = candles.map(c => c.close);
  const rsi = calculateRSI(closePrices);
  const macd = calculateMACD(closePrices);
  const tripleTop = isTripleTop(candles);
  const doubleTop = isDoubleTop(candles);
  const doubleBottom = isDoubleBottom(candles);
  const tripleBottom = isTripleBottom(candles);
  const signalDetails = { pattern: null, macdSignal: false, rsiSignal: false };

  if ((tripleTop || doubleTop) && rsi > 70 && macd && macd.histogram < 0) {
    signalDetails.pattern = tripleTop ? 'Triple Top' : 'Double Top';
    signalDetails.macdSignal = true;
    signalDetails.rsiSignal = true;
    return {
      status: 'STRONG SELL',
      reason: `${signalDetails.pattern} pattern confirmed by overbought RSI and MACD crossover.`,
      confidence: getConfidenceScore(signalDetails),
    };
  }

  if ((doubleBottom || tripleBottom) && rsi < 30 && macd && macd.histogram > 0) {
    signalDetails.pattern = doubleBottom ? 'Double Bottom' : 'Triple Bottom';
    signalDetails.macdSignal = true;
    signalDetails.rsiSignal = true;
    return {
      status: 'STRONG BUY',
      reason: `${signalDetails.pattern} pattern confirmed by oversold RSI and MACD crossover.`,
      confidence: getConfidenceScore(signalDetails),
    };
  }

  return {
    status: 'Wait',
    reason: 'No clear signal. Market is uncertain.',
    confidence: 0,
  };
}
