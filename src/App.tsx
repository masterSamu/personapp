import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

const tableHeaders = ["firstname", "lastname", "age", "edit", "delete"];

function App() {
  const [persons, setPersons] = useState<Array<object>>([]);
  const [error, setError] = useState<string | boolean>(false);
  const [succesfull, setSuccesfull] = useState<string | boolean>(false);
  const [formMessageClass, setFormMessageClass] = useState<string>("form-message");
  const [message, setMessage] = useState<string | boolean>("");

  useEffect(() => {
    if (error !== false) {
      setFormMessageClass("form-message error")
      setMessage(error);
    } else if (succesfull !== false) {
      setFormMessageClass("form-message success")
      setMessage(succesfull);
    }
  }, [error, succesfull])

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
        <p className={formMessageClass} data-testid="form-message">{message}</p>
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
