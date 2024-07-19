import { render } from "@testing-library/react";
import BarChart from "./BarChart";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { vi } from "vitest";

vi.mock("react-apexcharts", () => {
  return {
    default: vi.fn(() => null),
  };
});
const mockedChart = vi.mocked(Chart, true);

type ChartProps = {
  options: ApexOptions;
  series: Array<{
    name?: string;
    data: Array<{ x: number; y: number }>;
  }>;
  type: string;
  width: string | number;
};

test("renders without crashing", () => {
  const testData = [
    { x: "Wallet1", y: 100 },
    { x: "Wallet2", y: 200 },
  ];
  expect(() => render(<BarChart data={testData} />)).not.toThrow();
});

test("passes correct props to Chart", () => {
  const testData = [
    { x: "Wallet1", y: 100 },
    { x: "Wallet2", y: 200 },
  ];
  render(<BarChart data={testData} />);
  const chartProps = mockedChart.mock.calls[0][0] as ChartProps;
  expect(chartProps.series[0].data).toEqual([testData[0].y, testData[1].y]);
});
