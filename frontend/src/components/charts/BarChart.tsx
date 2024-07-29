import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { IWalletBalance } from "../../models";
import { getWalletBalances } from "../../services/api";
import { ApexOptions } from "apexcharts";
import { WALLETS } from "../../config/constants";

// moved data fetching to individual chart components to avoid unnecessary re-rendering
const BarChart: React.FC = () => {
  const [walletData, setWalletData] = useState<IWalletBalance[]>([]);

  useEffect(() => {
    async function fetchWalletData() {
      const wallets = await getWalletBalances(WALLETS);
      setWalletData(
        wallets.map((item: IWalletBalance) => ({
          wallet: item.wallet,
          balance: item.balance,
        }))
      );
    }

    fetchWalletData();
  }, []);

  const options: ApexOptions = {
    chart: {
      id: "wallet-balances",
      foreColor: "#ffffff",
      height: "100%",
    },
    xaxis: {
      categories: walletData.map((d) => d.wallet),
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    title: {
      align: "center",
      text: "Wallet Balances",
      style: {
        fontSize: "20px",
      },
    },
    tooltip: {
      theme: "dark", // Ensure tooltip is readable
    },
  };

  const series = [
    {
      name: "Wallet Balance",
      data: walletData.map((d) => d.balance),
    },
  ];

  return (
    <div className="chart-container">
      <Chart
        options={options}
        series={series}
        type="bar"
        height="300"
        width="650"
      />
    </div>
  );
};

export default BarChart;
