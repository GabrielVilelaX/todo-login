import { useState } from "react";
import PropTypes from "prop-types";

function List(props) {
  const [enteredInput, setEnteredInput] = useState("");

  function inputHandler(event) {
    setEnteredInput(event.target.value);
  }

  function submitHandler() {
    if (enteredInput > 0) {
      props.onSave(enteredInput);
    }
  }

  return (
    <form>
      <input onChange={inputHandler}></input>
      <button onClick={submitHandler}>Save</button>
    </form>
  );
}

List.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default List;
