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

// ProductDetailScreen.test.tsx

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

    it("renders product detail correctly", () => {
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

        render(<ProductDetailScreen route={mockRoute} navigation={mockNavigation} />);

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
});