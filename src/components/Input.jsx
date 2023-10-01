import { useState } from "react";

function Input(props) {
  const [enteredInput, setEnteredInput] = useState("");

  function inputHandler(event) {
    setEnteredInput(event.target.value);
  }
  return (
    <>
      <label></label>
      <input onChange={inputHandler}></input>
    </>
  );
}

export default Input;
