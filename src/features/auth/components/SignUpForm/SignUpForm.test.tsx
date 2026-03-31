import { render } from "@testing-library/react-native";
import { SignUpForm } from "./SignUpForm";

describe("SignUpForm", () => {
  it("renders Sign Up text", () => {
    const { getByText } = render(<SignUpForm />);
    expect(getByText("Sign Up")).toBeTruthy();
  });
});