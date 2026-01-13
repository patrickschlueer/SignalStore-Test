import { Component, inject, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CalendarStore } from '../../../shared/stores/calendar/calendar.store';
import { EmployeeStore } from '../../../shared/stores/employee/employee.store';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { BookingDialogData } from '../booking-dialog/booking-dialog-data.interface';

// Cell Key Separator - muss mit calendar.methods.ts übereinstimmen
const CELL_KEY_SEPARATOR = '|||';

function parseCellKey(key: string): { employeeId: string; dateStr: string } {
  const [employeeId, dateStr] = key.split(CELL_KEY_SEPARATOR);
  return { employeeId, dateStr };
}

@Component({
  selector: 'app-calendar-fab-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './calendar-fab-buttons.component.html',
  styleUrl: './calendar-fab-buttons.component.scss'
})
export class CalendarFabButtonsComponent {

      
  @HostListener('window:keydown', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onConfirm();
    }
  }
  
  readonly calendarStore = inject(CalendarStore);
  readonly employeeStore = inject(EmployeeStore);
  readonly dialog = inject(MatDialog);
  
  readonly hasSelection = computed(() => {
    return this.calendarStore.selectedCells().size > 0;
  });
  
  readonly selectionCount = computed(() => {
    return this.calendarStore.selectedCells().size;
  });
  
  onConfirm(): void {
    // Get employee ID from first selected cell
    const firstCell = Array.from(this.calendarStore.selectedCells())[0];
    const { employeeId } = parseCellKey(firstCell);
    
    // Find employee
    const employee = this.employeeStore.employees().find(e => e.id === employeeId);
    if (!employee) return;
    
    // Get date ranges
    const dateRanges = this.calendarStore.getSelectedDateRanges(employeeId);
    
    // Open dialog
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: {
        employee,
        dateRanges
      } as BookingDialogData,
      disableClose: false,
      autoFocus: true
    });
    
    // Handle dialog result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedCells = this.calendarStore.selectedCells();
        const dates: Date[] = [];
        
        // Extract all dates for this employee
        selectedCells.forEach(key => {
          const { employeeId: empId, dateStr } = parseCellKey(key);
          if (empId === employeeId) {
            dates.push(new Date(dateStr));
          }
        });
        
        if (result.recurring) {
          // Create recurring bookings
          this.calendarStore.addBookingsWithRecurrence(
            employeeId,
            result.bookingType,
            result.note,
            result.recurring,
            result.customerId
          );
        } else {
          // Create single bookings for each selected date
          dates.forEach(date => {
            this.calendarStore.addBooking({
              employeeId,
              startDate: date,
              endDate: date,
              type: result.bookingType,
              note: result.note,
              customerId: result.customerId
            });
          });
        }
        
        // Clear selection
        this.calendarStore.clearSelection();
      }
    });
  }
  
  onCancel(): void {
    this.calendarStore.clearSelection();
  }
}
