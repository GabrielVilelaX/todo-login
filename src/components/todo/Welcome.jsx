import List from "./List";
import { useState } from "react";

function Welcome() {
  const [list, setList] = useState([]);

  function listHandler(newlist) {
    setList((prevList) => [...prevList, newlist]);
  }

  return (
    <div>
      <List list={list} onSave={listHandler}></List>
    </div>
  );
}

export default Welcome;
