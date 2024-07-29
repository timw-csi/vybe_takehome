import { act, render } from "@testing-library/react";
import BarChart from "./BarChart";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Mock, vi } from "vitest";
import { getWalletBalances } from "../../services/api";
import { IWalletBalance } from "../../models";

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
    data: Array<number>;
  }>;
  type: string;
  width: string | number;
};

const mockWalletBalances: IWalletBalance[] = [
  { wallet: "Wallet 1", balance: 100 },
  { wallet: "Wallet 2", balance: 200 },
  { wallet: "Wallet 3", balance: 300 },
];

test("renders without crashing", async () => {
  (getWalletBalances as Mock).mockResolvedValue(mockWalletBalances);

  expect(() => render(<BarChart />)).not.toThrow();
});

test("passes correct props to Chart", async () => {
  (getWalletBalances as Mock).mockResolvedValue(mockWalletBalances);

  await act(async () => {
    render(<BarChart />);
  });
  const chartProps = mockedChart.mock.calls[2][0] as ChartProps;
  expect(chartProps.series[0].data).toEqual([
    mockWalletBalances[0].balance,
    mockWalletBalances[1].balance,
    mockWalletBalances[2].balance,
  ]);
});
