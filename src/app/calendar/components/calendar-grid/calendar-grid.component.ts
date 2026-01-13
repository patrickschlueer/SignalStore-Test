import { Component, inject, computed, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalendarStore } from '../../../shared/stores/calendar/calendar.store';
import { EmployeeStore } from '../../../shared/stores/employee/employee.store';
import { CalendarDay } from '../../../shared/models/helper/calendar-day.interface';
import { Employee } from '../../../shared/models/entities/employee.interface';
import { MatIconModule } from '@angular/material/icon';
import { CalendarContextMenuComponent, ContextMenuPosition } from '../calendar-context-menu/calendar-context-menu.component';
import { BookingType } from '../../../shared/types/booking.type';

@Component({
  selector: 'app-calendar-grid',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    CalendarContextMenuComponent
  ],
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.scss'
})
export class CalendarGridComponent {

  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    if (this.calendarStore.isDragging()) {
      this.calendarStore.endDrag();
    }
  }

  readonly calendarStore = inject(CalendarStore);
  readonly employeeStore = inject(EmployeeStore);
  
  readonly days = this.calendarStore.daysInMonth;
  readonly weeks = this.calendarStore.weeksInMonth;
  readonly employees = this.employeeStore.sortedEmployees;
  readonly booking = this.calendarStore.bookings;
  readonly viewMode = this.calendarStore.viewMode;
  
  // Context Menu State
  readonly contextMenuVisible = signal(false);
  readonly contextMenuPosition = signal<ContextMenuPosition>({ x: 0, y: 0 });
  private contextMenuEmployee = signal<Employee | null>(null);
  private contextMenuDay = signal<CalendarDay | null>(null);
  
  // Drag tracking
  private dragMoved = false;

  getDayLabel(day: CalendarDay): string {
    const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return `${dayNames[day.dayOfWeek]} ${day.dayOfMonth}`;
  }
  
  onCellClick(employee: Employee, day: CalendarDay, event: MouseEvent): void {
    // Skip if weekend or holiday
    if (day.isWeekend || day.isHoliday) return;
    
    // Skip if this was a drag operation
    if (this.dragMoved) {
      this.dragMoved = false;
      return;
    }
    
    const booking = this.calendarStore.getBookingForDay(employee.id, day.date);
    
    // Shift + Click: Range Selection
    if (event.shiftKey) {
      this.calendarStore.selectRange(employee.id, day.date);
      return;
    }
    
    // STRG + Click: Select all free days in week
    if (event.ctrlKey || event.metaKey) {
      this.calendarStore.selectWeekFreeDays(employee.id, day.date);
      return;
    }
    
    if (booking) {
      // TODO: Open booking edit/delete dialog
      console.log('Edit booking:', booking);
    } else {
      // Normal click: Toggle single cell
      this.calendarStore.toggleCellSelection(employee.id, day.date);
    }
  }
  
  onCellRightClick(employee: Employee, day: CalendarDay, event: MouseEvent): void {
    event.preventDefault();
    
    // Skip if weekend or holiday
    if (day.isWeekend || day.isHoliday) return;
    
    // Don't show context menu if there's already a booking
    const booking = this.calendarStore.getBookingForDay(employee.id, day.date);
    if (booking) return;
    
    // Store context for later use
    this.contextMenuEmployee.set(employee);
    this.contextMenuDay.set(day);
    
    // Show context menu at cursor position
    this.contextMenuPosition.set({ x: event.clientX, y: event.clientY });
    this.contextMenuVisible.set(true);
  }
  
  onContextMenuBookingTypeSelected(bookingType: BookingType): void {
    const employee = this.contextMenuEmployee();
    const day = this.contextMenuDay();
    
    if (!employee || !day) return;
    
    // Create booking
    this.calendarStore.addBooking({
      employeeId: employee.id,
      startDate: day.date,
      endDate: day.date,
      type: bookingType
    });
    
    // Close context menu
    this.closeContextMenu();
  }
  
  closeContextMenu(): void {
    this.contextMenuVisible.set(false);
    this.contextMenuEmployee.set(null);
    this.contextMenuDay.set(null);
  }
  
  // ===================================
  // Drag-to-Select
  // ===================================
  
  onCellMouseDown(employee: Employee, day: CalendarDay, event: MouseEvent): void {
    // Only start drag on left mouse button
    if (event.button !== 0) return;
    
    // Skip if weekend or holiday
    if (day.isWeekend || day.isHoliday) return;
    
    // Don't start drag if there's a booking
    const booking = this.calendarStore.getBookingForDay(employee.id, day.date);
    if (booking) return;
    
    // Don't start drag if modifier keys are pressed
    if (event.shiftKey || event.ctrlKey || event.metaKey) return;
    
    // Reset drag moved flag
    this.dragMoved = false;
    
    // Start potential drag
    this.calendarStore.startDrag(employee.id, day.date);
  }
  
  onCellMouseEnter(employee: Employee, day: CalendarDay, event: MouseEvent): void {
    // Only continue drag if left mouse button is held
    if (event.buttons !== 1) return;
    
    // Skip if not dragging
    if (!this.calendarStore.isDragging()) return;
    
    // Skip if weekend or holiday
    if (day.isWeekend || day.isHoliday) return;
    
    // Mark that we moved during drag
    this.dragMoved = true;
    
    this.calendarStore.dragOver(employee.id, day.date);
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
