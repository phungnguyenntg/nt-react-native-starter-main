import { render, fireEvent } from "@testing-library/react-native";
import { CartScreen } from "./CartScreen";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "../store/cart.slice";

jest.mock("@/store/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("../store/cart.slice", () => ({
  clearCart: jest.fn(() => ({ type: "CLEAR_CART" })),
}));

describe("CartScreen", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it("renders cart items when cart is not empty", () => {
    (useAppSelector as jest.Mock).mockReturnValue([
      { id: "1", name: "Item 1", quantity: 2 },
      { id: "2", name: "Item 2", quantity: 1 },
    ]);

    const { getByText } = render(<CartScreen />);
    expect(getByText("Item 1 x 2")).toBeTruthy();
    expect(getByText("Item 2 x 1")).toBeTruthy();
    expect(getByText("Go to Purchase")).toBeTruthy();
    expect(getByText("Clear All")).toBeTruthy();
  });

  it("renders empty cart message when cart is empty", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    const { getByText } = render(<CartScreen />);
    expect(getByText("Empty Cart")).toBeTruthy();
  });

  it("dispatches clearCart when Clear All button is pressed", () => {
    (useAppSelector as jest.Mock).mockReturnValue([
      { id: "1", name: "Item 1", quantity: 2 },
    ]);

    const { getByText } = render(<CartScreen />);
    fireEvent.press(getByText("Clear All"));
    expect(mockDispatch).toHaveBeenCalledWith(clearCart());
  });
});