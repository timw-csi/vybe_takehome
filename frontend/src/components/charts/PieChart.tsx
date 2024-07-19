import React from "react";
import Chart from "react-apexcharts";

interface PieChartProps {
  data: { labels: string[]; series: number[] };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const options = {
    labels: data.labels,
  };

  return (
    <Chart options={options} series={data.series} type="pie" width="380" />
  );
};

export default PieChart;
