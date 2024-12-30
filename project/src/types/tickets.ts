export type TicketCategory = 
  | 'Dispatch Request'
  | 'Formulation'
  | 'Compliance'
  | 'Sourcing'
  | 'Packaging'
  | 'Documentation'
  | 'Costing'
  | 'Others';

export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in_progress' | 'resolved';

export type Ticket = {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  created_by: string;
  assigned_to: string | null;
  organization_id: string;
  attachments: FileUploadResult[];
  created_at: string;
  updated_at: string;
};

export type CreateTicketData = {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  attachments?: FileUploadResult[];
};

export type TicketComment = {
  id: string;
  ticket_id: string;
  user_id: string;
  content: string;
  attachments: FileUploadResult[];
  created_at: string;
};

import type { FileUploadResult } from '../lib/storage';