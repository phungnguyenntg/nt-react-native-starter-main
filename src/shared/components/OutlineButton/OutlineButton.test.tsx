import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { OutlineButton } from "./OutlineButton";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

describe("OutlineButton", () => {
  it("renders with default colors", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <OutlineButton title="Click Me" onPress={mockPress} textColor={""} borderColor={""} />
    );

    const buttonText = getByText("Click Me");
    expect(buttonText).toBeTruthy();
  });

  it("applies custom textColor and borderColor", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <OutlineButton
        title="Custom Button"
        onPress={mockPress}
        textColor="red"
        borderColor="blue"
      />
    );

    const buttonText = getByText("Custom Button");
    const textStyle = StyleSheet.flatten(buttonText.props.style);
    expect(textStyle.color).toBe("red");
  });

  it("calls onPress when pressed", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <OutlineButton title="Press Me" onPress={mockPress} textColor={""} borderColor={""} />
    );

    const buttonText = getByText("Press Me");
    const touchable = buttonText.parent as any;

    fireEvent.press(touchable);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});