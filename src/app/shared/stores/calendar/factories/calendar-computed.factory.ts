import { computed } from '@angular/core';
import { CalendarDay } from '../../../models/helper/calendar-day.interface';

export const createCalendarComputedFactory = (store: any) => ({
  // Tage im aktuellen Monat (computed - keine Parameter)
  daysInMonth: computed(() => {
    const month = store.currentMonth();
    return getDaysInMonth(month);
  }),
  
  // Monatsname formatiert (computed - keine Parameter)
  monthName: computed(() => {
    return store.currentMonth().toLocaleDateString('de-DE', {
      month: 'long',
      year: 'numeric'
    });
  })
});

// ===================================
// Helper Functions
// ===================================

function getDaysInMonth(date: Date): CalendarDay[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const days: CalendarDay[] = [];
  
  for (let day = 1; day <= daysCount; day++) {
    const currentDate = new Date(year, month, day);
    const dayOfWeek = currentDate.getDay();
    
    days.push({
      date: currentDate,
      dayOfMonth: day,
      dayOfWeek,
      weekNumber: getWeekNumber(currentDate),
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      isHoliday: false, // TODO: Add holiday check
      isToday: currentDate.getTime() === today.getTime(),
      isCurrentMonth: true
    });
  }
  
  return days;
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
