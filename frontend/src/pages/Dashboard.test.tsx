import React from "react";
import { render, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import * as api from "../services/api";

jest.mock("../services/api");

test("renders Dashboard with charts", async () => {
  (api.getMarketCapDistribution as jest.Mock).mockResolvedValue([
    { token: "Token1", marketCap: 10 },
    { token: "Token2", marketCap: 20 },
  ]);

  (api.getTransactionsPerSecond as jest.Mock).mockResolvedValue([
    { timestamp: "2023-01-01T00:00:00Z", tps: 50 },
  ]);

  (api.getWalletBalances as jest.Mock).mockResolvedValue([
    { wallet: "Wallet1", balance: 100 },
    { wallet: "Wallet2", balance: 200 },
  ]);

  const { getByText } = render(<Dashboard />);

  await waitFor(() => expect(getByText("Token1")).toBeInTheDocument());
  expect(getByText("Token2")).toBeInTheDocument();
  expect(getByText("50")).toBeInTheDocument();
  expect(getByText("Wallet1")).toBeInTheDocument();
  expect(getByText("Wallet2")).toBeInTheDocument();
});
