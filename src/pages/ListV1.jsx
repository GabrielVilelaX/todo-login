import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./List.css";
import Input from "../components/Input";
import supabase from "../services/supabase";
import styles from "../components/Input.module.css";
import { toast } from "react-toastify";

function List() {
  const [userList, setUserList] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const user = await supabase.auth.getUser();

        if (user) {
          const { data: lists, error } = await supabase
            .from("lists")
            .select("*")
            .eq("id", user.data.user.id);

          if (error) {
            toast.error("Error fetching user list:", error.message);
            console.error("Error fetching user list:", error.message);

            return;
          } else {
            console.log("User list retrieved successfully:", lists);
            setUserList((prevList) => [...prevList, ...lists]);
          }
        } else {
          console.log("pqp");
        }
      } catch (error) {
        console.error("Unexpected error:", error.message);
      }
    };

    fetchUserList();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const user = await supabase.auth.getUser();
      console.log(user);

      if (user) {
        const newTaskObject = { id: uuidv4(), title: newTask, tasks: [] };
        const { data, error } = await supabase.from("lists").upsert(
          [
            {
              id: user.data.user.id,
              newTask: [newTaskObject, ...(userList || [])],
            },
          ],
          {
            onConflict: ["id"],
            returning: "minimal",
          }
        );

        if (error) {
          console.error("Error adding task:", error.message);
        } else {
          console.log("Task added successfully:", data);
          setUserList((prevList) => [...prevList, newTaskObject]);
          setNewTask("");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  return (
    <>
      <form>
        <Input setInput={setNewTask} type="text">
          New Task
        </Input>
        <button className={styles.button} onClick={handleAddTask}>
          Add Task
        </button>
        <button className={styles.button}>Delete</button>
      </form>
      <ul>
        {userList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

export default List;
