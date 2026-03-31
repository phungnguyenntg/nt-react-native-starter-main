import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { TextInput } from "react-native";
import { SignInForm } from "./SignInForm";

jest.mock("@/assets/icons/biometric.svg", () => "BiometricIcon");

jest.mock("react-native-advanced-checkbox", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    AdvancedCheckbox: ({ label, value, onValueChange }: any) => (
      <Text
        testID="biometric-checkbox"
        onPress={() => onValueChange(!value)}
      >
        {label} - {value ? "checked" : "unchecked"}
      </Text>
    ),
  };
});

describe("SignInForm", () => {
  const mockOnSignIn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields", () => {
    const { getByText } = render(
      <SignInForm onSignIn={mockOnSignIn} />
    );

    expect(getByText("Username")).toBeTruthy();
    expect(getByText("Password")).toBeTruthy();
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Forgot Password?")).toBeTruthy();
  });

  it("shows validation errors when submitting empty form", async () => {
    const { getByText, findByText } = render(
      <SignInForm onSignIn={mockOnSignIn} />
    );

    fireEvent.press(getByText("Sign In"));

    expect(await findByText("Username is required")).toBeTruthy();
    expect(await findByText("Password is required")).toBeTruthy();

    expect(mockOnSignIn).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    const { getByText, UNSAFE_getAllByType } = render(
      <SignInForm onSignIn={mockOnSignIn} />
    );

    const inputs = UNSAFE_getAllByType(TextInput);

    const usernameInput = inputs[0];
    const passwordInput = inputs[1];

    fireEvent.changeText(usernameInput, "john");
    fireEvent.changeText(passwordInput, "123456");

    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(mockOnSignIn).toHaveBeenCalledWith({
        username: "john",
        password: "123456",
        useBiometrics: false,
      });
    });
  });

  it("toggles biometrics checkbox", () => {
    const { getByTestId, getByText } = render(
      <SignInForm onSignIn={mockOnSignIn} />
    );

    const checkbox = getByTestId("biometric-checkbox");

    expect(getByText(/unchecked/)).toBeTruthy();

    fireEvent.press(checkbox);

    expect(getByText(/checked/)).toBeTruthy();
  });

  it("submits with biometrics enabled", async () => {
    const { getByText, getByTestId, UNSAFE_getAllByType } = render(
      <SignInForm onSignIn={mockOnSignIn} />
    );

    const inputs = UNSAFE_getAllByType(TextInput);
    const checkbox = getByTestId("biometric-checkbox");

    fireEvent.changeText(inputs[0], "john");
    fireEvent.changeText(inputs[1], "123456");

    fireEvent.press(checkbox);

    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(mockOnSignIn).toHaveBeenCalledWith({
        username: "john",
        password: "123456",
        useBiometrics: true,
      });
    });
  });
});