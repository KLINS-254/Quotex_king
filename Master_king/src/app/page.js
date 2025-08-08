'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function HomePage() {
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchSignal = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/signal');
      const data = await res.json();
      if (data && data.timestamp) {
        const lastCandleTime = new Date(data.timestamp);
        const expiryTime = new Date(lastCandleTime.getTime() + (4 * 60 * 1000));
        setSignal({ ...data, expiryTime: expiryTime });
      }
    } catch (error) {
      console.error('Failed to fetch signal:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignal();
    const interval = setInterval(fetchSignal, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !signal) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#f8f9fa', backgroundColor: '#1e1e1e' }}>
        <h1>Analyzing market...</h1>
      </div>
    );
  }
  const signalColor = signal.signal === 'STRONG SELL' ? '#dc3545' : signal.signal === 'STRONG BUY' ? '#28a745' : '#6c757d';

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#f8f9fa', backgroundColor: '#1e1e1e' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>Quotex Prophet</h1>
      <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', opacity: '0.8' }}>
          <span>{signal.pair} | {signal.timeframe}</span>
          <span>Confidence: {signal.confidence}%</span>
        </div>
        <h2 style={{ fontSize: '4rem', fontWeight: '700', margin: '1rem 0', color: signalColor }}>{signal.signal}</h2>
        <p style={{ opacity: '0.9', fontSize: '1.1rem' }}>
          **Reason:** {signal.reason}
        </p>
        <p style={{ opacity: '0.9', fontSize: '1.1rem' }}>
          **Signal valid until:** {format(signal.expiryTime, 'HH:mm:ss')}
        </p>
        <p style={{ opacity: '0.7', fontSize: '0.9rem', marginTop: '2rem' }}>
          **Note:** This is a simulated signal for educational purposes. Do not use for actual trading.
        </p>
      </div>
    </div>
  );
                 }
    
