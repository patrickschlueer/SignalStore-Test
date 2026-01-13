import { Component } from '@angular/core';
import { CalendarToolbarComponent } from './components/calendar-toolbar/calendar-toolbar.component';
import { CalendarGridComponent } from './components/calendar-grid/calendar-grid.component';
import { CalendarFabButtonsComponent } from './components/calendar-fab-buttons/calendar-fab-buttons.component';

@Component({
  selector: 'app-calendar',
  imports: [
    CalendarToolbarComponent,
    CalendarGridComponent,
    CalendarFabButtonsComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {    
}
