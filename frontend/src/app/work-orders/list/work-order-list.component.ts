import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkOrder, WorkOrderStatus, WORK_ORDER_STATUSES } from '../../core/work-order.model';
import { WorkOrderService } from '../../core/work-order.service';

@Component({
  selector: 'app-work-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent implements OnInit {

  workOrders: WorkOrder[] = [];
  filteredStatus: WorkOrderStatus | '' = '';
  statuses = WORK_ORDER_STATUSES;
  loading = false;
  errorMessage = '';

  constructor(private workOrderService: WorkOrderService) {}

  ngOnInit(): void {
    this.loadWorkOrders();
  }

  loadWorkOrders(): void {
    this.loading = true;
    this.errorMessage = '';
    const status = this.filteredStatus || undefined;
    this.workOrderService.getAll(status as WorkOrderStatus).subscribe({
      next: (data) => {
        this.workOrders = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load work orders.';
        this.loading = false;
      }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this work order?')) return;
    this.workOrderService.delete(id).subscribe({
      next: () => this.loadWorkOrders(),
      error: () => (this.errorMessage = 'Failed to delete work order.')
    });
  }

  onStatusFilterChange(): void {
    this.loadWorkOrders();
  }

  priorityClass(priority: string): string {
    const map: Record<string, string> = {
      LOW: 'badge-low',
      MEDIUM: 'badge-medium',
      HIGH: 'badge-high',
      CRITICAL: 'badge-critical'
    };
    return map[priority] ?? '';
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      OPEN: 'status-open',
      IN_PROGRESS: 'status-in-progress',
      ON_HOLD: 'status-on-hold',
      COMPLETED: 'status-completed',
      CANCELLED: 'status-cancelled'
    };
    return map[status] ?? '';
  }
}
