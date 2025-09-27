import { useEffect, useState } from "react";

export default function Home() {
  const [signal, setSignal] = useState<any>(null);

  useEffect(() => {
    fetch("/api/signal?symbol=AUDUSD") // Change symbol here
      .then((res) => res.json())
      .then((data) => setSignal(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">💎 Quotex Prophet Dashboard 💎</h1>

      {signal ? (
        <div className="p-6 bg-gray-800 rounded-2xl shadow-xl w-96 text-center">
          <p className="text-lg">📈 Asset: AUDUSD</p>
          <p className="text-lg">🕐 Timeframe: 1m</p>

          <h2 className="text-2xl mt-4 mb-2">📊 Direction: {signal.signal}</h2>
          <p className="text-xl">📡 Confidence: {signal.confidence}%</p>
        </div>
      ) : (
        <p>Loading market signal...</p>
      )}
    </div>
  );
}
