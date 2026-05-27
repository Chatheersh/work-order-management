import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { WorkOrderTaskRowComponent } from './work-order-task-row.component';
import { WorkOrderTask } from '../../models/work-order-task.model';
import { WorkOrderTaskService } from '../../services/work-order-task.service';
import { of } from 'rxjs';

describe('WorkOrderTaskRowComponent', () => {
  let fixture: ComponentFixture<WorkOrderTaskRowComponent>;
  let component: WorkOrderTaskRowComponent;
  let mockService: jasmine.SpyObj<WorkOrderTaskService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('WorkOrderTaskService', ['update']);
    await TestBed.configureTestingModule({
      imports: [WorkOrderTaskRowComponent],
      providers: [{ provide: WorkOrderTaskService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkOrderTaskRowComponent);
    component = fixture.componentInstance;
  });

  it('renders description and completed state', () => {
    const task: WorkOrderTask = { id: 1, workOrderId: 1, description: 'Test task', completed: true, order: 2 };
    component.task = task;
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.desc');
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(label.textContent.trim()).toBe('Test task');
    expect(checkbox.checked).toBeTrue();
  });

  it('toggles checkbox emits toggled event and calls service', () => {
    const task: WorkOrderTask = { id: 1, workOrderId: 1, description: 'Toggle me', completed: false, order: 1 };
    component.task = task;
    mockService.update.and.returnValue(of({ ...task, completed: true }));

    spyOn(component.toggled, 'emit');
    fixture.detectChanges();

    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    expect(component.toggled.emit).toHaveBeenCalledWith(jasmine.objectContaining({ completed: true }));
    expect(mockService.update).toHaveBeenCalled();
  });
});
