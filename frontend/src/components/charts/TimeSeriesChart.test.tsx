import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import TimeSeriesChart from "./TimeSeriesChart";
import { Mock, vi } from "vitest";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ITps } from "../../models";
import { getTransactionsPerSecond } from "../../services/api";

// Mock the getWalletBalances function
vi.mock("../../services/api");

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
const testData: ITps[] = [{ timestamp: 1721389287273, tps: 50 }];

test("renders without crashing", () => {
  (getTransactionsPerSecond as Mock).mockResolvedValue(testData);

  expect(() => render(<TimeSeriesChart />)).not.toThrow();
});

test("passes correct props to Chart", async () => {
  (getTransactionsPerSecond as Mock).mockResolvedValue(testData);

  await act(async () => {
    render(<TimeSeriesChart />);
  });
  const chartProps = mockedChart.mock.calls[2][0] as ChartProps;
  expect(chartProps.series[0].data[0].x).toEqual(testData[0].timestamp);
  expect(chartProps.series[0].data[0].y).toEqual(testData[0].tps);
});
