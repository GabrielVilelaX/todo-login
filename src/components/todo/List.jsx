import { useState } from "react";
import PropTypes from "prop-types";
import "./List.css";
//import foto from "https://cdn.discordapp.com/attachments/715585040972644442/1157414273077747804/image.png?ex=6518858a&is=6517340a&hm=9a53e9ef67e843786ac6239c0961cac1ab6e5ac25eb8c672a41a688a9027a43a&";

function List(props) {
  const [enteredInput, setEnteredInput] = useState("");
  const [deletar, setDeletar] = useState(false);

  function inputHandler(event) {
    setEnteredInput(event.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (enteredInput.trim() !== "") {
      const userInput = {
        value: enteredInput,
        completed: false,
        id: Math.random().toString(),
      };

      props.onSave(userInput);
    }
  }

  function DeleteButton(e) {
    e.preventDefault();
    deletar ? setDeletar(false) : setDeletar(true);
  }

  function deleteHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      <form>
        <input onChange={inputHandler}></input>

        <button className="button" onClick={submitHandler}>
          Save
        </button>
        <button className="button" onClick={DeleteButton}>
          Deletar
        </button>
      </form>
      <ul>
        {props.list.map((item) => (
          <>
            <li
              key={item.id}
              onClick={() => props.toggleItemClick(item.id)}
              className={`list-item ${item.completed ? "clicked" : ""}`}
            >
              <span>{item.value}</span>
              {deletar && !item.completed && (
                <button className="delete" onClick={deleteHandler}>
                  <img
                    src="https://cdn.discordapp.com/attachments/715585040972644442/1157414273077747804/image.png?ex=6518858a&is=6517340a&hm=9a53e9ef67e843786ac6239c0961cac1ab6e5ac25eb8c672a41a688a9027a43a&"
                    alt="foto"
                  />
                </button>
              )}
            </li>
          </>
        ))}
      </ul>
    </>
  );
}

List.propTypes = {
  onSave: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  toggleItemClick: PropTypes.func.isRequired,
};

export default List;
