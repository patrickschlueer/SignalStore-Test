import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Notification } from '../../../models/entities/notification.interface';

export const notificationEvents = eventGroup({
  source: 'Notification',
  events: {
    read: type<string>(),
    unread: type<string>(),
    removed: type<string>(),
    added: type<void>(),
    load: type<void>(),
    loadedSuccess: type<Notification[]>()
  },
}); 