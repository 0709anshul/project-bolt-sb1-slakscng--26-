import type { User } from './users';

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

export type VendorDetails = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
};

export type UnitOfMeasurement = 'gram' | 'kilogram' | 'unit' | 'millilitre' | 'litre';
export type MaterialCategory = 'RM' | 'PM' | 'FG';
export type StoreSection = 'inward' | 'brand' | 'production';
export type MaterialOrderStatus = 'pending' | 'ordered' | 'dispatched' | 'received';

export type ProductFormula = {
  id: string;
  product_id: string;
  material_id: string;
  quantity: number;
  material?: Material;
  created_at: string;
  updated_at: string;
};

export type MaterialOrder = {
  id: string;
  material_id: string;
  material?: Material;
  quantity: number;
  order_date: string;
  dispatch_date: string | null;
  arrival_date: string | null;
  waybill_details: WaybillDetails | null;
  status: MaterialOrderStatus;
  created_at: string;
  updated_at: string;
};

export type WaybillDetails = {
  number: string;
  carrier: string;
  tracking_url?: string;
};

export type InventoryMovement = {
  id: string;
  material_id: string;
  material?: Material;
  quantity: number;
  from_section: StoreSection | null;
  to_section: StoreSection;
  production_order_id: string | null;
  moved_at: string;
  moved_by: string;
  moved_by_user?: User;
  notes: string | null;
};

export type MaterialInventory = {
  material_id: string;
  material?: Material;
  inward: number;
  brand: number;
  production: number;
  total: number;
};