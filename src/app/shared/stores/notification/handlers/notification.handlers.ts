import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, delay } from 'rxjs';
import { of } from 'rxjs';
import { notificationEvents } from '../events/notification-events';
import { INITIAL_NOTIFICATIONS } from '../../../mocks/notification.mock';

export function createNotificationHandlers() {
  const events = inject(Events);
  
  return {
    // Async Event Handler: Simuliert API Call mit 1000ms Verzögerung
    loadNotifications: events.on(notificationEvents.load).pipe(
      delay(1000),
      switchMap(() => of(INITIAL_NOTIFICATIONS)),
      map(notifications => notificationEvents.loadedSuccess(notifications))
    )
  };
}
