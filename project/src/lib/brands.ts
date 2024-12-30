import { supabase } from './supabase';
import type { CreateBrandData, UpdateBrandData, Organization } from '../types/organizations';

export async function createBrand(data: CreateBrandData): Promise<Organization> {
  const { data: brand, error } = await supabase
    .from('organizations')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  if (!brand) throw new Error('Failed to create brand');

  return brand;
}

export async function updateBrand(id: string, data: UpdateBrandData): Promise<Organization> {
  const { data: brand, error } = await supabase
    .from('organizations')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  if (!brand) throw new Error('Failed to update brand');

  return brand;
}