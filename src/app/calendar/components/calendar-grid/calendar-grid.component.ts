import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalendarStore } from '../../../shared/stores/calendar/calendar.store';
import { EmployeeStore } from '../../../shared/stores/employee/employee.store';
import { CalendarDay } from '../../../shared/models/helper/calendar-day.interface';
import { Employee } from '../../../shared/models/entities/employee.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.scss'
})
export class CalendarGridComponent {
  readonly calendarStore = inject(CalendarStore);
  readonly employeeStore = inject(EmployeeStore);
  
  readonly days = this.calendarStore.daysInMonth;
  readonly employees = this.employeeStore.sortedEmployees;
  readonly viewMode = this.calendarStore.viewMode;
  
  // Group days by week for week number display
  readonly weeks = computed(() => {
    const days = this.days();
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];
    let lastWeekNumber = -1;
    
    days.forEach(day => {
      if (day.weekNumber !== lastWeekNumber && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
      lastWeekNumber = day.weekNumber;
    });
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  });
  
  getDayLabel(day: CalendarDay): string {
    const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return `${dayNames[day.dayOfWeek]} ${day.dayOfMonth}`;
  }
  
  onCellClick(employee: Employee, day: CalendarDay, event: MouseEvent): void {
    // Skip if weekend or holiday
    if (day.isWeekend || day.isHoliday) return;
    
    const booking = this.calendarStore.getBookingForDay(employee.id, day.date);
    
    if (booking) {
      // TODO: Open booking edit/delete dialog
      console.log('Edit booking:', booking);
    } else {
      // Select cell for new booking
      this.calendarStore.toggleCellSelection(employee.id, day.date);
    }
  }
  
  getCellClass(employee: Employee, day: CalendarDay): string[] {
    const classes: string[] = ['calendar-cell'];
    
    if (day.isWeekend || day.isHoliday) {
      classes.push('disabled');
    }
    
    if (day.isToday) {
      classes.push('today');
    }
    
    const booking = this.calendarStore.getBookingForDay(employee.id, day.date);
    if (booking) {
      classes.push('has-booking', `booking-${booking.type}`);
    }
    
    if (this.calendarStore.isCellSelected(employee.id, day.date)) {
      classes.push('selected');
    }
    
    return classes;
  }
  
  getBookingIcon(employee: Employee, day: CalendarDay): string | null {
    const booking = this.calendarStore.getBookingForDay(employee.id, day.date);
    if (!booking) return null;
    
    const config = this.calendarStore.getBookingTypeConfig(booking.type);
    return config?.icon || null;
  }
  
  getBookingLabel(employee: Employee, day: CalendarDay): string | null {
    const booking = this.calendarStore.getBookingForDay(employee.id, day.date);
    if (!booking) return null;
    
    const config = this.calendarStore.getBookingTypeConfig(booking.type);
    return config?.label || null;
  }
}
