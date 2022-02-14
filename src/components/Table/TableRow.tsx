import React, { useEffect, useState } from "react";
import CheckIcon from "../Icons/CheckIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import Input from "../Form/Input";

interface Props {
  item: { id: number; firstname: string; lastname: string; age: number; };
  tableData: Array<any>;
  setData: (value: Array<any>) => void;
}

export default function TableRow({
  item,
  tableData,
  setData
}: Props) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedFirstname, setUpdatedFirstname] = useState<string>(item.firstname);
  const [updatedLastname, setUpdatedLastname] = useState<string>(item.lastname);
  const [updatedAge, setUpdatedAge] = useState<number>(item.age);

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
            id={"update-firstname-" + item.id}
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
            id={"update-lastname-" + item.id}
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
            id={"update-age-" + item.id}
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
}
