import { supabase } from '../supabase';

export async function updateTaskField(taskId: string, field: string, value: any) {
  const { error } = await supabase
    .from('tasks')
    .update({ [field]: value })
    .eq('id', taskId);

  if (error) throw error;

  // Add history entry
  await addTaskHistory(taskId, `${field}_update`, `Updated ${field}`);
}

export async function addTaskHistory(
  taskId: string,
  action: string,
  details: string
) {
  const { error } = await supabase
    .from('task_history')
    .insert({
      task_id: taskId,
      action,
      details,
      user_id: (await supabase.auth.getUser()).data.user?.id
    });

  if (error) throw error;
}