import { useState } from "react";
import Input from "../components/Input";
import { HiTrash } from "react-icons/hi2";
import {
  useFetchUserList,
  useAddTask,
  useDeleteTask,
} from "../components/context/useTaskQueries";
import { toast } from "react-toastify";
import "./List.css";

function List() {
  const { data: userList = [], error: fetchError } = useFetchUserList();
  const addTask = useAddTask();
  const deleteTask = useDeleteTask();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addTask.mutateAsync(newTask);
      setNewTask("");
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  const handleDeleteTask = async (id_taskToDelete) => {
    try {
      await deleteTask.mutateAsync(id_taskToDelete);
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  if (fetchError) {
    toast.error("Lista não foi encontrada");
  }

  return (
    <>
      <form onSubmit={handleAddTask}>
        <Input setInput={setNewTask} value={newTask} type="text" />
        <button
          className="mt-3 rounded border-2 border-black bg-slate-300 p-1 px-4 font-semibold hover:bg-slate-100"
          type="submit"
        >
          Add Task
        </button>
      </form>
      <ul className="flex flex-col">
        {userList.map((item) => (
          <li key={item.id_task}>
            {item.task}
            <button
              onClick={() => handleDeleteTask(item.id_task)}
              className="button"
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
