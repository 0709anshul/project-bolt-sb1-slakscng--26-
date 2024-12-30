export type User = {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'brand_user';
  organization_id: string;
  organization: {
    name: string;
  };
  department: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateUserData = {
  email: string;
  password: string;
  full_name: string;
  role: User['role'];
  organization_id: string;
  department?: string;
};