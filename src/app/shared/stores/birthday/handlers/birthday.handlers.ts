import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, from } from 'rxjs';
import { birthdayEvents } from '../events/birthday.events';
import { BirthdaySyncManager } from '../../../signaldb/sync-manager/entities/birthday-sync-manager';
import { BirthdayCollection } from '../../../signaldb/collections/entities/birthday.collection';

export function createBirthdayEventHandlers() {
  const events = inject(Events);
  const syncManager = inject(BirthdaySyncManager);
  const birthdayCollection = inject(BirthdayCollection);
  
  return {
    // Async Event Handler: Lädt Birthday mit SignalDB (Cache-First)
    loadNotifications: events.on(birthdayEvents.load).pipe(
      switchMap(() => from(
        (async () => {
          // 1. Sync ausführen (Cache-First)
          await syncManager.sync();
          
          // 2. Daten aus Collection lesen
          return birthdayCollection.collection.find().fetch();
        })()
      )),
      map(result => birthdayEvents.loadedSuccess(result))
    )
  };
}
