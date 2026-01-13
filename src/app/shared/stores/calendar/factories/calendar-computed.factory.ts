import { computed } from '@angular/core';
import { CalendarDay } from '../../../models/helper/calendar-day.interface';

export const createCalendarComputedFactory = (store: any) => {
  // Tage im aktuellen Monat (computed - keine Parameter)
  const daysInMonth = computed(() => {
    const month = store.currentMonth();
    return getDaysInMonth(month);
  });
  const weeksInMonth = computed(() => {
      const days = daysInMonth();
      const weeks: CalendarDay[][] = [];
      let currentWeek: CalendarDay[] = [];
      let lastWeekNumber = -1;
      
      days.forEach(day => {
        if (day.weekNumber !== lastWeekNumber && currentWeek.length > 0) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
        currentWeek.push(day);
        lastWeekNumber = day.weekNumber;
      });
      
      if (currentWeek.length > 0) {
        weeks.push(currentWeek);
      }
      
      return weeks;
  });
  // Monatsname formatiert (computed - keine Parameter)
  const monthName = computed(() => {
    return store.currentMonth().toLocaleDateString('de-DE', {
      month: 'long',
      year: 'numeric'
    });
  });
  return {
    daysInMonth,
    weeksInMonth,
    monthName 
  };
};

// ===================================
// Helper Functions
// ===================================

function getDaysInMonth(date: Date): CalendarDay[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekdayFmt = new Intl.DateTimeFormat('de-DE', { weekday: 'short' });

  const days: CalendarDay[] = [];

  for (let day = 1; day <= daysCount; day++) {
    const currentDate = new Date(year, month, day);
    const dayOfWeek = currentDate.getDay();

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isToday = currentDate.getTime() === today.getTime();
    const isHoliday = false;

    const label = `${weekdayFmt.format(currentDate)} ${day}`; // "Mo 13"

    const className = [
      'day-header',
      isWeekend ? 'weekend' : '',
      isHoliday ? 'holiday' : '',
      isToday ? 'today' : ''
    ].filter(Boolean).join(' ');

    days.push({
      date: currentDate,
      dayOfMonth: day,
      dayOfWeek,
      weekNumber: getWeekNumber(currentDate),
      isWeekend,
      isHoliday,
      isToday,
      isCurrentMonth: true,

      // ✅ neu
      label,
      className
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
