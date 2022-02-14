import React, { useState } from "react";
import CheckIcon from "../Icons/CheckIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import Input from "../Form/Input";

interface Props {
  id: any;
  firstname: any;
  lastname: any;
  age: any;
  handleUpdate: (value: string) => void;
  toggleUpdating: () => void;
  handleDelete: (value: string) => void;
  isUpdating: boolean;
}

export default function TableRowEditing({
  id,
  firstname,
  lastname,
  age,
  handleUpdate,
  handleDelete,
  toggleUpdating,
  isUpdating,
}: Props) {
  const [updatedFirstname, setUpdatedFirstname] = useState<string>("");
  const [updatedLastname, setUpdatedLastname] = useState<string>("");
  const [updatedAge, setUpdatedAge] = useState<number>(0);
  return (
    <tr key={id}>
      <td data-testid="td-firstname">
        <Input
          type="text"
          required={true}
          setValue={setUpdatedFirstname}
          defaultValue={firstname}
          name="update-firstname"
          id={"update-firstname-" + id}
        />
      </td>
      <td data-testid="td-lastname">
        <Input
          type="text"
          required={true}
          setValue={setUpdatedLastname}
          defaultValue={lastname}
          name="update-lastname"
          id={"update-lastname-" + id}
        />
      </td>
      <td className="td-number" data-testid="td-age">
        <Input
          type="number"
          required={true}
          setValue={setUpdatedAge}
          defaultValue={age}
          name="update-age"
          id={"update-age-" + id}
        />
      </td>
      <td className="td-icon" data-testid="td-edit">
        <span onClick={toggleUpdating}>
          {isUpdating ? (
            <button
              onClick={() => handleUpdate(id)}
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
          onClick={() => handleDelete(id)}
          aria-label="delete row"
          data-testid="btn-delete"
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
}
