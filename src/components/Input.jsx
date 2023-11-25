import { useState } from "react";

import "./login/Login.css";

function Input(props) {
  const [enteredInput, setEnteredInput] = useState(props.value || "");

  function inputHandler(event) {
    setEnteredInput(event.target.value);
    props.OnInput(enteredInput);
  }

  return (
    <div className="group">
      <label htmlFor={props.id}>{props.children}</label>
      <input id={props.id} value={enteredInput} onChange={inputHandler} />
    </div>
  );
}

export default Input;
