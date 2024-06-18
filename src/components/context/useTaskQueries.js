import { useQuery, useMutation, useQueryClient } from "react-query";
import supabase from "../../services/supabase";
import { v4 as uuidv4 } from "uuid";

export function useFetchUserList() {
  return useQuery("userList", async () => {
    const user = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .eq("id", user.data.user.id)
        .order("created_at", { ascending: true });

      if (error) {
        throw new Error(`Error fetching user list: ${error.message}`);
      }

      return data || [];
    } else {
      throw new Error("User not found");
    }
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newTask) => {
      const user = await supabase.auth.getUser();

      if (user) {
        const newTaskObject = {
          id_task: uuidv4(),
          task: newTask,
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase.from("lists").insert([
          {
            id: user.data.user.id,
            id_task: newTaskObject.id_task,
            task: newTaskObject.task,
            created_at: newTaskObject.created_at,
          },
        ]);

        if (error) {
          throw new Error(`Error adding task: ${error.message}`);
        }

        return newTaskObject;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userList");
      },
    },
  );
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id_taskToDelete) => {
      const user = await supabase.auth.getUser();
      console.log(id_taskToDelete);

      if (user) {
        const { data, error } = await supabase
          .from("lists")
          .delete()
          .eq("id_task", id_taskToDelete);

        if (error) {
          throw new Error(`Error deleting task: ${error.message}`);
        }

        return data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userList");
      },
    },
  );
}

export function useCompleteTask() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id_taskToComplete, completed }) => {
      const user = await supabase.auth.getUser();

      if (user) {
        const { data: userList, error: fetchError } = await supabase
          .from("lists")
          .select("*")
          .eq("id", user.data.user.id);

        if (fetchError) {
          throw new Error(`Error fetching user list: ${fetchError.message}`);
        }

        const taskToUpdate = userList.find(
          (task) => task.id_task === id_taskToComplete,
        );

        if (!taskToUpdate) {
          throw new Error(`Task with ID ${id_taskToComplete} not found`);
        }

        taskToUpdate.completed = !completed;

        const { updateError } = await supabase
          .from("lists")
          .update({ completed: !completed })
          .eq("id_task", id_taskToComplete)
          .single();

        if (updateError) {
          throw new Error(`Error updating task: ${updateError.message}`);
        }

        return taskToUpdate;
      }
    },
    {
      onSuccess: (updatedTask) => {
        queryClient.setQueryData("userList", (oldData) => {
          return oldData.map((task) =>
            task.id_task === updatedTask.id_task ? updatedTask : task,
          );
        });
      },
    },
  );
}
