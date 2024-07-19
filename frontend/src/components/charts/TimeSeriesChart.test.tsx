import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TimeSeriesChart from "./TimeSeriesChart";

test("renders TimeSeriesChart with correct data", () => {
  const data = [{ x: Date.now(), y: 50 }];
  const { getByText } = render(<TimeSeriesChart data={data} />);

  expect(getByText("50")).toBeInTheDocument();
});
