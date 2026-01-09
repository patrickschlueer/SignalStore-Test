import { inject } from '@angular/core';
import { EmployeeSyncManager } from '../../../signaldb/sync-manager/entities/employee-sync-manager';

export function createEmployeeMethods() {
  const syncManager = inject(EmployeeSyncManager);
  
  return {
    /**
     * Synchronize employees with backend
     * - First call: Full load from backend
     * - Subsequent calls: Delta load (only changes)
     */
    loadEmployees: async () => {
      try {
        await syncManager.sync();
      } catch (error) {
        console.error('Employee sync failed:', error);
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
