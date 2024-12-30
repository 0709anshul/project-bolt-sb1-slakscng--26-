import type { TicketCategory } from '../types/tickets';

export const TICKET_CATEGORIES: TicketCategory[] = [
  'Dispatch Request',
  'Formulation',
  'Compliance',
  'Sourcing',
  'Packaging',
  'Documentation',
  'Costing',
  'Others'
];

export function getCategoryPlaceholder(category: TicketCategory): string {
  switch (category) {
    case 'Dispatch Request':
      return 'Please provide:\n- Goods to be dispatched\n- Date\n- Vehicle number\n- Manifest Copy (to be attached)';
    case 'Formulation':
      return 'Please provide:\n- Product Brief\n- Agenda\n- Dates that work for you';
    default:
      return '';
  }
}