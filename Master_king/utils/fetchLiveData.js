// utils/fetchLiveData.js

const API_KEY = '6T6N2VTJGMIC8PBB'; // ✅ Your real AlphaVantage API key

export async function fetchLiveForexData(pair = 'EURUSD') {
  try {
    const symbol = `${pair.slice(0, 3)}/${pair.slice(3)}`;
    const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${pair.slice(0,3)}&to_symbol=${pair.slice(3)}&interval=1min&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const timeSeries = data['Time Series FX (1min)'];
    if (!timeSeries) return null;

    const sorted = Object.entries(timeSeries).sort((a, b) => new Date(b[0]) - new Date(a[0]));
    const latest = sorted[0][1];

    return {
      open: parseFloat(latest['1. open']),
      high: parseFloat(latest['2. high']),
      low: parseFloat(latest['3. low']),
      close: parseFloat(latest['4. close']),
      symbol,
      time: sorted[0][0]
    };
  } catch (err) {
    console.error('Error fetching live data:', err);
    return null;
  }
}

export async function fetchMultiplePairs(pairs = ['EURUSD','AUDUSD','GBPJPY','USDCHF','USDCAD','NZDUSD','GBPUSD']) {
  const results = await Promise.all(
    pairs.map(async pair => {
      const data = await fetchLiveForexData(pair);
      return { pair, data };
    })
  );
  return results.filter(item => item.data !== null);
}
