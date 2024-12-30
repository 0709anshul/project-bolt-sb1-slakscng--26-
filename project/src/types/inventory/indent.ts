import type { Material } from './materials';
import type { ProductionOrder } from '../orders';

export type MaterialRequirement = {
  material: Material;
  required_quantity: number;
  available_quantity: number;
  shortage_quantity: number;
};

export type MaterialIndent = {
  id: string;
  production_order_id: string;
  production_order?: ProductionOrder;
  materials: MaterialRequirement[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type CreateIndentData = {
  production_order_id: string;
  materials: {
    material_id: string;
    required_quantity: number;
  }[];
};