export type Organization = {
  id: string;
  name: string;
  type: 'Manufacturing Company' | 'Customer Brand';
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  welcome_message?: string;
  created_at: string;
  updated_at: string;
};

export type CreateBrandData = {
  name: string;
  type: 'Customer Brand';
};

export type UpdateBrandData = {
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  welcome_message?: string;
};