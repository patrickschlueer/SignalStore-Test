import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcquisitionComponent } from './acquisition/acquisition.component';
import { SkillsComponent } from './skills/skills.component';
import { EmployeeComponent } from './employee/employee.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TimeRecordingComponent } from './time-recording/time-recording.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'acquisition', component: AcquisitionComponent },
  { path: 'skill', component: SkillsComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'time-recording', component: TimeRecordingComponent },
  { path: 'infrastructure', component: InfrastructureComponent }
];
