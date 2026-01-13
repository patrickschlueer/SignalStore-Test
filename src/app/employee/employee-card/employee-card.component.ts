import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Employee } from '../../shared/models/entities/employee.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    MatIconModule
  ],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
  employee = input.required<Employee>();

  getInitials(employee: Employee): string {
    return `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
  }
}
