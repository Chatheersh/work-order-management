import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkOrder } from '../../core/work-order.model';
import { WorkOrderService } from '../../core/work-order.service';

@Component({
  selector: 'app-work-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {

  workOrder?: WorkOrder;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workOrderService: WorkOrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.loading = true;
    this.workOrderService.getById(id).subscribe({
      next: (wo) => {
        this.workOrder = wo;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Work order not found.';
        this.loading = false;
      }
    });
  }

  delete(): void {
    if (!this.workOrder?.id || !confirm('Delete this work order?')) return;
    this.workOrderService.delete(this.workOrder.id).subscribe({
      next: () => this.router.navigate(['/work-orders']),
      error: () => (this.errorMessage = 'Failed to delete work order.')
    });
  }

  priorityClass(priority: string): string {
    const map: Record<string, string> = {
      LOW: 'badge-low', MEDIUM: 'badge-medium', HIGH: 'badge-high', CRITICAL: 'badge-critical'
    };
    return map[priority] ?? '';
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      OPEN: 'status-open', IN_PROGRESS: 'status-in-progress',
      ON_HOLD: 'status-on-hold', COMPLETED: 'status-completed', CANCELLED: 'status-cancelled'
    };
    return map[status] ?? '';
  }
}
