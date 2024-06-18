import { useFetchUserList } from "../components/context/useTaskQueries";

import supabase from "../services/supabase";
import TaskItem from "../components/TaskItem";
import AddTaskForm from "../components/AddTaskForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Archive from "./Archive";

function List() {
  const [showArchive, setShowArchive] = useState(false);
  const { data: userList = [] } = useFetchUserList();
  const navigate = useNavigate();

  useEffect(() => {
    async function VerifyUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          navigate("/*");
        } else {
          return;
        }
      } catch (error) {
        console.log("error");
        navigate("/*");
      }
    }
    VerifyUser();
  }, [navigate]);

  return (
    <>
      {}
      <Button onClick={() => setShowArchive(true)}>Arquivo</Button>
      <AddTaskForm />
      <Modal show={showArchive} onClose={() => setShowArchive(false)}>
        <Archive archivedTasks={userList.filter((task) => task.archived)} />
      </Modal>
      <ul className="mt-4 flex flex-col gap-2">
        {userList
          .filter((task) => !task.archived)
          .map((item) => (
            <TaskItem userList={userList} key={item.id_task} task={item} />
          ))}
      </ul>
    </>
  );
}

export default List;
