import { computed, Signal } from '@angular/core';
import { Notification } from '../../../models/notification.interface';

export function notificationComputedFactory(notificationEntities: Signal<Notification[]>) {
  return {
    unreadCount: computed(() => {
      return notificationEntities().filter(n => !n.read).length;
    }),
    
    hasUnread: computed(() => {
      return notificationEntities().some(n => !n.read);
    }),
    
    sortedNotifications: computed(() => {
      return [...notificationEntities()].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    })
  };
}
