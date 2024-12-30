export type Product = {
  id: string;
  name: string;
  organization_id: string;
  organization?: {
    id: string;
    name: string;
  };
  batch_size: number;
  price_inr: number;
  created_at: string;
  updated_at: string;
};

export type CreateProductData = {
  name: string;
  organization_id: string;
  batch_size: number;
  price_inr: number;
};