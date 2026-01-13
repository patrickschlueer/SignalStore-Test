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
  readonly weeks = this.calendarStore.weeksInMonth;
  readonly employees = this.employeeStore.sortedEmployees;
  readonly booking = this.calendarStore.bookings;
  readonly viewMode = this.calendarStore.viewMode;

  getDayLabel(day: CalendarDay): string {
    const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return `${dayNames[day.dayOfWeek]} ${day.dayOfMonth}`;
  }
  
  onCellClick(employee: Employee, day: CalendarDay, event: MouseEvent): void {
    console.log(this.booking);
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
    console.log('booking:');
    console.log(booking);
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
