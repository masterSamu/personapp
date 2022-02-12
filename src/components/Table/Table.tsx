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

export default function Table({ tableHeaders, tableData, setData, }: Props) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedFirstname, setUpdatedFirstname] = useState<string>("");
  const [updatedLastname, setUpdatedLastname] = useState<string>("");
  const [updatedAge, setUpdatedAge] = useState<number>(0);

  const toggleSaveEdit = () => {
    setIsUpdating(!isUpdating);
  };

  const handleUpdate = (id: number) => {
      console.log("upd: " + id)
      const object = {
          id: id,
          firstname: updatedFirstname,
          lastname: updatedLastname,
          age: updatedAge
      }
      const newData = tableData.filter(item => item.id !== id);
      newData.push(object);
      setData(newData)
      console.log(newData)
  }

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
                      isRequired={true}
                      setValue={setUpdatedFirstname}
                      defaultValue={item.firstname}
                    />
                  ) : (
                    item.firstname
                  )}
                </td>
                <td>
                  {isUpdating ? (
                    <Input
                      type="text"
                      isRequired={true}
                      setValue={setUpdatedLastname}
                      defaultValue={item.lastname}
                      
                    />
                  ) : (
                    item.lastname
                  )}
                </td>
                <td className="td-number">
                  {isUpdating ? (
                    <Input
                      type="number"
                      isRequired={true}
                      setValue={setUpdatedAge}
                      defaultValue={item.age}
                    />
                  ) : (
                    item.age
                  )}
                </td>
                <td className="td-icon">
                  <span onClick={toggleSaveEdit}>
                    {isUpdating ? (
                      <button onClick={() => handleUpdate(item.id)}>
                        <CheckIcon />
                      </button>
                    ) : (
                      <EditIcon />
                    )}
                  </span>
                </td>
                <td className="td-icon">
                  <DeleteIcon />
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
