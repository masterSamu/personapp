import React, { useEffect, useState } from "react";
import { idText } from "typescript";
import useWindowDimensions from "../../CustomHooks/useWindowDimensions";
import Input from "./Input";

interface Props {
    data: Array<object>;
    setData: (value: Array<object>) => void;
}

export default function Form({data, setData}: Props) {
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
    console.log(id)
    const object = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        age: age
    }
    setData([...data, object]);
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={inputContainer}>
        <label>Firstname</label>
        <Input setValue={setFirstname} isRequired={true} type="text" />
      </div>
      <div style={inputContainer}>
        <label>Lastname</label>
        <Input setValue={setLastname} isRequired={true} type="text" />
      </div>
      <div style={inputContainer}>
        <label>Age</label>
        <Input
          setValue={setAge}
          isRequired={true}
          type="number"
          min={0}
          max={150}
        />
      </div>
        <button type="submit">Submit</button>
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
    }
};
