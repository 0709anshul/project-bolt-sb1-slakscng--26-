import { supabase } from '../supabase';
import type { Task } from '../../types/orders';

// Base query builder with proper typing
const createTaskQuery = () => {
  return supabase
    .from('tasks')
    .select(`
      *,
      production_order:production_orders!inner (
        id,
        po_number,
        quantity,
        organization:organizations!inner (
          id,
          name
        )
      )
    `);
};

export async function fetchTasks(filters: {
  status?: string;
  organizationId?: string;
}): Promise<Task[]> {
  try {
    let query = createTaskQuery();

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.organizationId) {
      query = query.eq('production_order.organization.id', filters.organizationId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
}