import { inject } from '@angular/core';
import { SkillSyncManager } from '../../../signaldb/sync-manager/entities/skill-sync-manager';

export function createSkillMethods() {
  const syncManager = inject(SkillSyncManager);
  
  return {
    /**
     * Synchronize skill with backend
     * - First call: Full load from backend
     * - Subsequent calls: Delta load (only changes)
     */
    loadSkill: async () => {
      try {
        await syncManager.sync();
      } catch (error) {
        console.error('Skill sync failed:', error);
      }
    },
    
    /**
     * Clear local cache and force full reload on next sync
     */
    clearCache: () => {
      syncManager.clearCache();
    }
  };
}
