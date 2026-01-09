import { Component, inject, Signal } from '@angular/core';
import { EmployeeStore } from '../shared/stores/employee/employee.store';
import { Employee } from '../shared/models/entities/employee.interface';
import { EmployeeCardComponent } from './employee-card/employee-card.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    EmployeeCardComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  private readonly employeeStore = inject(EmployeeStore);
  
  readonly employees: Signal<Employee[]> = this.employeeStore.sortedEmployees;
  readonly totalCount: Signal<number> = this.employeeStore.totalCount;
}
