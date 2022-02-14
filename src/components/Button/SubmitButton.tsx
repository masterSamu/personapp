import React, {useState} from "react";

interface Props {
    text: string;
    type: "button" | "submit" | "reset";
}

export default function Button({text, type}: Props) {
    const [style, setStyle] = useState<object>(defaultStyle);
  
    return (
      <button
        type={type}
        style={style}
        onMouseEnter={() => setStyle(mouseOver)}
        onMouseLeave={() => {
          setStyle(defaultStyle);
        }}
        onMouseDown={() => setStyle(active)}
        onMouseUp={() => setStyle(mouseOver)}
        onFocus={() => setStyle(active)}
        data-testid="submit-button-test"
      >
        {text}
      </button>
    );
  }
  
  const padding = "7px 20px";
  const boxShadow = "0px 0px 7px 1px #cd9cf2";
  
  const defaultStyle = {
    padding: padding,
    backgroundColor: "#9DAAF2",
    color: "#000",
    cursor: "pointer",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#410370",
    borderRadius: "7px",
    boxShadow: boxShadow,
  };
  
  const mouseOver = {
    backgroundColor: "#b7bff1",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#410370",
    borderRadius: "7px",
    color: "#000",
    padding: padding,
    cursor: "pointer",
    boxShadow: boxShadow,
  };
  
  const active = {
    backgroundColor: "#b7bff1",
    color: "#000",
    padding: padding,
    cursor: "pointer",
    borderColor: "#9DAAF2",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "7px",
    boxShadow: boxShadow,
  };
  