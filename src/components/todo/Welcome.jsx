import List from "./List";
import { useState } from "react";

function Welcome() {
  const [list, setList] = useState([]);

  function listHandler(newlist) {
    setList((prevList) => {
      return [...prevList, newlist];
    });
  }

  function toggleItemClick(itemId) {
    setList((prevList) =>
      prevList.map((item) => {
        if (item.id === itemId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  }

  function deleteHandler(inputID) {
    const newList = list.filter((input) => input.id !== inputID);

    setList(newList);
  }

  return (
    <>
      <List
        list={list}
        onSave={listHandler}
        toggleItemClick={toggleItemClick}
        onDelete={deleteHandler}
      ></List>
    </>
  );
}

export default Welcome;
