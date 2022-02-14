import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

const tableHeaders = ["firstname", "lastname", "age", "edit", "delete"];

function App() {
  const [persons, setPersons] = useState<Array<object>>([]);
  const [error, setError] = useState<string | boolean>(false);
  const [succesfull, setSuccesfull] = useState<string | boolean>(false);

  return (
    <div className="App">
      <h1>Person App</h1>
      <div className="form-container">
        <Form
          setData={setPersons}
          data={persons}
          setError={setError}
          setSuccessfull={setSuccesfull}
        />
        {error !== false && <p className="error">{error}</p>}
        {succesfull !== false && (
          <p className="success" data-testid="succesfull-message">{succesfull}</p>
        )}
      </div>
      <div className="table-container">
        {persons.length > 0 ? (
          <Table
            tableHeaders={tableHeaders}
            tableData={persons}
            setData={setPersons}
          />
        ) : (
          <p data-testid="no-data-message">
            No data to show, maybe you should add person in form above.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
