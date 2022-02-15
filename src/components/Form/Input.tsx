import React, { useState, useEffect } from "react";

interface Props {
  type: string;
  defaultValue?: string | number;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  value?: any;
  setValue: (value: any) => void;
}

export default function Input({
  type,
  defaultValue,
  name,
  id,
  className,
  placeholder,
  min,
  max,
  required,
  value,
  setValue,
}: Props) {
  const [style, setStyle] = useState<object>(defaultStyle);
  const [isRequired, setRequired] = useState<boolean>(false);
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [valueIsValid, setValueIsValid] = useState<boolean>(false);

  useEffect(() => {
    if ((required && value === "") || (required && value === 0)) {
      setRequired(true);
    } else {
      setRequired(false);
    }
  }, [required]);

  useEffect(() => {
    if ((value === "" || value === 0 || value === undefined) ) {
      setStyle(defaultStyle);
      setFeedbackVisible(false);
      if (required) {
        setRequired(true);
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value: any = e.target.value;
    setValue(value);
    let valid = false;
    switch (type) {
      case "text":
        if (value.length > 0) valid = true;
        break;
      case "number":
        if (value > 0 && value <= 150) {
          valid = true;
        }
        break;
      default:
        valid = false;
    }
    if (valid) {
      setValueIsValid(true);
      setStyle(validValue);
      setRequired(false);
    } else if (!valid) {
      setValueIsValid(false);
      setStyle(invalidValue);
      setRequired(false);
    } else {
      setStyle(defaultStyle);
      setValueIsValid(false);
    }
    setFeedbackVisible(true);
  };

  return (
    <div style={container}>
      <input
        type={type}
        style={style}
        defaultValue={defaultValue}
        value={value}
        data-testid="input-component"
        min={min}
        max={max}
        onFocus={() => setStyle(focus)}
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => handleChange(e)}
        name={name}
        id={id}
        className={className}
        placeholder={placeholder}
      />
      {isRequired === true && (
        <span style={requiredStyle} data-testid="input-required">
          required
        </span>
      )}
      {feedbackVisible === true &&
        (valueIsValid ? (
          <span style={validText} data-testid="input-valid">
            good
          </span>
        ) : (
          <span style={invalidText} data-testid="input-invalid">
            bad
          </span>
        ))}
        {!required && !feedbackVisible && <span style={emptyFeedback}></span>}
    </div>
  );
}

const padding = "5px";
const borderRadius = "5px";
const boxShadow = "0px 0px 7px 1px #cd9cf2";

const container = {
  display: "flex",
  flexDirection: "row" as "row",
  alignItems: "center",
};

const defaultStyle = {
  backgroundColor: "#f3e9fa",
  padding: padding,
  border: "1px solid #cd9cf2",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};

const focus = {
  backgroundColor: "#FFFFFF",
  padding: padding,
  border: "1px solid #ADADAD",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};

const invalidValue = {
  backgroundColor: "#ffd9d9",
  padding: padding,
  border: "1px solid #FFA6A6",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};

const validValue = {
  backgroundColor: "#caf5c7",
  padding: padding,
  border: "1px solid #68F261",
  borderRadius: borderRadius,
  boxShadow: boxShadow,
};

const requiredStyle = {
  fontSize: "0.8rem",
  color: "red",
  fontStyle: "italic",
  marginLeft: "6px",
  width: "35px"
};

const validText = {
  fontSize: "0.8rem",
  color: "green",
  fontStyle: "italic",
  marginLeft: "6px",
  width: "35px"
};

const invalidText = {
  fontSize: "0.8rem",
  color: "red",
  fontStyle: "italic",
  marginLeft: "6px",
  width: "35px",
};

const emptyFeedback = {
  width: "50px"
}
