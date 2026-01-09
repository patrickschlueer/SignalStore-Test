import { Component, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { EmployeeStore } from '../shared/stores/employee/employee.store';
import { Employee } from '../shared/models/entities/employee.interface';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  private readonly employeeStore = inject(EmployeeStore);
  
  readonly employees: Signal<Employee[]> = this.employeeStore.sortedEmployees;
  readonly totalCount: Signal<number> = this.employeeStore.totalCount;

  getInitials(employee: Employee): string {
    return `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
  }
}
