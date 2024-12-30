import type { User } from '../users';

export type Material = {
  id: string;
  leumas_id: string;
  name: string;
  make_description: string | null;
  vendor_details: VendorDetails | null;
  unit_of_measurement: UnitOfMeasurement;
  cost_per_unit: number;
  category: MaterialCategory;
  acceptance_criteria: string | null;
  created_at: string;
  updated_at: string;
};

export type MaterialInventory = {
  material_id: string;
  material?: Material;
  inward: number;
  brand: number;
  production: number;
  fg_store: number;
  total: number;
};

export type VendorDetails = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
};

export type UnitOfMeasurement = 'gram' | 'kilogram' | 'unit' | 'millilitre' | 'litre';
export type MaterialCategory = 'RM' | 'PM' | 'FG';
export type StoreSection = 'inward' | 'brand' | 'production' | 'fg_store';
export type MaterialOrderStatus = 'pending' | 'ordered' | 'dispatched' | 'received';

// ... rest of the types remain the same