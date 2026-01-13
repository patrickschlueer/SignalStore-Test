import { patchState } from '@ngrx/signals';
import { ViewMode } from '../../../types/view-mode.type';
import { Booking } from '../../../models/entities/booking.interface';
import { BookingTypeConfig } from '../../../models/entities/booking-type-config.interface';
import { BookingType } from '../../../types/booking.type';
import { CalendarDay } from '../../../models/helper/calendar-day.interface';

// Cell Key Separator - eindeutig, kommt nicht in UUIDs oder Dates vor
const CELL_KEY_SEPARATOR = '|||';

function createCellKey(employeeId: string, date: Date): string {
  return `${employeeId}${CELL_KEY_SEPARATOR}${date.toISOString()}`;
}

function parseCellKey(key: string): { employeeId: string; dateStr: string } {
  const [employeeId, dateStr] = key.split(CELL_KEY_SEPARATOR);
  return { employeeId, dateStr };
}

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
  
  // Normal Click: Toggle einzelne Zelle
  toggleCellSelection: (employeeId: string, date: Date) => {
    const key = createCellKey(employeeId, date);
    const selected = new Set(store.selectedCells());
    
    if (selected.has(key)) {
      selected.delete(key);
    } else {
      selected.add(key);
    }
    
    patchState(store, { 
      selectedCells: selected,
      rangeSelectionStart: { employeeId, date }
    });
  },
  
  clearSelection: () => {
    patchState(store, { 
      selectedCells: new Set<string>(),
      rangeSelectionStart: null
    });
  },
  
  selectMultipleCells: (employeeId: string, dates: Date[]) => {
    const selected = new Set(store.selectedCells());
    
    dates.forEach((date: Date) => {
      const key = createCellKey(employeeId, date);
      selected.add(key);
    });
    
    patchState(store, { selectedCells: selected });
  },
  
  // Shift+Click: Toggle Range
  selectRange: (employeeId: string, endDate: Date) => {
    const start = store.rangeSelectionStart();
    if (!start || start.employeeId !== employeeId) {
      // Fallback to single cell selection
      return store.toggleCellSelection(employeeId, endDate);
    }
    
    const selected = new Set(store.selectedCells());
    const days = store.daysInMonth();
    
    const startTime = start.date.getTime();
    const endTime = endDate.getTime();
    const minTime = Math.min(startTime, endTime);
    const maxTime = Math.max(startTime, endTime);
    
    // Sammle alle Tage im Range
    const rangeCells: string[] = [];
    days.forEach((day: CalendarDay) => {
      const dayTime = day.date.getTime();
      if (dayTime >= minTime && dayTime <= maxTime && !day.isWeekend && !day.isHoliday) {
        const dayKey = createCellKey(employeeId, day.date);
        rangeCells.push(dayKey);
      }
    });
    
    // Prüfe ob ALLE Tage im Range bereits selected sind
    const allSelected = rangeCells.every((key: string) => selected.has(key));
    
    if (allSelected) {
      // DESELECT: Entferne alle Tage im Range
      rangeCells.forEach((key: string) => selected.delete(key));
    } else {
      // SELECT: Füge alle Tage im Range hinzu
      rangeCells.forEach((key: string) => selected.add(key));
    }
    
    patchState(store, { 
      selectedCells: selected,
      rangeSelectionStart: { employeeId, date: endDate }
    });
  },
  
  // STRG+Click: Select all free days in the week
  selectWeekFreeDays: (employeeId: string, date: Date) => {
    const selected = new Set(store.selectedCells());
    const days = store.daysInMonth();
    const bookings = store.bookings();
    
    // Find week of clicked day
    const clickedWeekNumber = getWeekNumber(date);
    
    // Select all days in same week that are:
    // 1. Not weekend/holiday
    // 2. No booking
    days.forEach((day: CalendarDay) => {
      if (day.weekNumber === clickedWeekNumber && !day.isWeekend && !day.isHoliday) {
        // Check if day has booking
        const hasBooking = bookings.some((booking: Booking) => {
          if (booking.employeeId !== employeeId) return false;
          const dayTime = day.date.getTime();
          const startTime = booking.startDate.getTime();
          const endTime = booking.endDate.getTime();
          return dayTime >= startTime && dayTime <= endTime;
        });
        
        if (!hasBooking) {
          const key = createCellKey(employeeId, day.date);
          selected.add(key);
        }
      }
    });
    
    patchState(store, { selectedCells: selected });
  },
  
  // ===================================
  // Drag-to-Select
  // ===================================
  
  startDrag: (employeeId: string, date: Date) => {
    patchState(store, {
      isDragging: true,
      dragStartCell: { employeeId, date },
      dragCurrentCell: { employeeId, date }
      // selectedCells bleibt unverändert!
    });
  },
  
  dragOver: (employeeId: string, date: Date) => {
    if (!store.isDragging()) return;
    
    const dragStart = store.dragStartCell();
    if (!dragStart || dragStart.employeeId !== employeeId) return;
    
    // Update current drag position (für Preview)
    patchState(store, { 
      dragCurrentCell: { employeeId, date }
    });
  },
  
  endDrag: () => {
    if (!store.isDragging()) return;
    
    const dragStart = store.dragStartCell();
    const dragEnd = store.dragCurrentCell();
    
    if (!dragStart || !dragEnd || dragStart.employeeId !== dragEnd.employeeId) {
      patchState(store, {
        isDragging: false,
        dragStartCell: null,
        dragCurrentCell: null
      });
      return;
    }
    
    // Prüfe ob tatsächlich gedraget wurde (Start != End)
    const startTime = dragStart.date.getTime();
    const endTime = dragEnd.date.getTime();
    const wasDragged = startTime !== endTime;
    
    if (!wasDragged) {
      // Kein Drag, nur ein Klick → endDrag macht nichts
      patchState(store, {
        isDragging: false,
        dragStartCell: null,
        dragCurrentCell: null
      });
      return;
    }
    
    // Es war ein echter Drag → Selection ändern
    const selected = new Set(store.selectedCells());
    const days = store.daysInMonth();
    
    const minTime = Math.min(startTime, endTime);
    const maxTime = Math.max(startTime, endTime);
    
    // Sammle alle Drag-Range Zellen
    const dragCells: string[] = [];
    days.forEach((day: CalendarDay) => {
      const dayTime = day.date.getTime();
      if (dayTime >= minTime && dayTime <= maxTime && !day.isWeekend && !day.isHoliday) {
        const key = createCellKey(dragStart.employeeId, day.date);
        dragCells.push(key);
      }
    });
    
    // Prüfe ob Start-Zelle selected war
    const startKey = createCellKey(dragStart.employeeId, dragStart.date);
    const wasStartSelected = store.selectedCells().has(startKey);
    
    if (wasStartSelected) {
      // DESELECT: Entferne Drag-Range
      dragCells.forEach((key: string) => selected.delete(key));
    } else {
      // SELECT: Füge Drag-Range hinzu
      dragCells.forEach((key: string) => selected.add(key));
    }
    
    patchState(store, {
      isDragging: false,
      dragStartCell: null,
      dragCurrentCell: null,
      selectedCells: selected
    });
  },
  
  // ===================================
  // Helper Methods (mit Parametern)
  // ===================================
  
  isCellSelected: (employeeId: string, date: Date): boolean => {
    const key = createCellKey(employeeId, date);
    
    // Check permanent selection
    if (store.selectedCells().has(key)) {
      return true;
    }
    
    // Check drag preview
    if (store.isDragging()) {
      const dragStart = store.dragStartCell();
      const dragEnd = store.dragCurrentCell();
      
      if (dragStart && dragEnd && dragStart.employeeId === employeeId) {
        const startTime = dragStart.date.getTime();
        const endTime = dragEnd.date.getTime();
        const minTime = Math.min(startTime, endTime);
        const maxTime = Math.max(startTime, endTime);
        const cellTime = date.getTime();
        
        if (cellTime >= minTime && cellTime <= maxTime) {
          // Prüfe ob Start-Zelle selected war (für deselect preview)
          const startKey = createCellKey(dragStart.employeeId, dragStart.date);
          const wasStartSelected = store.selectedCells().has(startKey);
          
          // Wenn Start selected war → zeige deselect (return false)
          // Wenn Start nicht selected war → zeige select (return true)
          return !wasStartSelected;
        }
      }
    }
    
    return false;
  },
  
  getBookingForDay: (employeeId: string, date: Date) => {
    const dateTime = date.getTime();
    return store.bookings().find((booking: Booking) => {
      if (booking.employeeId !== employeeId) return false;
      const startTime = booking.startDate.getTime();
      const endTime = booking.endDate.getTime();
      return dateTime >= startTime && dateTime <= endTime;
    });
  },
  
  getBookingTypeConfig: (type: string) => {
    return store.bookingTypes().find((bt: BookingTypeConfig) => bt.type === type);
  },
  
  // ===================================
  // Selection Analysis (für Dialog)
  // ===================================
  
  getSelectedDateRanges: (employeeId: string) => {
    const selected = store.selectedCells();
    const dates: Date[] = [];
    
    // Extract dates for this employee
    selected.forEach((key: string) => {
      const { employeeId: empId, dateStr } = parseCellKey(key);
      if (empId === employeeId) {
        dates.push(new Date(dateStr));
      }
    });
    
    if (dates.length === 0) return [];
    
    // Sort dates
    dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
    
    // Group into consecutive ranges
    const ranges: Array<{ startDate: Date; endDate: Date; dayCount: number }> = [];
    let rangeStart = dates[0];
    let rangeEnd = dates[0];
    
    for (let i = 1; i < dates.length; i++) {
      const current = dates[i];
      const previous = dates[i - 1];
      
      // Check if consecutive (next day)
      const dayDiff = Math.round((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        // Extend current range
        rangeEnd = current;
      } else {
        // Save current range and start new one
        const dayCount = Math.round((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        ranges.push({ startDate: rangeStart, endDate: rangeEnd, dayCount });
        rangeStart = current;
        rangeEnd = current;
      }
    }
    
    // Add last range
    const dayCount = Math.round((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    ranges.push({ startDate: rangeStart, endDate: rangeEnd, dayCount });
    
    return ranges;
  },
  
  // ===================================
  // Bookings
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
  
  addBookingsWithRecurrence: (
    employeeId: string, 
    bookingType: BookingType, 
    note: string | undefined,
    recurring: { weekdays: number[]; until: Date },
    customerId?: string
  ) => {
    const newBookings: Booking[] = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const untilDate = new Date(recurring.until);
    untilDate.setHours(23, 59, 59, 999);
    
    // Iterate through each day until the end date
    const checkDate = new Date(currentDate);
    while (checkDate <= untilDate) {
      const dayOfWeek = checkDate.getDay();
      
      // Check if this day of week is selected
      if (recurring.weekdays.includes(dayOfWeek)) {
        newBookings.push({
          id: `b${Date.now()}-${checkDate.getTime()}`,
          employeeId,
          startDate: new Date(checkDate),
          endDate: new Date(checkDate),
          type: bookingType,
          note,
          customerId
        });
      }
      
      // Move to next day
      checkDate.setDate(checkDate.getDate() + 1);
    }
    
    patchState(store, {
      bookings: [...store.bookings(), ...newBookings]
    });
  },
  
  updateBooking: (id: string, updates: Partial<Booking>) => {
    const updatedBookings = store.bookings().map((b: Booking) =>
      b.id === id ? { ...b, ...updates } : b
    );
    
    patchState(store, { bookings: updatedBookings });
  },
  
  deleteBooking: (id: string) => {
    const filteredBookings = store.bookings().filter((b: Booking) => b.id !== id);
    patchState(store, { bookings: filteredBookings });
  }
});

// Helper function
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
