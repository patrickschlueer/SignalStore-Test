import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { tap } from 'rxjs';
import { layoutEvents } from '../events/layout-events';

export function createLayoutHandlers() {
  const events = inject(Events);
  return {
    // Handle Dark Mode Toggle - Update DOM
    handleDarkModeToggle: events.on(layoutEvents.darkModeToggled).pipe(
      tap(() => {
        document.documentElement.classList.toggle('dark-mode');
      })
    )
  };
}
