import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getMarketCapDistribution } from "../../services/api";
import { IMarketCap } from "../../models";
import { SPL_TOKENS } from "../../config/constants";

// moved data fetching to individual chart components to avoid unnecessary re-rendering
const PieChart: React.FC = () => {
  const [marketCapData, setMarketCapData] = useState<IMarketCap[]>([]);

  useEffect(() => {
    async function fetchMarketCapData() {
      const marketCap = await getMarketCapDistribution(SPL_TOKENS);
      setMarketCapData(
        marketCap.map((item: IMarketCap) => ({
          symbol: item.symbol,
          marketCap: item.marketCap,
        }))
      );
    }

    fetchMarketCapData();
  }, []);

  const options = {
    chart: {
      id: "marketCap",
      foreColor: "#ffffff",
    },
    title: {
      text: "Market Capitalization Share (billions)",
      style: {
        fontSize: "20px",
      },
    },
    tooltip: {
      theme: "dark", // Ensure tooltip is readable
    },
    labels: marketCapData.map((d) => d.symbol),
  };

  const series = marketCapData.map((d) => d.marketCap);

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="pie" width="380" />
    </div>
  );
};

export default PieChart;
