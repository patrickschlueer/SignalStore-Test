import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, tap, from } from 'rxjs';
import { newsEvents } from '../events/news-events';
import { NewsSyncManager } from '../../../signaldb/sync-manager/entities/news-sync-manager';
import { NewsCollection } from '../../../signaldb/collections/entities/news.collection';

export function createNewsEventHandlers() {
  const events = inject(Events);
  const syncManager = inject(NewsSyncManager);
  const newsCollection = inject(NewsCollection);
  
  return {
    // Async Event Handler: Lädt News mit SignalDB (Cache-First)
    loadNotifications: events.on(newsEvents.load).pipe(
      switchMap(() => from(
        (async () => {
          // 1. Sync ausführen (Cache-First)
          await syncManager.sync();
          
          // 2. Daten aus Collection lesen
          return newsCollection.collection.find().fetch();
        })()
      )),
      map(result => newsEvents.loadedSuccess(result))
    )
  };
}
