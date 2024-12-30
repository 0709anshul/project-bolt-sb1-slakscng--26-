import { supabase } from '../../supabase';

export async function getProductFormula(productId: string) {
  if (!productId) throw new Error('Product ID is required');

  try {
    const { data, error } = await supabase
      .from('product_formulas')
      .select(`
        quantity,
        material:materials!inner(
          id,
          leumas_id,
          name,
          unit_of_measurement,
          category,
          cost_per_unit
        )
      `)
      .eq('product_id', productId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching product formula:', error);
    throw error;
  }
}

export async function getMaterialInventory(materialId: string) {
  if (!materialId) throw new Error('Material ID is required');

  try {
    const [inwardResult, brandResult] = await Promise.all([
      supabase.rpc('get_current_inventory', { 
        p_material_id: materialId, 
        p_section: 'inward' 
      }),
      supabase.rpc('get_current_inventory', { 
        p_material_id: materialId, 
        p_section: 'brand' 
      })
    ]);

    if (inwardResult.error) throw inwardResult.error;
    if (brandResult.error) throw brandResult.error;

    return {
      inward: Number(inwardResult.data || 0),
      brand: Number(brandResult.data || 0)
    };
  } catch (error) {
    console.error('Error fetching material inventory:', error);
    throw error;
  }
}