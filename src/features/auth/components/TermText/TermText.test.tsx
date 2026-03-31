import { render, fireEvent } from "@testing-library/react-native";
import { TermsText } from "./TermText";

describe("TermsText", () => {
  it("renders the full text with links", () => {
    const { getByText } = render(<TermsText />);
    expect(getByText("Terms of Service")).toBeTruthy();
    expect(getByText("Privacy Policy")).toBeTruthy();
  });

  it("calls onPress for Terms of Service and Privacy Policy", () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const { getByText } = render(<TermsText />);
    fireEvent.press(getByText("Terms of Service"));
    fireEvent.press(getByText("Privacy Policy"));

    expect(consoleLogSpy).toHaveBeenCalledWith("Terms");
    expect(consoleLogSpy).toHaveBeenCalledWith("Privacy");

    consoleLogSpy.mockRestore();
  });
});