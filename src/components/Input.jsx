import { useState } from "react";
import PropTypes from "prop-types";
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

Input.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  OnInput: PropTypes.string,
};

export default Input;
