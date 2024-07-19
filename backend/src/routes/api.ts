import { Router, Request, Response } from "express";
import fetchMarketCapDistribution from "../services/marketCapDistribution";
import fetchTransactionsPerSecond from "../services/transactionsPerSecond";
import fetchWalletBalance from "../services/walletBalance";

const router = Router();

router.get("/market-cap-distribution", async (req: Request, res: Response) => {
  try {
    const data = await fetchMarketCapDistribution();
    res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get("/transactions-per-second", async (req: Request, res: Response) => {
  try {
    const data = await fetchTransactionsPerSecond();
    res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get("/wallet-balance", async (req: Request, res: Response) => {
  try {
    const data = await fetchWalletBalance();
    res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
});

export default router;
