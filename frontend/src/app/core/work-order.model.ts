export type WorkOrderStatus = 'OPEN' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
export type WorkOrderPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface WorkOrder {
  id?: number;
  title: string;
  description?: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignee?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const WORK_ORDER_STATUSES: WorkOrderStatus[] = [
  'OPEN', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED'
];

export const WORK_ORDER_PRIORITIES: WorkOrderPriority[] = [
  'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
];

export interface WorkOrderRequest {
  title: string;
  description?: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignee?: string;
}
