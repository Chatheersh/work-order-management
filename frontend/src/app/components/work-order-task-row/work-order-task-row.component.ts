import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderTask } from '../../models/work-order-task.model';
import { WorkOrderTaskService } from '../../services/work-order-task.service';

@Component({
  selector: 'app-work-order-task-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-order-task-row.component.html',
  styleUrls: ['./work-order-task-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkOrderTaskRowComponent {
  @Input() task!: WorkOrderTask;
  @Output() toggled = new EventEmitter<WorkOrderTask>();

  constructor(private taskService: WorkOrderTaskService) {}

  /** Handle user toggling completion. Performs optimistic update and persists change. */
  onToggle(event: Event): void {
    const input = event.target as HTMLInputElement;
    const updated: WorkOrderTask = { ...this.task, completed: input.checked };
    // optimistic emit
    this.toggled.emit(updated);
    // persist change
    this.taskService.update(updated).subscribe({
      next: (saved) => this.task = saved,
      error: () => {
        // revert on error and emit reverted state
        const reverted: WorkOrderTask = { ...this.task, completed: !updated.completed };
        this.toggled.emit(reverted);
        this.task = reverted;
      }
    });
  }
}
