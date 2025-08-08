import { useEffect, useState } from 'react';

export default function Home() {
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/getSignal')
      .then(res => res.json())
      .then(data => {
        setSignal(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      background: '#0f0f0f',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        🔮 Quotex Prophet Dashboard
      </h1>

      {loading ? (
        <p>⏳ Loading real-time signals...</p>
      ) : (
        <>
          <h2>📈 Asset: {signal.asset}</h2>
          <p>🕐 Timeframe: {signal.timeframe}</p>
          <p>📊 Direction: <strong>{signal.direction}</strong></p>
          <p>📡 Confidence: {signal.confidence}%</p>
        </>
      )}
    </div>
  );
}
