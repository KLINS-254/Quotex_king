import { useEffect, useState } from "react";

export default function Home() {
  const [signal, setSignal] = useState<any>(null);

  useEffect(() => {
    fetch("/api/signal?symbol=EURUSD")
      .then((res) => res.json())
      .then((data) => setSignal(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Quotex Signal</h1>

      {signal ? (
        <div className="p-6 bg-gray-800 rounded-xl shadow-md w-80 text-center">
          <h2 className="text-2xl mb-2">{signal.signal}</h2>
          <p className="text-lg">Confidence: {signal.confidence}%</p>
          <div className="mt-4 text-sm text-gray-400">
            <pre>{JSON.stringify(signal.indicators, null, 2)}</pre>
          </div>
        </div>
      ) : (
        <p>Loading market signal...</p>
      )}
    </div>
  );
}
