import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import "./List.css";
//import foto from "https://cdn.discordapp.com/attachments/715585040972644442/1157414273077747804/image.png?ex=6518858a&is=6517340a&hm=9a53e9ef67e843786ac6239c0961cac1ab6e5ac25eb8c672a41a688a9027a43a&";

function List(props) {
  const [enteredInput, setEnteredInput] = useState("");
  const [clickedItemIds, setClickedItemIds] = useState([]);
  const [deletar, setDeletar] = useState(false);

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

  function Delete() {
    deletar ? setDeletar(false) : setDeletar(true);
  }

  return (
    <div>
      <form>
        <Input onChange={inputHandler} submitHandler={submitHandler}></Input>

        <button onClick={submitHandler}>Save</button>
        <span onClick={Delete}>
          <img
            src="https://cdn.discordapp.com/attachments/715585040972644442/1157414273077747804/image.png?ex=6518858a&is=6517340a&hm=9a53e9ef67e843786ac6239c0961cac1ab6e5ac25eb8c672a41a688a9027a43a&"
            alt="foto"
          />
        </span>
      </form>
      <ul>
        {props.list.map((item) => (
          <li
            key={item.id}
            onClick={() => toggleItemClick(item.id)}
            className={clickedItemIds.includes(item.id) ? "clicked" : ""}
          >
            <span>{item.value}</span>
            {deletar && <button>deletar</button>}
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
