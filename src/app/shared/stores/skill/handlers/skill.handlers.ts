import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, tap, from } from 'rxjs';
import { skillEvents } from '../events/skill.events';
import { SkillSyncManager } from '../../../signaldb/sync-manager/entities/skill-sync-manager';
import { SkillCollection } from '../../../signaldb/collections/entities/skill.collection';

export function createSkillEventHandlers() {
  const events = inject(Events);
  const syncManager = inject(SkillSyncManager);
  const skillCollection = inject(SkillCollection);
  
  return {
    // Async Event Handler: Lädt Skill mit SignalDB (Cache-First)
    loadSkill: events.on(skillEvents.load).pipe(
      switchMap(() => from(
        (async () => {
          // 1. Sync ausführen (Cache-First)
          await syncManager.sync();
          
          // 2. Daten aus Collection lesen
          return skillCollection.collection.find().fetch();
        })()
      )),
      map(result => skillEvents.loadedSuccess(result))
    )
  };
}
