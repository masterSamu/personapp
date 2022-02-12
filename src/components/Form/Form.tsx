import React, { useEffect, useState } from "react";
import { idText } from "typescript";
import useWindowDimensions from "../../CustomHooks/useWindowDimensions";
import Input from "./Input";

interface Props {
  data: Array<object>;
  setData: (value: Array<object>) => void;
  setError: (value: string | boolean) => void;
}

export default function Form({ data, setData, setError }: Props) {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const [formStyle, setFormStyle] = useState<object>(defaultStyle);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 576) {
      setFormStyle(mobileStyles.form);
    }
  }, [width]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Date.now();
    const object = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      age: age,
    };
    const isUndefined =
      firstname === undefined || lastname === undefined || age === undefined;
    const isEmpty = firstname?.length === 0 || lastname?.length === 0 || age === undefined
    if (isUndefined || isEmpty) {
      setError("Invalid input values!");
    } else {
      setData([...data, object]);
      setError(false);
      setFirstname("");
      setLastname("");
      setAge(0);
    }
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={inputContainer}>
        <label>Firstname</label>
        <Input
          setValue={setFirstname}
          required={true}
          type="text"
          name="firstname"
          value={firstname}
        />
      </div>
      <div style={inputContainer}>
        <label>Lastname</label>
        <Input
          setValue={setLastname}
          required={true}
          type="text"
          name="lastname"
          value={lastname}
        />
      </div>
      <div style={inputContainer}>
        <label>Age</label>
        <Input
          setValue={setAge}
          required={true}
          type="number"
          min={0}
          max={150}
          name="age"
          value={age}
        />
      </div>
      <div style={inputContainer}>
        <button type="submit" aria-label="submit">
          Submit
        </button>{" "}
      </div>
    </form>
  );
}

const defaultStyle = {
  display: "flex",
  flexDirection: "row" as "row",
  justifyContent: "center",
  gap: "20px",
  textAlign: "left" as "left",
  fontSize: "1.2rem",
};

const inputContainer = {
  display: "flex",
  flexDirection: "column" as "column",
  gap: "10px",
};

const mobileStyles = {
  form: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "15px",
    textAlign: "left" as "left",
    fontSize: "1.2rem",
    padding: "20px",
  },
};
