import { useState } from "react";
import Input from "../components/Input";
import { useAddTask } from "./context/useTaskQueries";
import toast from "react-hot-toast";

function AddTaskForm() {
  const addTask = useAddTask();
  const [newTask, setNewTask] = useState("");

  async function handleAddTask(e) {
    e.preventDefault();
    try {
      await addTask.mutateAsync(newTask);
      setNewTask("");
    } catch (error) {
      toast.error("Unexpected error:", error.message);
    }
  }

  return (
    <form onSubmit={handleAddTask} className="inline-grid">
      <Input
        setInput={setNewTask}
        onPress={handleAddTask}
        value={newTask}
        type="text"
      >
        Insert Task
      </Input>
    </form>
  );
}

export default AddTaskForm;
