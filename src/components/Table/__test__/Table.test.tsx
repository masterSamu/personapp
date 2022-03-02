import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../Table";

const tableHeaders = ["firstname", "lastname", "age", "edit", "delete"];
const tableData = [{ firstname: "James", lastname: "Bond", age: 25, id: 0 }];

test("render without crashing", () => {
  render(
    <Table tableHeaders={tableHeaders} tableData={[]} setData={jest.fn()} />
  );
  const component = screen.getByTestId("table-person");
  expect(component).toBeInTheDocument();
});

test("render table data", () => {
  render(
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      setData={jest.fn()}
    />
  );
  const component = screen.getByTestId("table-person");
  expect(component).toBeInTheDocument();
  const firstname = screen.getByTestId("td-firstname");
  expect(firstname).toBeInTheDocument();
  expect(firstname).toHaveTextContent("James");

  const lastname = screen.getByTestId("td-lastname");
  expect(lastname).toBeInTheDocument();
  expect(lastname).toHaveTextContent("Bond");

  const age = screen.getByTestId("td-age");
  expect(age).toBeInTheDocument();
  expect(age).toHaveTextContent("25");

  const edit = screen.getByTestId("td-edit");
  expect(edit).toBeInTheDocument();

  const del = screen.getByTestId("td-delete");
  expect(del).toBeInTheDocument();
});

test("click edit button on row and check if inputs and save button are visible", () => {
  render(
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      setData={jest.fn()}
    />
  );
  const component = screen.getByTestId("table-person");
  expect(component).toBeInTheDocument();
  const editBtn = screen.getByTestId("btn-edit");
  expect(editBtn).toBeInTheDocument();
  fireEvent.click(editBtn);
  const saveBtn = screen.getByTestId("btn-save");
  expect(saveBtn).toBeInTheDocument();
  const inputs = screen.queryAllByTestId("input-component");
  expect(inputs).toHaveLength(3);
});
