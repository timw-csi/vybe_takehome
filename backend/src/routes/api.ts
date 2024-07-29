import { Router, Request, Response } from "express";
import fetchMarketCapDistribution from "../services/marketCapDistribution";
import fetchTransactionsPerSecond from "../services/transactionsPerSecond";
import fetchWalletBalance from "../services/walletBalance";

const router = Router();

router.get("/market-cap-distribution", async (req: Request, res: Response) => {
  const tokensParam = req.query.tokens;
  if (!tokensParam) {
    return res.status(400).json({ error: "Missing tokens parameter" });
  }

  const tokens: string[] =
    typeof tokensParam === "string" ? tokensParam.split(",") : [];
  try {
    const data = await fetchMarketCapDistribution(tokens);
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
  const walletsParam = req.query.wallets;
  if (!walletsParam) {
    return res.status(400).json({ error: "Missing wallets parameter" });
  }

  const wallets: string[] =
    typeof walletsParam === "string" ? walletsParam.split(",") : [];

  try {
    const data = await fetchWalletBalance(wallets);
    res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
});

export default router;
