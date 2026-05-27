import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkOrderTaskService } from './work-order-task.service';
import { WorkOrderTask } from '../models/work-order-task.model';

describe('WorkOrderTaskService', () => {
  let service: WorkOrderTaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkOrderTaskService]
    });
    service = TestBed.inject(WorkOrderTaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should list tasks for a work order', () => {
    const mock: WorkOrderTask[] = [{ id: 1, workOrderId: 5, description: 't', completed: false, order: 1 }];
    service.listByWorkOrder(5).subscribe(data => expect(data).toEqual(mock));

    const req = httpMock.expectOne('http://localhost:8080/api/work-order-tasks?workOrderId=5');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should update a task via PATCH', () => {
    const task: WorkOrderTask = { id: 2, workOrderId: 1, description: 'x', completed: true, order: 3 };
    service.update(task).subscribe(data => expect(data).toEqual(task));

    const req = httpMock.expectOne('http://localhost:8080/api/work-order-tasks/2');
    expect(req.request.method).toBe('PATCH');
    req.flush(task);
  });
});
