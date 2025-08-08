'use client'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyse = async () => {
    setLoading(true)
    const res = await fetch('/api/analyse')
    const data = await res.json()
    setResult(data.signal)
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🔮 Quotex Prophet</h1>

      <button
        onClick={handleAnalyse}
        disabled={loading}
        className="px-6 py-3 bg-purple-700 hover:bg-purple-800 rounded-lg shadow-md text-lg font-semibold transition"
      >
        {loading ? 'Analysing...' : '📊 Analyse Market'}
      </button>

      {result && (
        <div className="mt-8 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-left">
          <h2 className="text-xl font-bold mb-2">🔥 Signal</h2>
          <p><strong>Asset:</strong> {result.asset}</p>
          <p><strong>Direction:</strong> {result.direction}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p><strong>Reason:</strong> {result.reason}</p>
          <p className="mt-4"><strong>Indicators:</strong></p>
          <ul className="list-disc list-inside">
            <li>RSI: {result.indicators.rsi}</li>
            <li>MACD Histogram: {result.indicators.macd.histogram}</li>
            <li>EMA Fast: {result.indicators.emaFast}</li>
            <li>EMA Slow: {result.indicators.emaSlow}</li>
          </ul>
          <p className="mt-4"><strong>Patterns Detected:</strong></p>
          <ul className="list-disc list-inside">
            {Object.entries(result.patterns).map(([key, val]) => (
              <li key={key}>{key}: {val ? '✅' : '❌'}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-400">Time: {result.time}</p>
        </div>
      )}
    </main>
  )
        }
