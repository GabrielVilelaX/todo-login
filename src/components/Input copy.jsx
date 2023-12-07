//import { useState } from "react";
import "./login/Login.css";

function Input({ setEnteredInput, children, dispatch }) {
  // const [enteredInput, setEnteredInput] = useState("");

  function InputHandler(e) {
    setEnteredInput(e.target.value);
  }

  return (
    <div className="group">
      <label>{children}</label>
      <input onChange={InputHandler}></input>
    </div>
  );
}

export default Input;
