import { Notification } from '../models/notification.interface';

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Neue Nachricht von Max',
    message: 'Hey, hast du Zeit für ein kurzes Meeting?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    from: { firstName: 'Max', lastName: 'Mustermann' }
  },
  {
    id: '2',
    title: 'Meeting-Einladung',
    message: 'Team-Sync am Freitag um 14:00 Uhr',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    from: { firstName: 'Sarah', lastName: 'Schmidt' }
  },
  {
    id: '3',
    title: 'Systemupdate verfügbar',
    message: 'Version 2.4.0 steht zum Download bereit',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    from: { firstName: 'System', lastName: 'Admin' }
  }
];

export const TEST_NOTIFICATIONS: Omit<Notification, 'id'>[] = [
  {
    title: 'Neue Nachricht von Max',
    message: 'Hey, hast du Zeit für ein kurzes Meeting?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    from: { firstName: 'Max', lastName: 'Mustermann' }
  },
  {
    title: 'Meeting-Einladung',
    message: 'Team-Sync am Freitag um 14:00 Uhr',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    from: { firstName: 'Sarah', lastName: 'Schmidt' }
  },
  {
    title: 'Systemupdate verfügbar',
    message: 'Version 2.4.0 steht zum Download bereit',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    from: { firstName: 'System', lastName: 'Admin' }
  },
  {
    title: 'Projekt genehmigt',
    message: 'Dein Projektantrag wurde genehmigt!',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: false,
    from: { firstName: 'Anna', lastName: 'Meyer' }
  },
  {
    title: 'Code Review fertig',
    message: 'Dein Pull Request wurde reviewed',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: false,
    from: { firstName: 'Tom', lastName: 'Wagner' }
  }
];
