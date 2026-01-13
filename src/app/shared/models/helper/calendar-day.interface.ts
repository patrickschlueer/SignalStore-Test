export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  weekNumber: number;
  isWeekend: boolean;
  isHoliday: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
    // ✅ neu
  label: string;        // z.B. "Mo 13"
  className: string;    // z.B. "day-header weekend today"
}
