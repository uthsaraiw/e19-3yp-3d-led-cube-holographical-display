import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageButton from "./ImageButton";

test("renders ImageButton and checks click event", () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(<ImageButton handleClick={handleClick} />);

  // Get the button element
  const button = getByTestId("image-button");

  // Simulate a click event on the button element
  fireEvent.click(button);

  // Check if the handleClick was called
  expect(handleClick).toHaveBeenCalled();
});
