import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CalendarStore } from '../../../shared/stores/calendar/calendar.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './calendar-toolbar.component.html',
  styleUrl: './calendar-toolbar.component.scss'
})
export class CalendarToolbarComponent {
  
  @HostListener('window:keydown', ['$event'])
  handleArrowKeys(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'ArrowLeft') {
      this.calendarStore.previousMonth();
    }
    if (event.key === 'ArrowRight') {
      this.calendarStore.nextMonth();
    }
  }

  readonly calendarStore = inject(CalendarStore);
  
  // Month options for quick navigation
  readonly months = [
    { value: 0, label: 'Januar' },
    { value: 1, label: 'Februar' },
    { value: 2, label: 'März' },
    { value: 3, label: 'April' },
    { value: 4, label: 'Mai' },
    { value: 5, label: 'Juni' },
    { value: 6, label: 'Juli' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'Oktober' },
    { value: 10, label: 'November' },
    { value: 11, label: 'Dezember' }
  ];
  
  readonly currentYear = new Date().getFullYear();
  readonly years = Array.from({ length: 3 }, (_, i) => this.currentYear - 1 + i);

  onPreviousMonth(): void {
    this.calendarStore.previousMonth();
  }
  
  onNextMonth(): void {
    this.calendarStore.nextMonth();
  }
  
  onMonthSelect(year: number, month: number): void {
    this.calendarStore.goToMonth(year, month);
  }
  
  onViewModeChange(): void {
    this.calendarStore.toggleViewMode();
  }
}


// TODO:
// Bug wenn man wiederkehrende Buchungen erstellt dann werden die initial ausgewählten Tage nicht mit gebucht
// Wenn man über die Schnellaktion ein Projekt buchen will, dann geht das ohne Kunde. Hier muss ein Kunde ausgewählt werden.