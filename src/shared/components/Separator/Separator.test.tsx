import React from "react";
import { render } from "@testing-library/react-native";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Separator />);
    const separator = getByTestId("separator");
    expect(separator).toBeTruthy();
  });
});