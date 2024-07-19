import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TimeSeriesChart from "./TimeSeriesChart";
import { vi } from "vitest";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

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
  const testData = [{ x: 1721389287273, y: 50 }];
  expect(() => render(<TimeSeriesChart data={testData} />)).not.toThrow();
});

test("passes correct props to Chart", () => {
  const testData = [{ x: 1721389287273, y: 50 }];
  render(<TimeSeriesChart data={testData} />);
  const chartProps = mockedChart.mock.calls[0][0] as ChartProps;
  expect(chartProps.series[0].data).toEqual(testData);
});
