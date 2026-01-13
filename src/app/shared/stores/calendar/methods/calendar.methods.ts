import { patchState } from '@ngrx/signals';
import { ViewMode } from '../../../types/view-mode.type';
import { Booking } from '../../../models/entities/booking.interface';

export const createCalendarMethods = (store: any) => ({
  // ===================================
  // Month Navigation
  // ===================================
  
  previousMonth: () => {
    const current = store.currentMonth();
    const newMonth = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    patchState(store, { currentMonth: newMonth });
  },
  
  nextMonth: () => {
    const current = store.currentMonth();
    const newMonth = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    patchState(store, { currentMonth: newMonth });
  },
  
  goToMonth: (year: number, month: number) => {
    const newMonth = new Date(year, month, 1);
    patchState(store, { currentMonth: newMonth });
  },
  
  // ===================================
  // View Mode
  // ===================================
  
  toggleViewMode: () => {
    const newMode = store.viewMode() === 'modern' ? 'compact' : 'modern';
    patchState(store, { viewMode: newMode });
  },
  
  setViewMode: (mode: ViewMode) => {
    patchState(store, { viewMode: mode });
  },
  
  // ===================================
  // Selection
  // ===================================
  
  toggleCellSelection: (employeeId: string, date: Date) => {
    const key = `${employeeId}-${date.toISOString()}`;
    const selected = new Set(store.selectedCells());
    
    if (selected.has(key)) {
      selected.delete(key);
    } else {
      selected.add(key);
    }
    
    patchState(store, { selectedCells: selected });
  },
  
  clearSelection: () => {
    patchState(store, { selectedCells: new Set<string>() });
  },
  
  selectMultipleCells: (employeeId: string, dates: Date[]) => {
    const selected = new Set(store.selectedCells());
    
    dates.forEach(date => {
      const key = `${employeeId}-${date.toISOString()}`;
      selected.add(key);
    });
    
    patchState(store, { selectedCells: selected });
  },
  
  // ===================================
  // Helper Methods (mit Parametern)
  // ===================================
  
  isCellSelected: (employeeId: string, date: Date): boolean => {
    const key = `${employeeId}-${date.toISOString()}`;
    return store.selectedCells().has(key);
  },
  
  getBookingForDay: (employeeId: string, date: Date) => {
    const dateTime = date.getTime();
    return store.bookings().find((booking: any) => {
      if (booking.employeeId !== employeeId) return false;
      const startTime = booking.startDate.getTime();
      const endTime = booking.endDate.getTime();
      return dateTime >= startTime && dateTime <= endTime;
    });
  },
  
  getBookingTypeConfig: (type: string) => {
    return store.bookingTypes().find((bt: any) => bt.type === type);
  },
  
  // ===================================
  // Bookings (Mock - später async)
  // ===================================
  
  addBooking: (booking: Omit<Booking, 'id'>) => {
    const newBooking = {
      ...booking,
      id: `b${Date.now()}`
    };
    
    patchState(store, {
      bookings: [...store.bookings(), newBooking]
    });
  },
  
  updateBooking: (id: string, updates: Partial<Booking>) => {
    const updatedBookings = store.bookings().map((b: any) =>
      b.id === id ? { ...b, ...updates } : b
    );
    
    patchState(store, { bookings: updatedBookings });
  },
  
  deleteBooking: (id: string) => {
    const filteredBookings = store.bookings().filter((b: any) => b.id !== id);
    patchState(store, { bookings: filteredBookings });
  }
});
