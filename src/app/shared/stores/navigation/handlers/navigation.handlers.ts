import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, delay } from 'rxjs';
import { of } from 'rxjs';
import { navigationEvents } from '../events/navigation.events';
import { INITIAL_NAVIGATION } from '../../../mocks/navigation.mock';

export function createNavigationHandlers() {
  const events = inject(Events);
  
  return {
    // Async Event Handler: Simuliert API Call mit 1000ms Verzögerung
    loadNavigation: events.on(navigationEvents.load).pipe(
      delay(1000),
      switchMap(() => of(INITIAL_NAVIGATION)),
      map(navigationItems => navigationEvents.loadedSuccess(navigationItems))
    )
  };
}
