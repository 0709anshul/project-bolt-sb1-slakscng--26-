export const UNITS_OF_MEASUREMENT = {
  gram: 'Gram',
  kilogram: 'Kilogram',
  unit: 'Unit',
  millilitre: 'Millilitre',
  litre: 'Litre'
} as const;

export const MATERIAL_CATEGORIES = {
  RM: 'Raw Material',
  PM: 'Packaging Material',
  FG: 'Finished Goods'
} as const;

export const STORE_SECTIONS = {
  inward: 'Inward Store',
  brand: 'Customer Brand Section',
  production: 'Production Floor',
  fg_store: 'FG Store'
} as const;

export const ORDER_STATUSES = {
  pending: 'Pending',
  ordered: 'Ordered',
  dispatched: 'Dispatched',
  received: 'Received'
} as const;