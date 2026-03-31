import { render, fireEvent } from "@testing-library/react-native";
import { ProductItem } from "./ProductItem";
import { Product } from "@/types/product";

jest.mock("@/assets/icons/heart-grey.svg", () => "HeartIcon");

describe("ProductItem", () => {
  const product : Product = {
    id: 1,
    name: "Electronics Phone",
    image: "https://example.com/phone.jpg",
    price: 199.99,
    description: "A great smartphone",
    priceUnit: "dollar",
  };

  const onAddPress = jest.fn();
  const onPress = jest.fn();

  beforeEach(() => {
    onAddPress.mockClear();
    onPress.mockClear();
  });

  it("renders product details correctly", () => {
    const { getByText } = render(
      <ProductItem product={product} onAddPress={onAddPress} onPress={onPress} />
    );

    expect(getByText("Electronics Phone")).toBeTruthy();
    expect(getByText("Electronics")).toBeTruthy();
    expect(getByText("$199.99")).toBeTruthy();
  });

  it("calls onPress when card is pressed", () => {
    const { getByText } = render(
      <ProductItem product={product} onAddPress={onAddPress} onPress={onPress} />
    );

    fireEvent.press(getByText("Electronics Phone"));
    expect(onPress).toHaveBeenCalled();
  });

  it("calls onAddPress when add button is pressed", () => {
    const { getByText } = render(
      <ProductItem product={product} onAddPress={onAddPress} onPress={onPress} />
    );

    fireEvent.press(getByText("+"));
    expect(onAddPress).toHaveBeenCalled();
  });
});