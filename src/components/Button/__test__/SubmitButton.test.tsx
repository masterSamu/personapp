import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../SubmitButton";

test("Button and text is rendering correctly", () => {
  const btnText = "Submit";
  render(<Button type="submit" text={btnText} />);
  const button = screen.getByTestId("submit-button-test");
  expect(button).toHaveTextContent(btnText);
});

test("Button changes style properly", () => {
  const btnText = "Subscribe";
  const padding = "7px 20px";
  const boxShadow = "0px 0px 7px 1px #cd9cf2";
  
  const defaultStyle = {
    padding: padding,
    backgroundColor: "#9DAAF2",
    color: "#000",
    cursor: "pointer",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#410370",
    borderRadius: "7px",
    boxShadow: boxShadow,
  };
  
  const mouseOver = {
    backgroundColor: "#b7bff1",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#410370",
    borderRadius: "7px",
    color: "#000",
    padding: padding,
    cursor: "pointer",
    boxShadow: boxShadow,
  };
  
  const active = {
    backgroundColor: "#b7bff1",
    color: "#000",
    padding: padding,
    cursor: "pointer",
    borderColor: "#9DAAF2",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "7px",
    boxShadow: boxShadow,
  };

  render(<Button type="submit" text={btnText} />);
  const button = screen.getByTestId("submit-button-test");
  expect(button).toHaveStyle(defaultStyle);

  fireEvent.mouseEnter(button);
  expect(button).toHaveStyle(mouseOver);

  fireEvent.mouseDown(button);
  expect(button).toHaveStyle(active);

  fireEvent.mouseUp(button);
  expect(button).toHaveStyle(mouseOver);

  fireEvent.mouseLeave(button);
  expect(button).toHaveStyle(defaultStyle);
});
