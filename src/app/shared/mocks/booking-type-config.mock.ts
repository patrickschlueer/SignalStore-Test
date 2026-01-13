import { BookingTypeConfig } from '../models/entities/booking-type-config.interface';

export const BOOKING_TYPE_CONFIGS: BookingTypeConfig[] = [
  {
    type: 'home-office',
    label: 'Home Office',
    icon: 'home',
    color: '#c51525'
  },
  {
    type: 'vacation',
    label: 'Urlaub',
    icon: 'flight',
    color: '#c51525'
  },
  {
    type: 'sick',
    label: 'Krank',
    icon: 'local_hospital',
    color: '#c51525'
  },
  {
    type: 'event',
    label: 'Event/Schulung',
    icon: 'business_center',
    color: '#c51525'
  }
];
