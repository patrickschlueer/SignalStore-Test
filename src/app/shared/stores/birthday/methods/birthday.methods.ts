import { inject } from '@angular/core';
import { BirthdaySyncManager } from '../../../signaldb/sync-manager/entities/birthday-sync-manager';

export function createBirthdayMethods() {
  const syncManager = inject(BirthdaySyncManager);
  
  return {
    /**
     * Synchronize birthdays with backend
     * - First call: Full load from backend
     * - Subsequent calls: Delta load (only changes)
     */
    loadBirthdays: async () => {
      try {
        await syncManager.sync();
      } catch (error) {
        console.error('Birthday sync failed:', error);
      }
    },
    
    /**
     * Clear local cache and force full reload on next sync
     */
    clearCache: () => {
      syncManager.clearCache();
    },
    
    /**
     * Force refresh: clear cache and reload
     */
    refreshData: async () => {
      syncManager.clearCache();
      await syncManager.sync();
    }
  };
}
