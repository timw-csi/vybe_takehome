import { render } from "@testing-library/react";
import PieChart from "./PieChart";
import { vi } from "vitest";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
const mockedChart = vi.mocked(Chart, true);
vi.mock("react-apexcharts", () => {
  return {
    default: vi.fn(() => null),
  };
});

type ChartProps = {
  options: ApexOptions;
  series: Array<{
    name?: string;
    data: Array<{ x: number; y: number }>;
  }>;
};

test("renders without crashing", () => {
  const testData = { labels: ["Token1", "Token2"], series: [10, 20] };
  expect(() => render(<PieChart data={testData} />)).not.toThrow();
});

test("passes correct props to Chart", () => {
  const testData = { labels: ["Token1", "Token2"], series: [10, 20] };
  render(<PieChart data={testData} />);
  const chartProps = mockedChart.mock.calls[0][0] as ChartProps;
  expect(chartProps.series).toEqual(testData.series);
});
