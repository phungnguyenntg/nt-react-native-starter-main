import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ProductDetailScreen } from "./ProductDetailScreen";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProductDetail } from "../../store/product.thunks";
import { addToCart } from "@/features/cart/store/cart.slice";
import { Product } from "@/types/product";
import { Text } from "react-native";

// Mock navigation and route props
const mockNavigation = { navigate: jest.fn() } as any;
const mockRoute = { params: { productId: "1" } } as any;

// Mocks
jest.mock("@/shared/components/OutlineButton", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    OutlineButton: (props: any) => <Text onPress={props.onPress}>{props.title}</Text>,
  };
});

jest.mock("@/shared/components/FilltedButton", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    FilledButton: (props: any) => <Text onPress={props.onPress}>{props.title}</Text>,
  };
});

jest.mock("../../components/RatingStar", () => {
  const React = require("react");
  return {
    RatingStar: () => null,
  };
});

jest.mock("@/assets/icons/heart-grey.svg", () => () => "HeartIcon");

jest.mock("../../store/product.thunks", () => ({
    getProductDetail: jest.fn(),
}));

jest.mock("@/store/hooks", () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}));

describe("ProductDetailScreen", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === require("../../store/product.selectors").selectProductLoadingDetail) {
        return true; // loading
      }
      return null;
    });

    const { getByTestId } = render(<ProductDetailScreen route={mockRoute} navigation={mockNavigation} />);
    expect(getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("renders 'No product found' when productDetail is null", () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector.name === "selectProductLoadingDetail" ? false : null
    );

    const { getByText } = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByText("No product found")).toBeTruthy();
  });

  it("renders product detail with key features and description", () => {
    const productDetail: Product = {
      id: 1,
      name: "Product 1",
      image: "https://example.com/image.png",
      price: 99.99,
      description: "Desc",
      priceUnit: "dollar",
    };

    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector.name === "selectProductLoadingDetail") return false;
      if (selector.name === "selectProductDetail") return productDetail;
      return null;
    });

    const { getByText, getByTestId, queryByText } = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />
    );

    // Check product name and price
    expect(getByText(productDetail.name)).toBeTruthy();
    expect(getByText(`$${productDetail.price}`)).toBeTruthy();

    // Check Key Features section title
    expect(getByText("Key Features")).toBeTruthy();

    // Check each key feature title & value are rendered
    expect(getByText("Battery")).toBeTruthy();
    expect(getByText("48 Hours")).toBeTruthy();
    expect(getByText("Sync")).toBeTruthy();
    expect(getByText("Bluetooth 5.2")).toBeTruthy();
    expect(getByText("Water")).toBeTruthy();
    expect(getByText("5ATM Resist")).toBeTruthy();
    expect(getByText("Warranty")).toBeTruthy();
    expect(getByText("12 Months")).toBeTruthy();

    // Check Product Description section title and description text
    expect(getByText("Product Description")).toBeTruthy();
    expect(queryByText(/Experience the future on your wrist/)).toBeTruthy();

    // Check ScrollView exists by querying an element inside scrollable content (image alt not accessible but product name is)
    expect(getByText(productDetail.name)).toBeTruthy();

    // Check dispatch getProductDetail called on mount
    expect(mockDispatch).toHaveBeenCalledWith(getProductDetail(1));
  });

  it("dispatches addToCart when 'Add to Cart' is pressed", () => {
    const productDetail: Product = {
      id: 1,
      name: "Product 1",
      image: "https://example.com/image.png",
      price: 99.99,
      description: "Desc",
      priceUnit: "dollar",
    };

    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector.name === "selectProductLoadingDetail") return false;
      if (selector.name === "selectProductDetail") return productDetail;
      return null;
    });

    const { getByText } = render(<ProductDetailScreen route={mockRoute} navigation={mockNavigation} />);
    fireEvent.press(getByText("Add to Cart"));
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(productDetail));
  });

  it("calls handleBuyNow when 'Buy Now' pressed", () => {
  const productDetail: Product = {
    id: 1,
    name: "Product 1",
    image: "https://example.com/image.png",
    price: 99.99,
    description: "Desc",
    priceUnit: "dollar",
  };

  (useAppSelector as jest.Mock).mockImplementation(selector => {
    if (selector.name === "selectProductLoadingDetail") return false;
    if (selector.name === "selectProductDetail") return productDetail;
    return null;
  });

  const { getByText } = render(<ProductDetailScreen route={mockRoute} navigation={mockNavigation} />);
  fireEvent.press(getByText("Buy Now"));
  // handleBuyNow chưa dispatch gì, chỉ đảm bảo button press không crash
});

it("handles Read more press", () => {
  const productDetail: Product = {
    id: 1,
    name: "Product 1",
    image: "https://example.com/image.png",
    price: 99.99,
    description: "Desc",
    priceUnit: "dollar",
  };

  (useAppSelector as jest.Mock).mockImplementation(selector => {
    if (selector.name === "selectProductLoadingDetail") return false;
    if (selector.name === "selectProductDetail") return productDetail;
    return null;
  });

  const { getByText } = render(<ProductDetailScreen route={mockRoute} navigation={mockNavigation} />);
  fireEvent.press(getByText("Read more..."));
  // chỉ test press xảy ra, nếu bạn muốn handle expand thì cần thêm state logic
});
});