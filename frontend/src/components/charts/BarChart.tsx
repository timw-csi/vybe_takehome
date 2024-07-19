// src/components/Charts/BarChart.tsx
import React from "react";
import Chart from "react-apexcharts";

interface BarChartProps {
  data: { x: string; y: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const options = {
    chart: {
      id: "wallet-balances",
    },
    xaxis: {
      categories: data.map((d) => d.x),
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  const series = [
    {
      name: "Wallet Balances",
      data: data.map((d) => d.y),
    },
  ];

  return <Chart options={options} series={series} type="bar" width="700" />;
};

export default BarChart;
