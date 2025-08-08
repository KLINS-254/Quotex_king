// pages/index.js

import { useState } from 'react'; import { analyzeMarket } from '@/utils/analyzeStrategies';

export default function Home() { const [loading, setLoading] = useState(false); const [result, setResult] = useState(null);

const handleAnalyze = async () => { setLoading(true); const analysis = await analyzeMarket(); setResult(analysis[0]); setLoading(false); };

return ( <main className="min-h-screen flex flex-col items-center justify-center p-4"> <h1 className="text-3xl font-bold mb-6">🔮 Quotex Prophet Dashboard</h1>

<button
    onClick={handleAnalyze}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl mb-6"
    disabled={loading}
  >
    {loading ? 'Analyzing...' : '🔍 Analyse'}
  </button>

  {result && (
    <div className="text-center border p-6 rounded-xl shadow-xl">
      <p className="text-xl font-medium">📈 Asset: {result.pair}</p>
      <p className="text-lg">🕐 Timeframe: 1m</p>
      <p className="text-lg">📊 Direction: {result.signals.rsi.signal}</p>
      <p className="text-lg">📡 Confidence: {result.score * 10}%</p>
    </div>
  )}
</main>

); }

