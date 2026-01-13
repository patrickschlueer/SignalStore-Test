import { ViewMode } from '../../../types/view-mode.type';
import { BookingTypeConfig } from '../../../models/entities/booking-type-config.interface';
import { Booking } from '../../../models/entities/booking.interface';

export interface CalendarState {
  // View State
  currentMonth: Date;
  viewMode: ViewMode;
  
  // Selection State
  selectedCells: Set<string>;
  
  // Data
  bookings: Booking[];
  bookingTypes: BookingTypeConfig[];
  
  // UI State
  isLoading: boolean;
}

export const initialCalendarState: CalendarState = {
  currentMonth: new Date(),
  viewMode: 'modern' as ViewMode,
  selectedCells: new Set<string>(),
  bookings: [],
  bookingTypes: [],
  isLoading: false
};
