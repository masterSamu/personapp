import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";

const padding = "5px";
const borderRadius = "5px";
const boxShadow = "0px 0px 7px 1px #cd9cf2";
const defaultStyle = {
  backgroundColor: "#f3e9fa",
  padding: padding,
  border: "1px solid #cd9cf2",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};
const focus = {
  backgroundColor: "#FFFFFF",
  padding: padding,
  border: "1px solid #ADADAD",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};
const invalidValue = {
  backgroundColor: "#ffd9d9",
  padding: padding,
  border: "1px solid #FFA6A6",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};
const validValue = {
  backgroundColor: "#caf5c7",
  padding: padding,
  border: "1px solid #68F261",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};

test("renders component without crashing", () => {
  render(<Input type="text" value="" setValue={jest.fn()} />);
  const input = screen.getByTestId("input-component");
  expect(input).toBeInTheDocument();
});

test("doesn't render required text when required prop is false", () => {
  render(<Input type="text" value="" setValue={jest.fn()} required={false} />);
  const required = screen.queryByTestId("input-required");
  expect(required).not.toBeInTheDocument();
});

test("renders required text when required prop is true", () => {
  render(<Input type="text" value="" setValue={jest.fn()} required={true} />);
  const required = screen.queryByTestId("input-required");
  expect(required).toBeInTheDocument();
});

test("renders feedback based on input", async () => {
  render(<Input type="text" setValue={jest.fn()} required={true} />);
  const input = screen.getByTestId("input-component");
  expect(input).toBeInTheDocument();
  fireEvent.focus(input);
  fireEvent.blur(input);
  const negativeFeedback = screen.queryByTestId("input-invalid");
  expect(negativeFeedback).toBeInTheDocument();
  expect(negativeFeedback).toHaveTextContent("bad");

  fireEvent.change(input, { target: { value: "Mike" } });
  fireEvent.blur(input);
  const positiveFeedback = screen.queryByTestId("input-valid");
  expect(positiveFeedback).toBeInTheDocument();
  expect(positiveFeedback).toHaveTextContent("good");
});

test("Input field styles are changing properly", () => {
  render(<Input type="text" setValue={jest.fn()} required={true} />);
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
