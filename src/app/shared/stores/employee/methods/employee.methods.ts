import { inject } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { EmployeeSyncManager } from '../../../signaldb/sync-manager/entities/employee-sync-manager';
import { SkillFilter } from '../../../models/helper/skill-filter.interface';

export function createEmployeeMethods(store: any) {
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
    },
    
    /**
     * Set search query for filtering employees
     */
    setSearchQuery: (query: string) => {
      patchState(store, { searchQuery: query });
    },
    
    /**
     * Set skill filter for filtering employees
     */
    setSkillFilter: (filter: SkillFilter) => {
      patchState(store, { skillFilter: filter });
    },
    
    /**
     * Reset all filters to default
     */
    resetFilters: () => {
      patchState(store, { 
        searchQuery: '',
        skillFilter: 'all'
      });
    }
  };
}
