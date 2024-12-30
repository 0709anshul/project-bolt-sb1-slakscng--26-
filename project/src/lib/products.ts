import { supabase } from './supabase';
import type { CreateProductData, Product } from '../types/products';

export async function createProduct(data: CreateProductData): Promise<Product> {
  const { data: product, error } = await supabase
    .from('products')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  if (!product) throw new Error('Failed to create product');

  return product;
}