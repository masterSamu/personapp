import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from "../Input";

const padding = "5px";
const borderRadius = "5px";

const defaultStyle = {
  backgroundColor: "rgb(253 251 217)",
  padding: padding,
  border: "2px solid #000",
  borderRadius: borderRadius,
};

const focus = {
  backgroundColor: "#FFFFFF",
  padding: padding,
  border: "2px solid #000",
  borderRadius: borderRadius,
};

const invalidValue = {
  backgroundColor: "rgb(255 227 226)",
  padding: padding,
  border: "2px solid #f70d1a",
  borderRadius: borderRadius,
};

const validValue = {
  backgroundColor: "rgb(213 253 213)",
  padding: padding,
  border: "2px solid #0B890F",
  borderRadius: borderRadius,
};

test('renders learn react link', () => {
  render(<Input type="text" setValue={jest.fn()} />);
  const input = screen.getByTestId("input-component");
  expect(input).toBeInTheDocument();
});

test("doesn't render required text when required prop is false", () => {
  render(<Input type="text" setValue={jest.fn()} isRequired={false} />);
  const required = screen.queryByTestId("input-required");
  expect(required).not.toBeInTheDocument();
})

test("renders required text when required prop is true", () => {
  render(<Input type="text" setValue={jest.fn()} isRequired={true} />);
  const required = screen.queryByTestId("input-required");
  expect(required).toBeInTheDocument();
})

test ("renders feedback based on input", async () => {
  render(<Input type="text" setValue={jest.fn()} isRequired={true} />);
  const input = screen.getByTestId("input-component")
  expect(input).toBeInTheDocument();
  fireEvent.focus(input);
  fireEvent.blur(input)
  const negativeFeedback = screen.queryByTestId("input-invalid");
  expect(negativeFeedback).toBeInTheDocument();
  expect(negativeFeedback).toHaveTextContent("bad value");
  
  fireEvent.change(input, { target: { value: "Mike" } });
  fireEvent.blur(input);
  const positiveFeedback = screen.queryByTestId("input-valid");
  expect(positiveFeedback).toBeInTheDocument();
  expect(positiveFeedback).toHaveTextContent("good");


})

test("Input field styles are changing properly", () => {
  render(<Input type="text" setValue={jest.fn()} isRequired={true} />);
  const input = screen.getByTestId("input-component");

  expect(input).toHaveStyle(defaultStyle);

  fireEvent.focus(input);
  expect(input).toHaveStyle(focus);

  fireEvent.blur(input);
  expect(input).toHaveStyle(invalidValue);
  
  fireEvent.change(input, { target: { value: "Mike" } });
  fireEvent.blur(input);
  expect(input).toHaveStyle(validValue);

  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.blur(input);
  expect(input).toHaveStyle(invalidValue);
});