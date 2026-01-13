import { BookingType } from '../../types/booking.type';

export interface Booking {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  type: BookingType;
  note?: string;
  customerId?: string; // Nur für type: 'projekt'
}
