import React, { useState } from "react";
import CheckIcon from "../Icons/CheckIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";

import "../../styles/table.css";
import Input from "../Form/Input";
import { setEnvironmentData } from "worker_threads";
import { idText } from "typescript";

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

  const toggleSaveEdit = () => {
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

  return (
    <table id="person-table">
      <thead>
        <tr>
          {tableHeaders?.map((item, index) => {
            return (
              <th key={index} className={index > 2 ? "th-icon" : "th"}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((item) => {
          return (
            <tr key={item.id}>
              <td>
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
              <td>
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
              <td className="td-number">
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
              <td className="td-icon">
                <span onClick={toggleSaveEdit}>
                  {isUpdating ? (
                    <button onClick={() => handleUpdate(item.id)} aria-label="save row">
                      <CheckIcon />
                    </button>
                  ) : (
                    <button aria-label="edit row"><EditIcon /></button>
                  )}
                </span>
              </td>
              <td className="td-icon">
                <button onClick={() => handleDelete(item.id)} aria-label="delete row">
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
