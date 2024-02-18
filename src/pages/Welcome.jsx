import { useNavigate } from "react-router-dom";
import List from "./List";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import supabase from "../services/supabase";

function Welcome() {
  // const { currentUser } = useUser();
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

  async function logoutHandler() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(`Error signing out: ${error.message}`);
      } else {
        toast.success("Welcome back anytime!");
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      toast.error(`Unexpected error: ${error.message}`);
    }
  }

  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
      <ToastContainer />
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
