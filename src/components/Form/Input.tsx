import React, { useState, useEffect } from "react";

interface Props {
  type: string;
  defaultValue?: string | number;
  isRequired?: boolean;
  setValue: (value: any) => void;
  min?: number;
  max?: number;
}

export default function Input({
  type,
  defaultValue,
  isRequired,
  setValue,
  min,
  max,
}: Props) {
  const [style, setStyle] = useState<object>(defaultStyle);
  const [required, setRequired] = useState<boolean>(true);
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [valueIsValid, setValueIsValid] = useState<boolean>(false);

  useEffect(() => {

    if (isRequired && defaultValue === undefined) {
      setRequired(true);
    } else {
      setRequired(false);
    }
  }, [isRequired]);

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
        data-testid="input-component"
        min={min}
        max={max}
        onFocus={() => setStyle(focus)}
        onBlur={(e) => handleBlur(e)}
      />
      {required === true && (
        <span style={asteriskStyle} data-testid="input-required">
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
            bad value
          </span>
        ))}
    </div>
  );
}

const padding = "5px";
const borderRadius = "5px";

const container = {
  display: "flex",
  flexDirection: "row" as "row",
  alignItems: "center",
};

const defaultStyle = {
  backgroundColor: "rgb(253 251 217)",
  padding: padding,
  border: "2px solid #000",
  borderRadius: borderRadius,
};

const focus = {
  backgroundColor: "#FFFFFF",
  padding: padding,
  border: "2px solid #000",
  borderRadius: borderRadius,
};

const invalidValue = {
  backgroundColor: "rgb(255 227 226)",
  padding: padding,
  border: "2px solid #f70d1a",
  borderRadius: borderRadius,
};

const validValue = {
  backgroundColor: "rgb(213 253 213)",
  padding: padding,
  border: "2px solid #0B890F",
  borderRadius: borderRadius,
};

const asteriskStyle = {
  fontSize: "0.8rem",
  color: "red",
  fontStyle: "italic",
  marginLeft: "5px",
};

const validText = {
  fontSize: "0.8rem",
  color: "green",
  fontStyle: "italic",
  marginLeft: "5px",
};

const invalidText = {
  fontSize: "0.8rem",
  color: "red",
  fontStyle: "italic",
  marginLeft: "5px",
};
