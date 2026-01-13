import { BookingTypeConfig } from '../models/entities/booking-type-config.interface';

export const BOOKING_TYPE_CONFIGS: BookingTypeConfig[] = [
  {
    type: 'education',
    icon: 'school',
    label: 'Weiterbildung',
    color: '#2196F3'
  },
  {
    type: 'sick',
    icon: 'medical_services',
    label: 'Krankheit',
    color: '#FF5722'
  },
  {
    type: 'project',
    icon: 'work',
    label: 'Projekt',
    color: '#9C27B0'
  },
  {
    type: 'flexday',
    icon: 'schedule',
    label: 'Gleittag',
    color: '#00BCD4'
  },
  {
    type: 'vacation',
    icon: 'flight_takeoff',
    label: 'Urlaub',
    color: '#4CAF50'
  },
  {
    type: 'event',
    icon: 'event',
    label: 'Veranstaltung',
    color: '#FF9800'
  },
  {
    type: 'home-office',
    icon: 'home',
    label: 'Homeoffice',
    color: '#607D8B'
  },
  {
    type: 'planned-vacation',
    icon: 'event_available',
    label: 'Vorgeplanter Urlaub',
    color: '#8BC34A'
  }
];
