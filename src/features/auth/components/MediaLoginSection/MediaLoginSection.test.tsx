import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { MediaLoginSection } from "./MediaLoginSection";

jest.mock("../MediaButton", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    MediaButton: ({ label, onPress }: any) => (
      <Text onPress={onPress} testID={`media-btn-${label}`}>
        {label}
      </Text>
    ),
  };
});
jest.mock("@/assets/icons/google.svg", () => "GoogleIcon");
jest.mock("@/assets/icons/facebook.svg", () => "FacebookIcon");

describe("MediaLoginSection", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders divider text", () => {
    const { getByText } = render(<MediaLoginSection />);
    expect(getByText("Or continue with")).toBeTruthy();
  });

  it("renders Google and Facebook buttons", () => {
    const { getByTestId } = render(<MediaLoginSection />);

    expect(getByTestId("media-btn-Google")).toBeTruthy();
    expect(getByTestId("media-btn-Facebook")).toBeTruthy();
  });

  it("handles Google button press", () => {
    const { getByTestId } = render(<MediaLoginSection />);

    fireEvent.press(getByTestId("media-btn-Google"));

    expect(consoleSpy).toHaveBeenCalledWith("Google pressed");
  });

  it("handles Facebook button press", () => {
    const { getByTestId } = render(<MediaLoginSection />);

    fireEvent.press(getByTestId("media-btn-Facebook"));

    expect(consoleSpy).toHaveBeenCalledWith("Facebook pressed");
  });
});