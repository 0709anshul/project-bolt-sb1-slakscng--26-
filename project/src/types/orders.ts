export type ProductionOrder = {
  id: string;
  po_number: string;
  organization_id: string;
  organization?: {
    id: string;
    name: string;
  };
  owner_id: string;
  product_id: string;
  product?: {
    id: string;
    name: string;
  };
  quantity: number;
  order_type: 'Project Plan' | 'Production Order' | 'NPD Order';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  is_priority: boolean;
  parent_order_id?: string | null;
  split_reason?: string | null;
  details?: string | null;
  attachments?: any[];
  tasks?: Task[];
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  production_order_id: string;
  start_date: string;
  duration_days: number;
  due_date: string;
  owner_id: string | null;
  details: string;
  status: TaskStatus;
  is_priority: boolean;
  internal_notes?: string | null;
  proof_of_work?: string | null;
  attachments?: any[];
  created_at: string;
  updated_at: string;
};

export type TaskStatus = 'pending' | 'pending_from_client' | 'in_progress' | 'completed';