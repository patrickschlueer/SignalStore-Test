import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { ViewMode } from '../../../types/view-mode.type';
import { Booking } from '../../../models/entities/booking.interface';

export const calendarEvents = eventGroup({
  source: 'Calendar',
  events: {
    // Month Navigation
    previousMonth: type<void>(),
    nextMonth: type<void>(),
    goToMonth: type<{ year: number; month: number }>(),
    
    // View Mode
    toggleViewMode: type<void>(),
    setViewMode: type<{ mode: ViewMode }>(),
    
    // Selection
    toggleCellSelection: type<{ employeeId: string; date: Date }>(),
    clearSelection: type<void>(),
    selectMultipleCells: type<{ employeeId: string; dates: Date[] }>(),
    
    // Bookings
    addBooking: type<{ booking: Omit<Booking, 'id'> }>(),
    updateBooking: type<{ id: string; updates: Partial<Booking> }>(),
    deleteBooking: type<{ id: string }>()
  }
});
