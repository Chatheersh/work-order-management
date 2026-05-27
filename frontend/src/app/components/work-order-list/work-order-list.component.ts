import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order.model';
import { WorkOrderService } from '../../services/work-order.service';

@Component({
  selector: 'app-work-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, NgClass, TitleCasePipe],
  templateUrl: './work-order-list.component.html',
  styleUrl: './work-order-list.component.scss'
})
export class WorkOrderListComponent implements OnInit {

  workOrders: WorkOrder[] = [];
  errorMessage = '';

  constructor(private workOrderService: WorkOrderService) {}

  ngOnInit(): void {
    this.loadWorkOrders();
  }

  loadWorkOrders(): void {
    this.workOrderService.getAll().subscribe({
      next: (data) => this.workOrders = data,
      error: () => this.errorMessage = 'Failed to load work orders.'
    });
  }

  deleteWorkOrder(id: number): void {
    if (!confirm('Are you sure you want to delete this work order?')) return;
    this.workOrderService.delete(id).subscribe({
      next: () => this.loadWorkOrders(),
      error: () => this.errorMessage = 'Failed to delete work order.'
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      OPEN: 'status-open',
      IN_PROGRESS: 'status-in-progress',
      COMPLETED: 'status-completed',
      CANCELLED: 'status-cancelled'
    };
    return map[status] ?? '';
  }

  getPriorityClass(priority: string): string {
    const map: Record<string, string> = {
      HIGH: 'badge-high',
      MEDIUM: 'badge-medium',
      LOW: 'badge-low'
    };
    return map[priority] ?? '';
  }

  formatLabel(value: string): string {
    return value.split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }
}

