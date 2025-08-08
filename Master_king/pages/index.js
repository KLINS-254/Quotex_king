// app/page.js (or index.js)

'use client';
import React, { useState } from 'react';
import { analyzeMarket } from '../utils/analyzeStrategies';

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRunAnalysis = async () => {
    setLoading(true);
    const data = await analyzeMarket(); // Analyze all pairs
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🔮 Quotex Prophet Dashboard</h1>
      <button
        onClick={handleRunAnalysis}
        disabled={loading}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
      >
        {loading ? 'Analyzing...' : '🔁 Run Signal Analysis'}
      </button>

      {results.length === 0 && !loading && (
        <p className="text-gray-600">Click the button above to run analysis.</p>
      )}

      {results.map((res, idx) => (
        <div
          key={idx}
          className="bg-white p-4 mb-4 shadow-md rounded-lg border-l-4 border-blue-500"
        >
          <h2 className="text-xl font-semibold mb-1">📈 Asset: {res.pair}</h2>
          <p className="text-gray-600">🕐 Timeframe: 1m</p>
          <p className="text-lg mt-2">
            📊 Direction: {res.signals?.rsi?.signal || 'N/A'}
          </p>
          <p>📡 Confidence: {res.score * 10}%</p>

          <div className="mt-2">
            🧠 Patterns Detected:
            <ul className="list-disc ml-6">
              {res.signals?.patterns?.map((p, i) => (
                <li key={i}>{p.name} ({p.signal})</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
