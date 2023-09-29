import { useState } from "react";
import PropTypes from "prop-types";
import "./List.css";

function List(props) {
  const [enteredInput, setEnteredInput] = useState("");
  const [clickedItemIds, setClickedItemIds] = useState([]);

  function toggleItemClick(itemId) {
    if (clickedItemIds.includes(itemId)) {
      setClickedItemIds((prevIds) => prevIds.filter((id) => id !== itemId));
    } else {
      setClickedItemIds((prevIds) => [...prevIds, itemId]);
    }
  }

  function inputHandler(event) {
    setEnteredInput(event.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (enteredInput.trim() !== "") {
      const userInput = {
        value: enteredInput,
        id: Math.random().toString(),
      };
      props.onSave(userInput);
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
        {props.list.map((item) => (
          <li
            key={item.id}
            onClick={() => toggleItemClick(item.id)}
            className={clickedItemIds.includes(item.id) ? "clicked" : ""}
          >
            <span>{item.value}</span>
          </li>
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
