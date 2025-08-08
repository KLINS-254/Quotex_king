// app/page.js (acts as index.js in App Router)

'use client';

import { useState } from 'react'; import { analyzeMarket } from '../utils/analyzeStrategies';

export default function Home() { const [analysis, setAnalysis] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState(null);

const handleAnalyze = async () => { setLoading(true); setError(null); try { const results = await analyzeMarket(); if (results.length === 0) { setError('No market data available.'); setAnalysis(null); } else { setAnalysis(results[0]); } } catch (err) { console.error('Analysis failed:', err); setError('Failed to analyze market.'); setAnalysis(null); } setLoading(false); };

return ( <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}> <h1>🔮 Quotex Prophet Dashboard</h1> <button onClick={handleAnalyze} style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '1rem', }} > 🔁 Run Signal Analysis </button>

{loading && <p style={{ marginTop: '1rem' }}>⏳ Analyzing...</p>}

  {error && <p style={{ marginTop: '1rem', color: 'red' }}>❌ {error}</p>}

  {analysis && (
    <div style={{
      marginTop: '2rem',
      padding: '1.5rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      background: '#f9f9f9',
    }}>
      <h2>📈 Asset: {analysis.pair}</h2>
      <p>🕐 Timeframe: 1m</p>
      <p>📊 Direction: {analysis.signals.rsi.signal}</p>
      <p>📡 Confidence: {analysis.score * 10}%</p>

      <h3>📍 Signal Breakdown:</h3>
      <ul>
        <li>RSI: {analysis.signals.rsi.signal}</li>
        <li>MACD: {analysis.signals.macd.signal}</li>
        <li>EMA: {analysis.signals.ema.signal}</li>
        <li>Bollinger Bands: {analysis.signals.bb.signal}</li>
        <li>Patterns: {analysis.signals.patterns.map(p => p.name).join(', ') || 'None'}</li>
      </ul>
    </div>
  )}
</div>

); }

      
