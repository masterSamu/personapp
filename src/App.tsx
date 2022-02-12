import React, {useState} from 'react';
import './App.css';
import Form from './components/Form/Form';
import Table from './components/Table/Table';

const tableHeaders = ["firstname", "lastname", "age", "edit", "delete"];

function App() {
  const [persons, setPersons] = useState<Array<object>>([]);
  const [error, setError] = useState<string | boolean>(false);

  return (
    <div className="App">
      <h1>Person App</h1>
        <Form setData={setPersons} data={persons} setError={setError} />
        {error !== false && <p>{error}</p>}
        <Table tableHeaders={tableHeaders} tableData={persons} setData={setPersons} />
    </div>
  );
}

export default App;
