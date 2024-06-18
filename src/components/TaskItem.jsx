import { useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useCompleteTask, useDeleteTask } from "./context/useTaskQueries";
import toast from "react-hot-toast";
import supabase from "../services/supabase";

function TaskItem({ task }) {
  const deleteTask = useDeleteTask();
  const [completed, setCompleted] = useState(task.completed);
  const [archive, setArchive] = useState(false);
  const completeTask = useCompleteTask();

  async function handleDeleteTask(id_taskToDelete) {
    try {
      await deleteTask.mutateAsync(id_taskToDelete);
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  }

  async function handleComplete(id_taskToComplete) {
    try {
      setCompleted((prevCompleted) => !prevCompleted);

      await completeTask.mutateAsync({ id_taskToComplete, completed });
    } catch (error) {
      setCompleted((prevCompleted) => !prevCompleted);
      toast.error("Unexpected error:", error.message);
    }
  }

  async function handleArchive(id_taskToArchive) {
    
    const currentDate = new Date().toISOString();
  
    const { data, error } = await supabase
      .from("lists")
      .update({ archived: true, archived_at: currentDate })
      .eq("id_task", id_taskToArchive)
      .single();
  
    if (error) {
      console.error("Erro ao arquivar a tarefa:", error.message);
    } else {
      console.log("Tarefa arquivada:", id_taskToArchive);
    }
  }
  

  return (
    <li
      key={task.id_task}
      className={` flex justify-between border-b-2 py-1 ${completed ? "bg-green-400 line-through" : ""}`}
    >
      <p className="underline decoration-solid">{task.task}</p>
      <div className="flex space-x-2">
        {!completed && (
          <button
            onClick={() => handleDeleteTask(task.id_task)}
            className="rounded border border-black bg-slate-300"
          >
            <HiTrash />
          </button>
        )}
        <button
          onClick={() => handleComplete(task.id_task)}
          className="items-end rounded border border-black bg-slate-300"
        >
          {!completed ? <FaCheck /> : <MdCancel />}
        </button>
        {completed && (
          <button
            onClick={() => handleArchive(task.id_task)}
            className="items-end rounded border border-black bg-slate-300"
          >
            <RiArchiveDrawerFill />
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
