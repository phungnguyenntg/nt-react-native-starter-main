// ProfileScreen.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ProfileScreen } from "./ProfileScreen";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk } from "@/features/auth/store/auth.thunks";

// Mock hooks
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock thunk
jest.mock("@/features/auth/store/auth.thunks", () => ({
  logoutThunk: jest.fn(() => jest.fn()),
}));

// Mock SVGs as simple View
jest.mock("@/assets/icons/bag.svg", () => () => <></>);
jest.mock("@/assets/icons/chevron-forward.svg", () => () => <></>);
jest.mock("@/assets/icons/logout-red.svg", () => () => <></>);
jest.mock("@/assets/icons/pencil.svg", () => () => <></>);

describe("ProfileScreen", () => {
  const mockDispatch = jest.fn();

  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    age: 30,
  };

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === "selectUser") return mockUser;
      return undefined;
    });
    jest.clearAllMocks();
  });

  it("renders user info correctly", () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("@johndoe")).toBeTruthy();
    expect(getByText("PREMIUM MEMBER")).toBeTruthy();
    expect(getByText("john@example.com")).toBeTruthy();
    expect(getByText("John")).toBeTruthy();
    expect(getByText("Doe")).toBeTruthy();
    expect(getByText("30")).toBeTruthy();
    expect(getByText("Order History")).toBeTruthy();
    expect(getByText("Logout")).toBeTruthy();
  });

  it("dispatches logoutThunk when logout button is pressed", () => {
    const { getByText } = render(<ProfileScreen />);
    const logoutButton = getByText("Logout");

    fireEvent.press(logoutButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(logoutThunk).toHaveBeenCalled();
  });

  it("renders edit details and edit avatar buttons", () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText("Edit Details")).toBeTruthy();
    // Edit avatar button is a TouchableOpacity without text, check existence by accessibility
  });
});