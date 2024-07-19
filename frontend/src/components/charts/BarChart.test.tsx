import React from "react";
import { render } from "@testing-library/react";
import BarChart from "./BarChart";

test("renders BarChart with correct data", () => {
  const data = [
    { x: "Wallet1", y: 100 },
    { x: "Wallet2", y: 200 },
  ];
  const { getByText } = render(<BarChart data={data} />);

  expect(getByText("Wallet1")).toBeInTheDocument();
  expect(getByText("Wallet2")).toBeInTheDocument();
});
