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
      <form onSubmit={handleAddTask} className="inline-grid">
        <>
          <Input
            setInput={setNewTask}
            onPress={handleAddTask}
            value={newTask}
            type="text"
          >
            Insert Task
          </Input>
        </>
      </form>
      <ul className="mt-4 flex flex-col gap-2">
        {userList.map((item) => (
          <li key={item.id_task} className="borderb-2">
            <p className="underline decoration-solid">{item.task}</p>
            <button
              onClick={() => handleDeleteTask(item.id_task)}
              className="rounded border border-black bg-slate-300"
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
