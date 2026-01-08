import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, tap } from 'rxjs';
import { newsEvents } from '../events/news-events';
import { NewsApiService } from '../../../services/news-api.service';

export function createNewsEventHandlers() {
  const events = inject(Events);
  const service = inject(NewsApiService);
  return {
    // Async Event Handler: Simuliert API Call mit 1000ms Verzögerung
    loadNotifications: events.on(newsEvents.load).pipe(
      tap(() => console.log('Loading news...')),
      switchMap(() => service.getNews()),
      map(result => newsEvents.loadedSuccess(result))
    )
  };
}
