import React from "react";
import { render } from "@testing-library/react";
import PieChart from "./PieChart";

test("renders PieChart with correct data", () => {
  const data = { labels: ["Token1", "Token2"], series: [10, 20] };
  const { getByText } = render(<PieChart data={data} />);

  expect(getByText("Token1")).toBeInTheDocument();
  expect(getByText("Token2")).toBeInTheDocument();
});
