import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderService } from '../../services/work-order.service';
import { WorkOrderRequest, WorkOrderStatus, WorkOrderPriority } from '../../models/work-order.model';

@Component({
  selector: 'app-work-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './work-order-form.component.html',
  styleUrl: './work-order-form.component.scss'
})
export class WorkOrderFormComponent implements OnInit {

  form!: FormGroup;
  editId: number | null = null;
  isEditMode = false;
  errorMessage = '';
  submitting = false;

  readonly statuses: WorkOrderStatus[] = ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  readonly priorities: WorkOrderPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(
    private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editId = +idParam;
      this.isEditMode = true;
      this.loadWorkOrder(this.editId);
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      status: ['OPEN', Validators.required],
      priority: ['MEDIUM', Validators.required],
      assignee: ['']
    });
  }

  private loadWorkOrder(id: number): void {
    this.workOrderService.getById(id).subscribe({
      next: (wo) => this.form.patchValue(wo),
      error: () => this.errorMessage = 'Failed to load work order.'
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    const request: WorkOrderRequest = this.form.value;
    const operation = this.isEditMode
      ? this.workOrderService.update(this.editId!, request)
      : this.workOrderService.create(request);

    operation.subscribe({
      next: () => this.router.navigate(['/work-orders']),
      error: () => {
        this.errorMessage = 'Failed to save work order.';
        this.submitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/work-orders']);
  }

  formatLabel(value: string): string {
    return value.split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }
}

