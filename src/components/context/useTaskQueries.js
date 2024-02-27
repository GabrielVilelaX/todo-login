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
        .eq("id", user.data.user.id);

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
          tasks: [],
        };

        const { error } = await supabase.from("lists").insert([
          {
            id: user.data.user.id,
            id_task: newTaskObject.id_task,
            task: newTaskObject.task,
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
    }
  );
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id_taskToDelete) => {
      const user = await supabase.auth.getUser();

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
    }
  );
}
