import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EmployeeStore } from '../../../shared/stores/employee/employee.store';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-birthdays-card',
  imports: [
    MatCardModule,
    DatePipe,
    MatIconModule
  ],
  templateUrl: './birthdays-card.component.html',
  styleUrl: './birthdays-card.component.scss'
})
export class BirthdaysCardComponent {
  private readonly employeeStore = inject(EmployeeStore); 
  protected readonly birthdays = this.employeeStore.upcomingBirthdays;
}
