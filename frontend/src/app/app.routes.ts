import { Routes } from '@angular/router';
import { WorkOrderListComponent } from './work-orders/list/work-order-list.component';
import { WorkOrderFormComponent } from './work-orders/form/work-order-form.component';
import { WorkOrderDetailComponent } from './work-orders/detail/work-order-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'work-orders', pathMatch: 'full' },
  { path: 'work-orders', component: WorkOrderListComponent },
  { path: 'work-orders/new', component: WorkOrderFormComponent },
  { path: 'work-orders/:id', component: WorkOrderDetailComponent },
  { path: 'work-orders/:id/edit', component: WorkOrderFormComponent },
  { path: '**', redirectTo: 'work-orders' }
];
