import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, delay } from 'rxjs';
import { of } from 'rxjs';
import { userEvents } from '../events/user-events';
import { DEFAULT_USER } from '../../../mocks/user.mock';

export function createUserHandlers() {
  const events = inject(Events);
  
  return {
    // Async Event Handler: Simuliert API Call mit 1000ms Verzögerung
    loadUser: events.on(userEvents.load).pipe(
      delay(1000),
      switchMap(() => of(DEFAULT_USER)),
      map(user => userEvents.loadedSuccess(user))
    )
  };
}
