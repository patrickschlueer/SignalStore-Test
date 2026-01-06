import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagingComponent } from './messaging/messaging.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'messaging', component: MessagingComponent }
];
