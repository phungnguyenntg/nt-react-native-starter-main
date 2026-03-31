import { render } from "@testing-library/react-native";
import { SettingScreen } from "./SettingScreen";

describe("SettingScreen", () => {
  it("renders the screen text correctly", () => {
    const { getByText } = render(<SettingScreen />);
    expect(getByText("Setting Screen")).toBeTruthy();
  });
});