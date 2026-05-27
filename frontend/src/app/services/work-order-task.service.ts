import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WorkOrderTask } from '../models/work-order-task.model';

@Injectable({ providedIn: 'root' })
export class WorkOrderTaskService {
  private readonly apiUrl = 'http://localhost:8080/api/work-order-tasks';

  constructor(private http: HttpClient) {}

  /**
   * List tasks for a work order.
   */
  listByWorkOrder(workOrderId: number): Observable<WorkOrderTask[]> {
    return this.http.get<WorkOrderTask[]>(`${this.apiUrl}?workOrderId=${workOrderId}`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Update a task.
   */
  update(task: WorkOrderTask): Observable<WorkOrderTask> {
    return this.http.patch<WorkOrderTask>(`${this.apiUrl}/${task.id}`, task)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
