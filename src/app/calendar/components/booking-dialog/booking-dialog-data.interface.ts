import { BookingType } from '../../../shared/types/booking.type';
import { Employee } from '../../../shared/models/entities/employee.interface';

export interface DateRange {
  startDate: Date;
  endDate: Date;
  dayCount: number;
}

export interface BookingDialogData {
  employee: Employee;
  dateRanges: DateRange[];
}

export interface BookingDialogResult {
  bookingType: BookingType;
  note?: string;
  customerId?: string; // Für Projekte
  recurring?: {
    weekdays: number[]; // 0 = Sunday, 6 = Saturday
    until: Date;
  };
}
