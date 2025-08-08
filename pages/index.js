import React, { useEffect, useState } from 'react';

export default function Home() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const fetchSignals = async () => {
      const res = await fetch('/api/getSignal');
      const data = await res.json();
      setSignals(data);
    };

    fetchSignals();
    const interval = setInterval(fetchSignals, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">🔮 Quotex Prophet Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {signals.map((signal, i) => (
          <div key={i} className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-bold">{signal.asset} | {signal.timeframe}</h2>
            <p className="text-lg">📈 Signal: <strong>{signal.direction}</strong></p>
            <p>🧠 Confidence: {signal.confidence}%</p>
            <p>📊 Pattern: {signal.pattern}</p>
            <p>📍 Reason: {signal.reason.join(', ')}</p>
            <p>⏱️ Valid: {signal.validUntil}</p>
          </div>
        ))}
      </div>
    </div>
  );
                     }
