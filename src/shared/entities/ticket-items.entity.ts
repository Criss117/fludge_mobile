import type { AuditMetadata } from './audit-metadata';

export interface TicketItemSummary extends AuditMetadata {
  id: string;
  name: string;
  ticketId: string;
  barcode: string;
  salePrice: number;
  productId: string | null;
  quantity: number;
  subTotal: number;
}
