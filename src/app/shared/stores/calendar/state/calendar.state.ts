import { ViewMode } from '../../../types/view-mode.type';
import { BookingTypeConfig } from '../../../models/entities/booking-type-config.interface';
import { Booking } from '../../../models/entities/booking.interface';

export interface CalendarState {
  // View State
  currentMonth: Date;
  viewMode: ViewMode;
  
  // Selection State
  selectedCells: Set<string>;
  rangeSelectionStart: { employeeId: string; date: Date } | null;
  
  // Drag State
  isDragging: boolean;
  dragStartCell: { employeeId: string; date: Date } | null;
  dragCurrentCell: { employeeId: string; date: Date } | null; // Für Preview
  
  // Data
  bookings: Booking[];
  bookingTypes: BookingTypeConfig[];
  
  // UI State
  isLoading: boolean;
}

export const initialCalendarState: CalendarState = {
  currentMonth: new Date(),
  viewMode: 'compact' as ViewMode,
  selectedCells: new Set<string>(),
  rangeSelectionStart: null,
  isDragging: false,
  dragStartCell: null,
  dragCurrentCell: null,
  bookings: [],
  bookingTypes: [],
  isLoading: false
};
