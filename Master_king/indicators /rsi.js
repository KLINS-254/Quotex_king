// indicators/rsi.js

const { RSI } = require("technicalindicators");

/**
 * Calculates RSI values
 * @param {Array<number>} closePrices - Array of closing prices
 * @param {number} period - RSI period (default: 14)
 * @returns {number} - Latest RSI value
 */
function calculateRSI(closePrices, period = 14) {
  const input = {
    values: closePrices,
    period: period
  };

  const result = RSI.calculate(input);
  return result[result.length - 1]; // return the most recent RSI
}

module.exports = calculateRSI;
