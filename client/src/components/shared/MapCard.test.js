import React from "react";
import { render, fireEvent, debug } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MapCard from "components/shared/MapCard";

describe("<MapCard />", () => {
  test("when user hovers over MapCard's header, the mouse cursor should turn into a move icon", () => {
    const { queryByTestId, debug } = render(<MapCard title="test" />);
    const header = queryByTestId("mapcard-header");
    fireEvent.mouseOver(header);
    expect(header).toHaveStyle(`cursor: move`);
  });
});
