import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkOrderService } from '../../core/work-order.service';
import {
  WorkOrderRequest,
  WORK_ORDER_STATUSES,
  WORK_ORDER_PRIORITIES
} from '../../core/work-order.model';

@Component({
  selector: 'app-work-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.css']
})
export class WorkOrderFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  workOrderId?: number;
  statuses = WORK_ORDER_STATUSES;
  priorities = WORK_ORDER_PRIORITIES;
  errorMessage = '';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.workOrderId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.workOrderId;
    if (this.isEditMode) {
      this.loadWorkOrder(this.workOrderId!);
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
      error: () => (this.errorMessage = 'Failed to load work order.')
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.errorMessage = '';
    const payload: WorkOrderRequest = this.form.value;

    const request$ = this.isEditMode
      ? this.workOrderService.update(this.workOrderId!, payload)
      : this.workOrderService.create(payload);

    request$.subscribe({
      next: (wo) => this.router.navigate(['/work-orders', wo.id]),
      error: () => {
        this.errorMessage = 'Failed to save work order.';
        this.submitting = false;
      }
    });
  }

  get f() { return this.form.controls; }
}
