import { Navigation } from '../models/navigation.interface';

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
    label: 'Messaging',
    icon: 'mail',
    route: '/messaging',
    order: 2,
    visible: true
  }
];
