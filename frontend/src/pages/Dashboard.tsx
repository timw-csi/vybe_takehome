// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import PieChart from "../components/charts/PieChart";
import TimeSeriesChart from "../components/charts/TimeSeriesChart";
import BarChart from "../components/charts/BarChart";
import {
  getMarketCapDistribution,
  getTransactionsPerSecond,
  getWalletBalances,
} from "../services/api";
import { IMarketCap, ITps, IWalletBalance } from "../models";

const Dashboard: React.FC = () => {
  const [marketCapData, setMarketCapData] = useState({
    labels: [],
    series: [],
  });
  const [tpsData, setTpsData] = useState([]);
  const [walletData, setWalletData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const marketCap = await getMarketCapDistribution();
      setMarketCapData({
        labels: marketCap.map((item: IMarketCap) => item.symbol),
        series: marketCap.map((item: IMarketCap) => item.ratio),
      });

      const tps = await getTransactionsPerSecond();
      setTpsData(tps.map((item: ITps) => ({ x: item.timestamp, y: item.tps })));

      const wallets = await getWalletBalances();
      setWalletData(
        wallets.map((item: IWalletBalance) => ({
          x: item.wallet,
          y: item.balance,
        }))
      );
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="centered">Solana Dashboard</h1>
      <div className="chart-container">
        <h2 className="centered">Market Cap Distribution</h2>
        <PieChart data={marketCapData} />
      </div>
      <div className="chart-container">
        <h2 className="centered">Transactions Per Second</h2>
        <TimeSeriesChart data={tpsData} />
      </div>
      <div className="chart-container">
        <h2 className="centered">Wallet Balances</h2>
        <BarChart data={walletData} />
      </div>
    </div>
  );
};

export default Dashboard;
