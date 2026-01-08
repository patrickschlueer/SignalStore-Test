import { inject } from '@angular/core';
import { NewsSyncManager } from '../../../signaldb/sync-manager/entities/news-sync-manager';

export function createNewsMethods() {
  const syncManager = inject(NewsSyncManager);
  
  return {
    /**
     * Synchronize news with backend
     * - First call: Full load from backend
     * - Subsequent calls: Delta load (only changes)
     */
    loadNews: async () => {
      try {
        await syncManager.sync();
      } catch (error) {
        console.error('News sync failed:', error);
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
