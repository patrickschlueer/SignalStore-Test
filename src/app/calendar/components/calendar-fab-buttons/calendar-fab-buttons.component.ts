import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CalendarStore } from '../../../shared/stores/calendar/calendar.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar-fab-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './calendar-fab-buttons.component.html',
  styleUrl: './calendar-fab-buttons.component.scss'
})
export class CalendarFabButtonsComponent {
  readonly calendarStore = inject(CalendarStore);
  
  readonly hasSelection = computed(() => {
    return this.calendarStore.selectedCells().size > 0;
  });
  
  readonly selectionCount = computed(() => {
    return this.calendarStore.selectedCells().size;
  });
  
  onConfirm(): void {
    // TODO: Open booking dialog with selected cells
    console.log('Confirm booking for:', this.calendarStore.selectedCells());
  }
  
  onCancel(): void {
    this.calendarStore.clearSelection();
  }
}
