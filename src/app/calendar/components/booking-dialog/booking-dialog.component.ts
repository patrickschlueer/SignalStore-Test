import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { BookingDialogData, BookingDialogResult } from './booking-dialog-data.interface';
import { BookingType } from '../../../shared/types/booking.type';
import { BOOKING_TYPE_CONFIGS } from '../../../shared/mocks/booking-type-config.mock';
import { MOCK_CUSTOMERS } from '../../../shared/mocks/customer.mock';
import { getWeekNumber, formatDateRange } from '../../../shared/helper/date-helper';

@Component({
  selector: 'app-booking-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.scss'
})
export class BookingDialogComponent {
  readonly dialogRef = inject(MatDialogRef<BookingDialogComponent>);
  readonly data = inject<BookingDialogData>(MAT_DIALOG_DATA);
  
  readonly bookingTypes = BOOKING_TYPE_CONFIGS;
  readonly customers = MOCK_CUSTOMERS;
  
  // Dialog State
  readonly selectedBookingType = signal<BookingType | null>(null);
  readonly selectedCustomerId = signal<string | null>(null);
  readonly note = signal<string>('');
  readonly isRecurring = signal<boolean>(false);
  readonly recurringUntil = signal<Date | null>(null);
  
  readonly weekdays = [
    { value: 1, label: 'Mo', name: 'Montag' },
    { value: 2, label: 'Di', name: 'Dienstag' },
    { value: 3, label: 'Mi', name: 'Mittwoch' },
    { value: 4, label: 'Do', name: 'Donnerstag' },
    { value: 5, label: 'Fr', name: 'Freitag' },
    { value: 6, label: 'Sa', name: 'Samstag' },
    { value: 0, label: 'So', name: 'Sonntag' }
  ];
  
  readonly maxNoteLength = 150;
  readonly minRecurringDate = new Date();
  
  // Computed: Welche Wochentage sind in der Auswahl?
  readonly selectedWeekdaysFromRange = computed(() => {
    const weekdays = new Set<number>();
    this.data.dateRanges.forEach(range => {
      const current = new Date(range.startDate);
      const end = new Date(range.endDate);
      
      while (current <= end) {
        weekdays.add(current.getDay());
        current.setDate(current.getDate() + 1);
      }
    });
    return weekdays;
  });
  
  // Computed: Ist Wiederkehrend erlaubt? (max 1 Zeitraum in max 1 Woche)
  readonly canBeRecurring = computed(() => {
    // Nur 1 Zeitraum erlaubt
    if (this.data.dateRanges.length !== 1) return false;
    
    const range = this.data.dateRanges[0];
    const startWeek = getWeekNumber(range.startDate);
    const endWeek = getWeekNumber(range.endDate);
    
    // Start und Ende müssen in derselben Woche sein
    return startWeek === endWeek;
  });
  
  // Computed: Zeige Kunden-Auswahl wenn "projekt" gewählt
  readonly showCustomerSelection = computed(() => {
    return this.selectedBookingType() === 'project';
  });
  
  onBookingTypeChange(type: BookingType): void {
    this.selectedBookingType.set(type);
    console.log(type);
    
    // Reset customer wenn nicht mehr "projekt"
    if (type !== 'project') {
      this.selectedCustomerId.set(null);
    }
  }
  
  isWeekdayInRange(day: number): boolean {
    return this.selectedWeekdaysFromRange().has(day);
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  onConfirm(): void {
    const bookingType = this.selectedBookingType();
    if (!bookingType) return;
    
    const result: BookingDialogResult = {
      bookingType,
      note: this.note() || undefined,
      customerId: this.selectedCustomerId() || undefined
    };
    
    // Add recurring info if enabled
    if (this.isRecurring() && this.recurringUntil()) {
      result.recurring = {
        weekdays: Array.from(this.selectedWeekdaysFromRange()),
        until: this.recurringUntil()!
      };
    }
    
    this.dialogRef.close(result);
  }
  
  canConfirm(): boolean {
    const hasBookingType = !!this.selectedBookingType();
    
    // Wenn "projekt", dann muss Kunde ausgewählt sein
    if (this.selectedBookingType() === 'project' && !this.selectedCustomerId()) {
      return false;
    }
    
    if (this.isRecurring()) {
      const hasUntilDate = !!this.recurringUntil();
      return hasBookingType && hasUntilDate;
    }
    
    return hasBookingType;
  }
  

  getDayCountLabel(count: number): string {
    return count === 1 ? '1 Tag' : `${count} Tage`;
  }
  
  getBookingTypeIcon(type: BookingType): string {
    return this.bookingTypes.find(bt => bt.type === type)?.icon || 'calendar_today';
  }
  
  formatDateRange(startDate: Date, endDate: Date): string {
    return formatDateRange(startDate, endDate);
  }

}
