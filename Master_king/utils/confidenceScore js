// utils/confidenceScore.js
export function getConfidenceScore(signalDetails) {
  let score = 0;
  score += 30;
  if (signalDetails.pattern) score += 30;
  if (signalDetails.macdSignal) score += 20;
  if (signalDetails.rsiSignal) score += 20;
  return Math.min(score, 100);
}
