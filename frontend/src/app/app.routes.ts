import { Routes } from '@angular/router';
import { WorkOrderListComponent } from './components/work-order-list/work-order-list.component';
import { WorkOrderFormComponent } from './components/work-order-form/work-order-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'work-orders', pathMatch: 'full' },
  { path: 'work-orders', component: WorkOrderListComponent },
  { path: 'work-orders/new', component: WorkOrderFormComponent },
  { path: 'work-orders/:id/edit', component: WorkOrderFormComponent }
];

