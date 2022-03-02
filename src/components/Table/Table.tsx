import React, { useState } from "react";
import "../../styles/table.css";
import TableRow from "./TableRow";

interface Props {
  tableHeaders: Array<string>;
  tableData: Array<{
    firstname: string;
    lastname: string;
    age: number;
    id: number;
  }>;
  setData: (
    value: Array<{
      firstname: string;
      lastname: string;
      age: number;
      id: number;
    }>
  ) => void;
}

export default function Table({ tableHeaders, tableData, setData }: Props) {
  const [sortOrder, setSortOrder] = useState<{
    firstname: string;
    lastname: string;
    age: string;
  }>({
    firstname: "desc",
    lastname: "desc",
    age: "desc",
  });

  const toggleSort = (header: string) => {
    switch (header) {
      case "firstname":
        if (sortOrder.firstname === "asc") {
          setData(
            [...tableData].sort((a, b) => (a.firstname < b.firstname ? 1 : -1))
          );
          setSortOrder({ ...sortOrder, firstname: "desc" });
        } else if (sortOrder.firstname === "desc") {
          setData(
            [...tableData].sort((a, b) => (a.firstname > b.firstname ? 1 : -1))
          );
          setSortOrder({ ...sortOrder, firstname: "asc" });
        }
        break;
      case "lastname":
        if (sortOrder.lastname === "asc") {
          setData(
            [...tableData].sort((a, b) => (a.lastname > b.lastname ? 1 : -1))
          );
          setSortOrder({ ...sortOrder, lastname: "desc" });
        } else {
          setData(
            [...tableData].sort((a, b) => (a.lastname < b.lastname ? 1 : -1))
          );
          setSortOrder({ ...sortOrder, lastname: "asc" });
        }

        break;
      case "age":
        if (sortOrder.age === "asc") {
          setData([...tableData].sort((a, b) => (a.age > b.age ? 1 : -1)));
          setSortOrder({ ...sortOrder, age: "desc" });
        } else {
          setData([...tableData].sort((a, b) => (a.age < b.age ? 1 : -1)));
          setSortOrder({ ...sortOrder, age: "asc" });
        }
        break;
    }
  };

  return (
    <table id="person-table" data-testid="table-person">
      <thead>
        <tr>
          {tableHeaders?.map((item, index) => {
            return (
              <th key={index} className={index > 2 ? "th-icon" : "th-data"}>
                <span onClick={() => toggleSort(item)}>{item}</span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => {
          return (
            <TableRow
              item={item}
              tableData={tableData}
              setData={setData}
              key={item.id}
            />
          );
        })}
      </tbody>
    </table>
  );
}
