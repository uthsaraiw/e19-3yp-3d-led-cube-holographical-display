import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppInput from "./AppInput";

test("renders AppInput and checks input change", () => {
  const handleInputChange = jest.fn();
  const { getByRole } = render(
    <AppInput type="text" handleInputChange={handleInputChange} />
  );

  // Get the input element
  const inputElement = getByRole("textbox");

  // Simulate a change event on the input element
  fireEvent.change(inputElement, { target: { value: "Test input" } });

  // Check if the change event handler was called
  expect(handleInputChange).toHaveBeenCalled();
});
