import React from "react";
import { render } from "@testing-library/react-native";
import { RatingStar } from "./RatingStar";

describe("RatingStar", () => {
  it("renders the correct number of filled and empty stars", () => {
    const { getAllByTestId } = render(<RatingStar rating={3} />);

    const filledStars = getAllByTestId("filled-star");
    const emptyStars = getAllByTestId("empty-star");

    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });

  it("renders all empty stars if rating is 0", () => {
    const { queryAllByTestId } = render(<RatingStar rating={0} />);
    expect(queryAllByTestId("filled-star")).toHaveLength(0);
    expect(queryAllByTestId("empty-star")).toHaveLength(5);
  });

  it("renders all filled stars if rating is 5", () => {
    const { getAllByTestId, queryAllByTestId } = render(<RatingStar rating={5} />);
    expect(getAllByTestId("filled-star")).toHaveLength(5);
    expect(queryAllByTestId("empty-star")).toHaveLength(0);
  });
});