import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./List.css";
import Input from "../components/Input";
import supabase from "../services/supabase";
import styles from "../components/Input.module.css";
import { HiTrash } from "react-icons/hi2";
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

      if (user) {
        const newTaskObject = {
          id_task: uuidv4(),
          task: newTask,
          tasks: [],
        };
        console.log(newTaskObject);
        const { data, error } = await supabase.from("lists").insert([
          {
            id: user.data.user.id,
            id_task: newTaskObject.id_task,
            task: newTaskObject.task,
          },
        ]);

        if (error) {
          console.error("Error adding task:", error.message);
        } else {
          console.log("Task added successfully:", data);
          setUserList((prevList) => [...prevList, newTaskObject]);
          setNewTask(" ");
          console.log(`Teste: ${newTask}`);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  const handleDeleteTask = async (id_taskToDelete) => {
    try {
      const user = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("lists")
          .delete()
          .eq("id_task", id_taskToDelete);

        if (error) {
          console.error("Error deleting task:", error.message);
        } else {
          console.log("Task deleted successfully:", data);

          setUserList((prevList) =>
            prevList.filter((item) => item.id_task !== id_taskToDelete)
          );
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleAddTask}>
        <Input setInput={setNewTask} value={newTask} type="text"></Input>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {userList.map((item) => (
          <li key={item.id_task}>
            {item.task}
            <button
              onClick={() => handleDeleteTask(item.id_task)}
              className={styles.button}
            >
              <HiTrash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
