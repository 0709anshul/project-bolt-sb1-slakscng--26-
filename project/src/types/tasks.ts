export type CreateTaskData = {
  production_order_id: string;
  name: string;
  details: string;
  start_date: string;
  duration_days: number;
};

export type TaskDraft = CreateTaskData & {
  fromTemplate?: boolean;
  templateItemId?: string;
  todos?: {
    description: string;
    is_private: boolean;
  }[];
};