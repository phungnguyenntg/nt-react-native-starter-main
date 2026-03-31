import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { LogInScreen } from "./LoginScreen";
import { useAppDispatch } from "@/store/hooks";
import { Alert } from "react-native";

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("../store/auth.thunks", () => ({
  loginThunk: jest.fn((payload) => payload),
}));

jest.mock("../components/SignInForm", () => {
  const React = require("react");
  const { View, Text, TextInput, TouchableOpacity } = require("react-native");
  return {
    SignInForm: ({ onSignIn }: any) => (
      <View>
        <TextInput testID="username-input" />
        <TextInput testID="password-input" />
        <TouchableOpacity
          onPress={() =>
            onSignIn({ username: "john", password: "123456", useBiometrics: false })
          }
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

jest.mock("../components/SignUpForm", () => {
  const { Text } = require("react-native");
  return { SignUpForm: () => <Text>Sign Up Form</Text> };
});

jest.mock("../components/MediaLoginSection", () => {
  const { Text } = require("react-native");
  return { MediaLoginSection: () => <Text>Media Login Section</Text> };
});

jest.mock("../components/TermText", () => {
  const { Text } = require("react-native");
  return { TermsText: () => <Text>Terms Text</Text> };
});

jest.mock("@/assets/icons/logo.svg", () => "Logo");

describe("LogInScreen", () => {
  const mockDispatch = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders welcome texts and media/terms sections", () => {
    const { getByText } = render(<LogInScreen />);
    expect(getByText("Welcome Back")).toBeTruthy();
    expect(getByText("Please enter your details")).toBeTruthy();
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Media Login Section")).toBeTruthy();
    expect(getByText("Terms Text")).toBeTruthy();
  });

  it("switches to Sign Up tab and displays SignUpForm", () => {
    const { getByText } = render(<LogInScreen />);
    fireEvent.press(getByText("Sign Up"));
    expect(getByText("Sign Up Form")).toBeTruthy();
  });

  it("handles successful sign in", async () => {
    const { getByText } = render(<LogInScreen />);
    fireEvent.press(getByText("Sign In"));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ username: "john", password: "123456" });
    });
  });

  it("handles login failure and shows alert", async () => {
    mockDispatch.mockImplementationOnce(() => Promise.reject(new Error("Invalid credentials")));
    const { getByText } = render(<LogInScreen />);
    fireEvent.press(getByText("Sign In"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Login Failed", "Invalid credentials");
    });
  });
});