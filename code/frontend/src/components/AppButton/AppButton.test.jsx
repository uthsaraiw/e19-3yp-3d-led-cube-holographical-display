import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppButton from "./AppButton";

test("renders AppButton and checks click event", () => {
  const onClickFunction = jest.fn();
  const { getByRole } = render(
    <AppButton title="Test Button" onClickFunction={onClickFunction} />
  );

  // Get the button element
  const button = getByRole("button");

  // Check if the button has the correct text
  expect(button).toHaveTextContent("Test Button");

  // Simulate a click event on the button element
  fireEvent.click(button);

  // Check if the onClickFunction was called
  expect(onClickFunction).toHaveBeenCalled();
});
