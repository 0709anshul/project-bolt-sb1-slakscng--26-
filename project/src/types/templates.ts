export type TaskTemplate = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

export type TaskTemplateItem = {
  id: string;
  template_id: string;
  name: string;
  duration_days: number;
  order_index: number;
  details_template?: string;
  todos?: TemplateTodo[];
  created_at: string;
};

export type TemplateTodo = {
  description: string;
  is_private: boolean;
};

export type TemplateFormData = {
  name: string;
  description: string;
  items: TaskTemplateItem[];
};