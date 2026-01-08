import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BirthdayStore } from '../../../shared/stores/birthday/birthday.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-birthdays-card',
  imports: [
    MatCardModule,
    DatePipe
  ],
  templateUrl: './birthdays-card.component.html',
  styleUrl: './birthdays-card.component.scss'
})
export class BirthdaysCardComponent {
  private readonly birthdayStore = inject(BirthdayStore); 
  protected readonly birthdays = this.birthdayStore.sortedBirthdays;
}
