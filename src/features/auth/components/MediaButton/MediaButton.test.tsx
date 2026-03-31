import { render, fireEvent } from "@testing-library/react-native";
import { StyleSheet, Text } from "react-native";
import { MediaButton } from "./MediaButton";

describe("MediaButton", () => {
  const mockOnPress = jest.fn();

  const defaultProps = {
    label: "Click Me",
    onPress: mockOnPress,
    icon: <Text testID="icon">🎵</Text>,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <MediaButton {...defaultProps} />
    );

    expect(getByTestId("media-button")).toBeTruthy();
    expect(getByText("Click Me")).toBeTruthy();
    expect(getByTestId("icon")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByTestId } = render(
      <MediaButton {...defaultProps} />
    );

    fireEvent.press(getByTestId("media-button"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const { getByTestId } = render(
      <MediaButton {...defaultProps} disabled />
    );

    fireEvent.press(getByTestId("media-button"));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("applies disabled opacity style", () => {
    const { getByTestId } = render(
      <MediaButton {...defaultProps} disabled />
    );

    const button = getByTestId("media-button");

    expect(button.props.style).toMatchObject({
      opacity: 0.6,
    });
  });

  it("applies custom styles", () => {
  const customStyle = { backgroundColor: "red" };
  const customLabelStyle = { color: "blue" };

  const { getByTestId, getByText } = render(
    <MediaButton
      {...defaultProps}
      style={customStyle}
      labelStyle={customLabelStyle}
    />
  );

  const button = getByTestId("media-button");
  const label = getByText("Click Me");

  const buttonStyle = StyleSheet.flatten(button.props.style);
  const labelStyle = StyleSheet.flatten(label.props.style);

  expect(buttonStyle.backgroundColor).toBe("red");
  expect(labelStyle.color).toBe("blue");
});
});