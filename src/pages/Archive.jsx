import { useEffect } from 'react';
import supabase from "../services/supabase"; 

function Archive({ archivedTasks }) {

  async function deleteArchive() {
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    console.log(thirtyDaysAgo);

    
    const tasksToDelete = archivedTasks.filter(task => {
      const archivedDate = new Date(task.archived_at); 
      return archivedDate < thirtyDaysAgo;
    });

    
    tasksToDelete.forEach(async task => {
      try {
        const { data, error } = await supabase
          .from('lists')
          .delete()
          .eq('id_task', task.id_task); 
          
        if (error) {
          console.error('Erro ao deletar tarefa:', error.message);
        } else {
          console.log('Tarefa deletada com sucesso:', data);
        }
      } catch (error) {
        console.error('Erro ao comunicar com o banco de dados:', error.message);
      }
    });
  }

 
  useEffect(() => {
    deleteArchive();
  }, []); 

  return (
    <div>
      <h2 className="font-bold text-lg mt-3">Lista de Tarefas Arquivadas</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {archivedTasks.map((task) => (
          <li key={task.id_task} className={`flex justify-between border-t-2 border-black py-1`}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Archive;
