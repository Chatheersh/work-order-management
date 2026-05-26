import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkOrder, WorkOrderStatus } from './work-order.model';

@Injectable({ providedIn: 'root' })
export class WorkOrderService {

  private readonly apiUrl = 'http://localhost:8080/api/work-orders';

  constructor(private http: HttpClient) {}

  getAll(status?: WorkOrderStatus): Observable<WorkOrder[]> {
    const params = status ? new HttpParams().set('status', status) : undefined;
    return this.http.get<WorkOrder[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(`${this.apiUrl}/${id}`);
  }

  create(workOrder: WorkOrder): Observable<WorkOrder> {
    return this.http.post<WorkOrder>(this.apiUrl, workOrder);
  }

  update(id: number, workOrder: WorkOrder): Observable<WorkOrder> {
    return this.http.put<WorkOrder>(`${this.apiUrl}/${id}`, workOrder);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
