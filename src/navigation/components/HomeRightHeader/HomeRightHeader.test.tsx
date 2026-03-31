import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { HomeRightHeader } from "./HomeRightHeader";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/store/hooks";

jest.mock("@/store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("@/assets/icons/shopping-cart.svg", () => "CartLogo");
jest.mock("@/assets/icons/bell.svg", () => "BellLogo");

describe("HomeRightHeader", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
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

  it("navigates to Cart when cart icon is pressed", () => {
    (useAppSelector as jest.Mock).mockReturnValue(2);

    const { getByText } = render(<HomeRightHeader />);

    const cartButton = getByText("2").parent;
    fireEvent.press(cartButton!);
    expect(mockNavigate).toHaveBeenCalledWith("Cart");
  });
});