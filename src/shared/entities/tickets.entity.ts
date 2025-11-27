import type { AuditMetadata } from './audit-metadata';
import type { EmployeeSummary } from './employee.entity';
import type { TicketItemSummary } from './ticket-items.entity';

export const TICKET_STATUSES = ['pending', 'completed', 'canceled'] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export interface TicketSummary extends AuditMetadata {
  id: string;
  businessId: string;
  employeeId?: string | null;
  total: number;
  status: TicketStatus;
}

export interface TicketDetail extends TicketSummary {
  employee: EmployeeSummary;
  items: TicketItemSummary[];
}
