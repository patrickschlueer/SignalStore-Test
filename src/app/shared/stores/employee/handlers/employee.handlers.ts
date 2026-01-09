import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, from } from 'rxjs';
import { employeeEvents } from '../events/employee.events';
import { EmployeeCollection } from '../../../signaldb/collections/entities/employee.collection';
import { EmployeeSyncManager } from '../../../signaldb/sync-manager/entities/employee-sync-manager';

export function createEmployeeEventHandlers() {
  const events = inject(Events);
  const syncManager = inject(EmployeeSyncManager);
  const employeeCollection = inject(EmployeeCollection);
  
  return {
    // Async Event Handler: Lädt Employee mit SignalDB (Cache-First)
    loadEmployees: events.on(employeeEvents.load).pipe(
      switchMap(() => from(
        (async () => {
          // 1. Sync ausführen (Cache-First)
          await syncManager.sync();
          
          // 2. Daten aus Collection lesen
          return employeeCollection.collection.find().fetch();
        })()
      )),
      map(result => employeeEvents.loadedSuccess(result))
    )
  };
}
