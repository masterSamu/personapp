import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form";

test("Form renders without crashing", () => {
  render(
    <Form
      data={[]}
      setData={jest.fn()}
      setError={jest.fn()}
      setSuccessfull={jest.fn()}
    />
  );
  const component = screen.getByTestId("form-add");
  expect(component).toBeInTheDocument();
});

test("Form renders 3 input fields, 2 text and 1 number type", () => {
  render(
    <Form
      data={[]}
      setData={jest.fn()}
      setError={jest.fn()}
      setSuccessfull={jest.fn()}
    />
  );
  const component = screen.getByTestId("form-add");
  expect(component).toBeInTheDocument();
  const inputs = screen.queryAllByTestId("input-component");
  expect(inputs.length).toBe(3);
  const textInputs = inputs.filter(
    (item) => item.getAttribute("type") === "text"
  );
  const numberInputs = inputs.filter(
    (item) => item.getAttribute("type") === "number"
  );
  expect(textInputs.length).toBe(2);
  expect(numberInputs.length).toBe(1);
});

test("Renders submit button", () => {
  render(
    <Form
      data={[]}
      setData={jest.fn()}
      setError={jest.fn()}
      setSuccessfull={jest.fn()}
    />
  );
  const submitBtn = screen.getByText("Submit");
  expect(submitBtn).toBeInTheDocument();
});
