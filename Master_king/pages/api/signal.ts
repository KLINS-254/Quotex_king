import type { NextApiRequest, NextApiResponse } from "next";
import { calculateIndicators } from "../../lib/indicators";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const symbol = req.query.symbol || "EURUSD";

  try {
    // Example using Alpha Vantage (replace YOUR_KEY with .env.local)
    const response = await fetch(
      `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=1min&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    );
    const raw = await response.json();

    // Format candles (simplified for demo)
    const candles = Object.entries(raw["Time Series FX (1min)"]).map(
      ([time, values]: any) => ({
        time,
        close: parseFloat(values["4. close"]),
      })
    );

    const result = calculateIndicators(candles);

    res.status(200).json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
        }
