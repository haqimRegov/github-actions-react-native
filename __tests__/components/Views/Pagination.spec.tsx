import { render } from "@testing-library/react-native";
import React from "react";

import { Pagination } from "../../../src/components";

it("render a basic Pagination", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<Pagination onPressNext={mockFn} onPressPrev={anotherMockFn} page={1} totalPages={3} />);
});
