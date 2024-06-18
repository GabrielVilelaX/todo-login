const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yssfqilimzmkjdxusinw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function cleanArchivedTasks() {
    try {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 30);
      const thresholdDate = currentDate.toISOString();
      
      const { data, error } = await supabase
        .from('lists')
        .delete()
        .lt('archived_at', thresholdDate);
  
      if (error) {
        console.error('Erro ao deletar tarefas arquivadas:', error.message);
        return { statusCode: 500, body: error.message };
      }
  
      return { statusCode: 200, body: 'Tarefas arquivadas deletadas com sucesso.' };
    } catch (error) {
      console.error('Erro inesperado:', error.message);
      return { statusCode: 500, body: error.message };
    }
  }
  
 
  cleanArchivedTasks();