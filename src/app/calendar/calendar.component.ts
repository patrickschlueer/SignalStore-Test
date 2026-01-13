import { Component, HostListener, inject } from '@angular/core';
import { CalendarToolbarComponent } from './components/calendar-toolbar/calendar-toolbar.component';
import { CalendarGridComponent } from './components/calendar-grid/calendar-grid.component';
import { CalendarFabButtonsComponent } from './components/calendar-fab-buttons/calendar-fab-buttons.component';
import { CalendarStore } from '../shared/stores/calendar/calendar.store';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarToolbarComponent,
    CalendarGridComponent,
    CalendarFabButtonsComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  readonly calendarStore = inject(CalendarStore);
    
  @HostListener('window:keydown', ['$event'])
  handleArrowKeys(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.calendarStore.previousMonth();
    }
    if (event.key === 'ArrowRight') {
      this.calendarStore.nextMonth();
    }
  }

    
  @HostListener('window:keydown', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.calendarStore.clearSelection();
    }
  }
}
