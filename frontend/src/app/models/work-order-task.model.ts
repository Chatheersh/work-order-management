export interface WorkOrderTask {
  id: number;
  workOrderId: number;
  description: string;
  completed: boolean;
  order: number;
}
