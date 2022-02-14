
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headerElement = screen.getByText("Person App");
  expect(headerElement).toBeInTheDocument();
});

test("render a message instead of a table, if there is no data added", () => {
  render(<App />);
  const tableElement = screen.queryByTestId("table-person");
  expect(tableElement).not.toBeInTheDocument();
  const message = screen.queryByTestId("no-data-message");
  expect(message).toBeInTheDocument();
})

