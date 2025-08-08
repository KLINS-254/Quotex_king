// utils/patterns.js

export function detectDoubleTop(prices) {
  if (prices.length < 5) return false;

  const [p1, p2, p3, p4, p5] = prices.slice(-5);

  const peak1 = p2 > p1 && p2 > p3;
  const peak2 = p4 > p3 && p4 > p5;
  const neckline = Math.abs(p2 - p4) / p2 < 0.02;

  return peak1 && peak2 && neckline;
}

export function detectDoubleBottom(prices) {
  if (prices.length < 5) return false;

  const [p1, p2, p3, p4, p5] = prices.slice(-5);

  const dip1 = p2 < p1 && p2 < p3;
  const dip2 = p4 < p3 && p4 < p5;
  const neckline = Math.abs(p2 - p4) / p2 < 0.02;

  return dip1 && dip2 && neckline;
}

export function detectHeadAndShoulders(prices) {
  if (prices.length < 7) return false;

  const [l1, s1, h, s2, l2] = prices.slice(-5);

  const isHead = h > s1 && h > s2;
  const shoulders = Math.abs(s1 - s2) / s1 < 0.05;
  const neckline = Math.abs(l1 - l2) / l1 < 0.05;

  return isHead && shoulders && neckline;
}

export function detectTriangle(prices) {
  if (prices.length < 6) return false;

  const highs = prices.slice(-6).map((_, i) =>
    i % 2 === 0 ? Math.max(prices[i], prices[i + 1]) : null
  ).filter(Boolean);

  const lows = prices.slice(-6).map((_, i) =>
    i % 2 === 0 ? Math.min(prices[i], prices[i + 1]) : null
  ).filter(Boolean);

  const highTrend = highs[0] > highs[1] && highs[1] > highs[2];
  const lowTrend = lows[0] < lows[1] && lows[1] < lows[2];

  return highTrend && lowTrend;
}

export function detectAllPatterns(prices) {
  return {
    doubleTop: detectDoubleTop(prices),
    doubleBottom: detectDoubleBottom(prices),
    headAndShoulders: detectHeadAndShoulders(prices),
    triangle: detectTriangle(prices),
  };
    }
