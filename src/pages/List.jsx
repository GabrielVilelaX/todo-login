import { useState } from "react";
import { useUser } from "../components/context/UserContext";

import "./List.css";
import Input from "../components/Input";

function List({ onSave, toggleItemClick, onDelete }) {
  const { addActivity, currentUser } = useUser();
  const [enteredInput, setEnteredInput] = useState("");
  const [deletar, setDeletar] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    if (enteredInput.trim() !== "") {
      const userInput = {
        value: enteredInput,
        completed: false,
        id: `${enteredInput}-${Date.now()}`,
      };

      onSave(userInput);
      addActivity(userInput);
      setEnteredInput("");
    }
  }

  function DeleteButton(e) {
    e.preventDefault();
    setDeletar((prevDeletar) => !prevDeletar);
  }

  return (
    <>
      <form>
        <Input setInput={setEnteredInput} />

        <button className="button" onClick={submitHandler}>
          Save
        </button>
        <button className="button" onClick={DeleteButton}>
          Deletar
        </button>
      </form>
      <ul>
        {currentUser.activities &&
          currentUser.activities.length > 0 &&
          currentUser.activities.map((item) => (
            <li
              key={item.id}
              onClick={() => toggleItemClick(item.id)}
              className={`list-item ${item.completed ? "clicked" : ""}`}
            >
              <span
                style={item.completed ? { textDecoration: "line-through" } : {}}
              >
                {item.value}
              </span>
              {deletar && !item.completed && (
                <button
                  className="delete"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                >
                  <img
                    src="https://cdn.discordapp.com/attachments/715585040972644442/1157414273077747804/image.png?ex=6518858a&is=6517340a&hm=9a53e9ef67e843786ac6239c0961cac1ab6e5ac25eb8c672a41a688a9027a43a&"
                    alt="foto"
                  />
                </button>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}

export default List;
