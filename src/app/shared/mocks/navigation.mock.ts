import { Navigation } from '../models/entities/navigation.interface';

export const INITIAL_NAVIGATION: Navigation[] = [
  {
    id: '1',
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    order: 1,
    visible: true
  },
  {
    id: '2',
    label: 'Akquise',
    icon: 'person_search',
    route: '/acquisition',
    order: 2,
    visible: true
  },
  {
    id: '3',
    label: 'Skills',
    icon: 'psychology',
    route: '/skill',
    order: 3,
    visible: true
  },
  {
    id: '4',
    label: 'Einsätze',
    icon: 'work',
    route: '/employee',
    order: 4,
    visible: true
  },
  {
    id: '5',
    label: 'Kalender',
    icon: 'calendar_month',
    route: '/calendar',
    order: 5,
    visible: true
  },
  {
    id: '6',
    label: 'Zeiterfassung',
    icon: 'schedule',
    route: '/time-recording',
    order: 6,
    visible: true
  },
  {
    id: '7',
    label: 'Infrastruktur',
    icon: 'domain',
    route: '/infrastructure',
    order: 7,
    visible: true
  }
];
