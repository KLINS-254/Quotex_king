// app/page.js (or src/app/page.js depending on structure)

'use client';

import { useState } from 'react'; import { analyzeMarket } from '@/utils/analyzeStrategies';

export default function Home() { const [results, setResults] = useState([]); const [loading, setLoading] = useState(false); const [error, setError] = useState(null);

const handleAnalyze = async () => { setLoading(true); setError(null); try { const analysis = await analyzeMarket(); setResults(analysis); } catch (err) { setError('Failed to fetch analysis.'); console.error(err); } finally { setLoading(false); } };

return ( <main className="min-h-screen bg-gray-100 py-10 px-6"> <h1 className="text-3xl font-bold mb-6 text-center">🔮 Quotex Prophet Dashboard</h1>

<div className="flex justify-center mb-6">
    <button
      onClick={handleAnalyze}
      className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700"
    >
      🔁 Run Signal Analysis
    </button>
  </div>

  {loading && <p className="text-center text-blue-500">Running analysis...</p>}
  {error && <p className="text-center text-red-500">{error}</p>}

  {results.length > 0 && (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {results.map((item, index) => (
        <div
          key={item.pair + index}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-2">📈 Asset: {item.pair}</h2>
          <p>🕐 Timeframe: 1m</p>
          <p>📊 Direction: {item.signals.rsi?.signal || 'WAIT'}</p>
          <p>📡 Confidence: {item.score * 10}%</p>
          <p className="mt-2 text-sm text-gray-600">Patterns: {item.signals.patterns?.map(p => p.name).join(', ') || 'None'}</p>
        </div>
      ))}
    </div>
  )}
</main>

); }

