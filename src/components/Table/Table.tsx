import React, { useState } from "react";
import CheckIcon from "../Icons/CheckIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import "../../styles/table.css";
import Input from "../Form/Input";

interface Props {
  tableHeaders: Array<string>;
  tableData: Array<any>;
  setData: (value: Array<any>) => void;
}

export default function Table({ tableHeaders, tableData, setData }: Props) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedFirstname, setUpdatedFirstname] = useState<string>("");
  const [updatedLastname, setUpdatedLastname] = useState<string>("");
  const [updatedAge, setUpdatedAge] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<any>({
    firstname: "desc",
    lastname: "desc",
    age: "desc",
  });

  const toggleUpdating = () => {
    setIsUpdating(!isUpdating);
  };

  const handleUpdate = (id: number) => {
    const object = {
      id: id,
      firstname: updatedFirstname,
      lastname: updatedLastname,
      age: updatedAge,
    };
    const newData = tableData.filter((item) => item.id !== id);
    newData.push(object);
    setData(newData);
  };

  const handleDelete = (id: number) => {
    const newData = tableData.filter((item) => item.id !== id);
    setData(newData);
  };

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
            <tr key={item.id}>
              <td data-testid="td-firstname">
                {isUpdating ? (
                  <Input
                    type="text"
                    required={true}
                    setValue={setUpdatedFirstname}
                    defaultValue={item.firstname}
                    name="update-firstname"
                  />
                ) : (
                  item.firstname
                )}
              </td>
              <td data-testid="td-lastname">
                {isUpdating ? (
                  <Input
                    type="text"
                    required={true}
                    setValue={setUpdatedLastname}
                    defaultValue={item.lastname}
                    name="update-lastname"
                  />
                ) : (
                  item.lastname
                )}
              </td>
              <td className="td-number" data-testid="td-age">
                {isUpdating ? (
                  <Input
                    type="number"
                    required={true}
                    setValue={setUpdatedAge}
                    defaultValue={item.age}
                    name="update-age"
                  />
                ) : (
                  item.age
                )}
              </td>
              <td className="td-icon" data-testid="td-edit">
                <span onClick={toggleUpdating}>
                  {isUpdating ? (
                    <button
                      onClick={() => handleUpdate(item.id)}
                      aria-label="save row"
                      data-testid="btn-save"
                    >
                      <CheckIcon />
                    </button>
                  ) : (
                    <button aria-label="edit row" data-testid="btn-edit">
                      <EditIcon />
                    </button>
                  )}
                </span>
              </td>
              <td className="td-icon" data-testid="td-delete">
                <button
                  onClick={() => handleDelete(item.id)}
                  aria-label="delete row"
                  data-testid="btn-delete"
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
