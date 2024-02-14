import { useNavigate } from "react-router-dom";
import { useUser } from "../components/context/UserContext";
import List from "./List";
import { useState } from "react";

function Welcome() {
  // const { currentUser } = useUser();
  const { logout } = useUser();
  const [list, setList] = useState([""]);
  const navigate = useNavigate();

  function listHandler(newList) {
    console.log(newList);
    console.log(list);
    setList(newList);
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

  function logoutHandler() {
    logout();
    navigate("/");
  }

  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
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
