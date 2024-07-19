import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface TimeSeriesChartProps {
  data: { x: number; y: number }[];
}

// can't get y-axis tooltip to work
const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      id: "tps-chart",
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
      },
    },
    tooltip: {
      shared: false,
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
      data,
    },
  ];

  return <Chart options={options} series={series} type="line" width="500" />;
};

export default TimeSeriesChart;
