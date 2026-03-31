// HomeRightHeader.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { HomeRightHeader } from "./HomeRightHeader";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/store/hooks";

// Mock hooks
jest.mock("@/store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mock SVGs
jest.mock("@/assets/icons/shopping-cart.svg", () => "CartLogo");
jest.mock("@/assets/icons/bell.svg", () => "BellLogo");

// Mock IconButton để expose onPress
jest.mock("@/shared/components/IconButton/IconButton", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    IconButton: ({ onPress, label }: any) => (
      <Text onPress={onPress}>{label || ""}</Text>
    ),
  };
});

describe("HomeRightHeader", () => {
  const mockNavigate = jest.fn();
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders cart count when cartCount > 0", () => {
    (useAppSelector as jest.Mock).mockReturnValue(3);

    const { getByText } = render(<HomeRightHeader />);
    expect(getByText("3")).toBeTruthy();
  });

  it("renders empty label when cartCount is 0", () => {
    (useAppSelector as jest.Mock).mockReturnValue(0);

    const { queryByText } = render(<HomeRightHeader />);
    expect(queryByText("0")).toBeNull();
  });

  it("calls console.log when bell icon is pressed", () => {
    (useAppSelector as jest.Mock).mockReturnValue(0);

    const { getAllByText } = render(<HomeRightHeader />);
    const allEmptyButtons = getAllByText(""); // 2 IconButton có thể trùng label rỗng
    const bellButton = allEmptyButtons[0]; // Bell luôn đứng trước Cart
    fireEvent.press(bellButton);

    expect(consoleLogSpy).toHaveBeenCalledWith("Clicked Bell!");
  });

  it("navigates to Cart when cart icon is pressed", () => {
    (useAppSelector as jest.Mock).mockReturnValue(2);

    const { getByText } = render(<HomeRightHeader />);
    const cartButton = getByText("2"); // cartLabel hiển thị số
    fireEvent.press(cartButton);

    expect(mockNavigate).toHaveBeenCalledWith("Cart");
  });
});