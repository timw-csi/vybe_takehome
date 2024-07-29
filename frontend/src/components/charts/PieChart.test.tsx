import { act, render } from "@testing-library/react";
import PieChart from "./PieChart";
import { Mock, vi } from "vitest";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getMarketCapDistribution } from "../../services/api";

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
};
const testData = [
  { symbol: "Token1", marketCap: 10 },
  { symbol: "Token2", marketCap: 20 },
];
test("renders without crashing", () => {
  (getMarketCapDistribution as Mock).mockResolvedValue(testData);

  expect(() => render(<PieChart />)).not.toThrow();
});

test("passes correct props to Chart", async () => {
  (getMarketCapDistribution as Mock).mockResolvedValue(testData);
  await act(async () => {
    render(<PieChart />);
  });

  const chartProps = mockedChart.mock.calls[2][0] as ChartProps;
  expect(chartProps.series).toEqual([
    testData[0].marketCap,
    testData[1].marketCap,
  ]);
});
