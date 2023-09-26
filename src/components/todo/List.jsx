import { useState } from "react";
import PropTypes from "prop-types";

function List(props) {
  const [enteredInput, setEnteredInput] = useState("");

  function inputHandler(event) {
    setEnteredInput(event.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (enteredInput.trim() !== "") {
      props.onSave(enteredInput);
      setEnteredInput("");
    }
  }

  return (
    <div>
      <form>
        <input onChange={inputHandler}></input>
        <button onClick={submitHandler}>Save</button>
      </form>
      <ul>
        {props.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

List.propTypes = {
  onSave: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};

export default List;
