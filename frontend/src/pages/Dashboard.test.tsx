import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import Dashboard from "./Dashboard";
import * as api from "../services/api";

vi.mock("../services/api");

vi.mock("react-apexcharts", () => ({
  default: vi.fn(() => null),
}));

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.mocked(api.getMarketCapDistribution).mockResolvedValue([
      { symbol: "Token1", marketCap: 55 },
    ]);
    vi.mocked(api.getTransactionsPerSecond).mockResolvedValue([
      { timestamp: "2023-01-01T00:00:00Z", tps: 50 },
    ]);
    vi.mocked(api.getWalletBalances).mockResolvedValue([
      { wallet: "wallet-1", balance: 1000 },
    ]);
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders Solana Dashboard", async () => {
    render(<Dashboard />);
    const solanaHeading = await screen.findByRole("heading", {
      name: "Solana Dashboard",
    });
    expect(solanaHeading).toBeInTheDocument();
  });

  test("renders Market Cap Distribution chart", async () => {
    render(<Dashboard />);
    const marketCapHeading = await screen.findByRole("heading", {
      name: "Market Cap Distribution",
    });
    expect(marketCapHeading).toBeInTheDocument();
  });

  test("renders Transactions Per Second chart", async () => {
    render(<Dashboard />);
    const transactionsHeading = await screen.findByRole("heading", {
      name: "Transactions Per Second",
    });
    expect(transactionsHeading).toBeInTheDocument();
  });

  test("renders Wallet Balances chart", async () => {
    render(<Dashboard />);
    const walletBalancesHeading = await screen.findByRole("heading", {
      name: "Wallet Balances",
    });
    expect(walletBalancesHeading).toBeInTheDocument();
  });
});
