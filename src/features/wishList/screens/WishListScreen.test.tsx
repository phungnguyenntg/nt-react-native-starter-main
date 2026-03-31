// SettingScreen.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { WishListScreen } from "./WishListScreen";

describe("WishListScreen", () => {
  it("renders the screen text correctly", () => {
    const { getByText } = render(<WishListScreen />);
    expect(getByText("Wish List Screen")).toBeTruthy();
  });
});