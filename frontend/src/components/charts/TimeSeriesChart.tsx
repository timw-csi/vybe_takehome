import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ITps } from "../../models";
import { getTransactionsPerSecond } from "../../services/api";
import { ONE_MINUTE } from "../../config/constants";

// moved data fetching to individual chart components to avoid unnecessary re-rendering
const TimeSeriesChart: React.FC = () => {
  const [tpsData, setTpsData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    async function fetchTPS() {
      const tps = await getTransactionsPerSecond();
      setTpsData(tps.map((item: ITps) => ({ x: item.timestamp, y: item.tps })));
    }

    // initial data fetch
    fetchTPS();

    // Set interval to fetch data every minute
    const intervalId = setInterval(fetchTPS, ONE_MINUTE);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const options: ApexOptions = {
    chart: {
      id: "tps-chart",
      foreColor: "#ffffff",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: (val: number) => {
          return `${val.toFixed(2)} TPS`;
        },
      },
      title: {
        text: "Transactions Per Second",
        style: {
          fontSize: "20px",
        },
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
      y: {
        formatter: (val: number) => {
          return `${val.toFixed(2)} TPS`;
        },
      },
    },
  };

  const series = [
    {
      name: "Transactions Per Second",
      data: tpsData,
    },
  ];

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="line" width="500" />
    </div>
  );
};

export default TimeSeriesChart;
