import { Notification } from '../models/entities/notification.interface';

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Neue Nachricht von Max',
    message: 'Hey, hast du Zeit für ein kurzes Meeting?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    from: { id: '1', userName: 'Max Mustermann', firstName: 'Max', lastName: 'Mustermann' }
  },
  {
    id: '2',
    title: 'Meeting-Einladung',
    message: 'Team-Sync am Freitag um 14:00 Uhr',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    from: { id: '2', userName: 'Sarah Schmidt', firstName: 'Sarah', lastName: 'Schmidt' }
  },
  {
    id: '3',
    title: 'Systemupdate verfügbar',
    message: 'Version 2.4.0 steht zum Download bereit',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    from: { id: '3', userName: 'System Admin', firstName: 'System', lastName: 'Admin' }
  }
];

export const TEST_NOTIFICATIONS: Omit<Notification, 'id'>[] = [
  {
    title: 'Neue Nachricht von Max',
    message: 'Hey, hast du Zeit für ein kurzes Meeting?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    from: { id: '1', userName: 'Max Mustermann', firstName: 'Max', lastName: 'Mustermann' }
  },
  {
    title: 'Meeting-Einladung',
    message: 'Team-Sync am Freitag um 14:00 Uhr',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    from: { id: '2', userName: 'Sarah Schmidt', firstName: 'Sarah', lastName: 'Schmidt' }
  },
  {
    title: 'Systemupdate verfügbar',
    message: 'Version 2.4.0 steht zum Download bereit',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    from: { id: '3', userName: 'System Admin', firstName: 'System', lastName: 'Admin' }
  },
  {
    title: 'Projekt genehmigt',
    message: 'Dein Projektantrag wurde genehmigt!',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: false,
    from: { id: '4', firstName: 'Anna', lastName: 'Meyer', userName: 'Anna Meyer' }
  },
  {
    title: 'Code Review fertig',
    message: 'Dein Pull Request wurde reviewed',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: false,
    from: { id: '5', userName: 'Tom Wagner', firstName: 'Tom', lastName: 'Wagner' }
  }
];
