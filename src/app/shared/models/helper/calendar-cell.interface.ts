import { Employee } from '../entities/employee.interface';
import { Booking } from '../entities/booking.interface';
import { CalendarDay } from './calendar-day.interface';

export interface CalendarCell {
  employee: Employee;
  day: CalendarDay;
  booking?: Booking;
  isSelected: boolean;
}
