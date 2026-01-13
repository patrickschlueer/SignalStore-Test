import { signalStore, withState, withComputed, withMethods, withHooks } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { initialCalendarState } from './state/calendar.state';
import { createCalendarComputedFactory } from './factories/calendar-computed.factory';
import { createCalendarMethods } from './methods/calendar.methods';
import { MOCK_BOOKINGS } from '../../mocks/booking.mock';
import { BOOKING_TYPE_CONFIGS } from '../../mocks/booking-type-config.mock';
import { event, on, withReducer } from '@ngrx/signals/events';
import { calendarEvents } from './events/calendar.events';
import { ViewMode } from '../../types/view-mode.type';

export const CalendarStore = signalStore(
  { providedIn: 'root' },
  
  // State
  withState(initialCalendarState),
  
  // Computed Properties
  withComputed(createCalendarComputedFactory),
  
  // Methods (Synchron - direktes patchState)
  withMethods(createCalendarMethods),
  // withReducer(
  //   on(calendarEvents.previousMonth, (event, state) => ({
  //     currentMonth: new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() - 5, 1)
  //   })),
  //   on(calendarEvents.nextMonth, (event, state) => ({
  //     currentMonth: new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 1)
  //   })),
  //   on(calendarEvents.goToMonth, (event, state) => ({
  //     currentMonth: new Date(event.payload.year, event.payload.month, 1)
  //   })),
  //   on(calendarEvents.toggleViewMode, (event, state) => ({
  //     viewMode: state.viewMode! === 'modern' as ViewMode ? 'compact' as ViewMode : 'modern' as ViewMode
  //   })),
  //   on(calendarEvents.setViewMode, (event, state) => ({
  //     viewMode: event.payload.mode
  //   })),
  //   on(calendarEvents.toggleCellSelection, (event, state) => {
  //     const key = `${event.payload.employeeId}-${event.payload.date.toISOString()}`;
  //     const selected = new Set(state.selectedCells);
      
  //     if (selected.has(key)) {
  //       selected.delete(key);
  //     } else {
  //       selected.add(key);
  //     }
      
  //     return { selectedCells: selected };
  //   }),
  //   on(calendarEvents.clearSelection, (event, state) => ({
  //     selectedCells: new Set<string>()
  //   })),
  //   on(calendarEvents.selectMultipleCells, (event, state) => {
  //     const selected = new Set(state.selectedCells);
      
  //     event.payload.dates.forEach(date => {
  //       const key = `${event.payload.employeeId}-${date.toISOString()}`;
  //       selected.add(key);
  //     });
      
  //     return { selectedCells: selected };
  //   }),
  //   on(calendarEvents.addBooking, (event, state) => ({
  //     bookings: [...state.bookings, { ...event.payload.booking, id: `b${Date.now()}` }]
  //   })),
  //   on(calendarEvents.updateBooking, (event, state) => ({
  //     bookings: state.bookings.map(b =>
  //       b.id === event.payload.id ? { ...b, ...event.payload.updates } : b
  //     )
  //   })),
  //   on(calendarEvents.deleteBooking, (event, state) => ({
  //     bookings: state.bookings.filter(b => b.id !== event.payload.id)
  //   }))
  // ),
  // Lifecycle Hooks
  withHooks({
    onInit(store) {
      // Initialize with mock data
      patchState(store, {
        bookings: MOCK_BOOKINGS,
        bookingTypes: BOOKING_TYPE_CONFIGS
      });
    }
  })
);
