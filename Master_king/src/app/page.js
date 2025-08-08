'use client';
import { useState, useEffect } from 'react';

export default function SimpleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#f8f9fa', backgroundColor: '#1e1e1e' }}>
      <h1>Client-side JavaScript Test</h1>
      <p>Count: {count}</p>
    </div>
  );
}
