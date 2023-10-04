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

  return (
    <>
      <List
        list={list}
        onSave={listHandler}
        toggleItemClick={toggleItemClick}
      ></List>
    </>
  );
}

export default Welcome;
