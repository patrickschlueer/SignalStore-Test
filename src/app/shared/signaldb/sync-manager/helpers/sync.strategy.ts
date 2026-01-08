import { firstValueFrom } from 'rxjs';
import { BaseEntity } from '../../../models/base/base-entity.interface';
import { BaseCollection } from '../../collections/base/base.collection';
import { PaginatedResponse } from '../../../models/helper/pagination.interface';
import { DeltaResponse } from '../../../models/helper/delta-response.interface';

/**
 * Sync Strategy Helper
 * Handles the pull logic with cache-first approach and delta synchronization
 */
export class SyncStrategy {

  /**
   * Pull data with cache-first strategy (OLD - for simple cases)
   * 1. Check IndexedDB cache first
   * 2. If empty, load from backend
   * 
   * @param collectionName Name of the collection
   * @param collection Collection instance to check cache
   * @param backendLoader Function to load from backend
   * @returns Promise with items array
   */
  static async pullWithCacheFirst<T extends BaseEntity>(
    collectionName: string,
    collection: BaseCollection<T>,
    backendLoader: () => Promise<T[]>
  ): Promise<T[]> {
    
    const cachedData = collection.collection.find().fetch();
    
    if (cachedData.length > 0) {
      return cachedData;
    }
    
    const items = await backendLoader();
    return items;
  }

  /**
   * Pull data with delta synchronization (NEW - recommended)
   * 1. If first sync (no lastSyncTime) -> Full load
   * 2. If subsequent sync -> Delta load (only changes since last sync)
   * 3. Apply delta changes to collection
   * 
   * @param collectionName Name of the collection
   * @param collection Collection instance
   * @param lastSyncTime Timestamp of last successful sync (undefined for first sync)
   * @param fullLoader Function to load all data (first sync)
   * @param deltaLoader Function to load delta (subsequent syncs)
   * @returns Promise with all items after applying delta
   */
  static async pullWithDelta<T extends BaseEntity>(
    collectionName: string,
    collection: BaseCollection<T>,
    lastSyncTime: number | undefined,
    fullLoader: () => Promise<T[]>,
    deltaLoader: (timestamp: number) => Promise<DeltaResponse<T>>
  ): Promise<T[]> {
    
    // First sync -> Full load
    if (lastSyncTime === undefined) {
      const items = await fullLoader();
      
      if (!items || !Array.isArray(items)) {
        return [];
      }
      
      return items;
    }
    
    // Subsequent sync -> Delta load
    const delta = await deltaLoader(lastSyncTime);
    
    if (!delta) {
      return collection.collection.find().fetch();
    }
    
    // Apply delta to collection
    this.applyDelta(collection, delta);
    
    // Return all items from collection
    const allItems = collection.collection.find().fetch();
    return allItems;
  }

  /**
   * Apply delta changes to a collection with Upsert logic
   * Handles edge cases like restored soft-deleted entities
   * 
   * @param collection Collection to apply changes to
   * @param delta Delta response with created, updated, deleted items
   */
  private static applyDelta<T extends BaseEntity>(
    collection: BaseCollection<T>,
    delta: DeltaResponse<T>
  ): void {
    // Insert created items
    delta.created.forEach(item => {
      collection.collection.insert(item);
    });
    
    // Update existing items (with Upsert logic)
    delta.updated.forEach(item => {
      const exists = collection.collection.findOne({ id: item.id } as any);
      
      if (exists) {
        // Entity exists → Update
        collection.collection.updateOne(
          { id: item.id } as any,
          { $set: item } as any
        );
      } else {
        // Entity doesn't exist (e.g., restored from soft-delete) → Insert
        collection.collection.insert(item);
      }
    });
    
    // Remove deleted items
    delta.deleted.forEach(id => {
      collection.collection.removeOne({ id } as any);
    });
  }

  /**
   * Helper to load from backend API service
   * 
   * @param apiService The API service instance
   * @param methodName Method name to call on the service
   * @param params Parameters to pass to the method
   * @returns Promise with items array
   */
  static async loadFromBackend<T extends BaseEntity>(
    apiService: any,
    methodName: string,
    params: any[] = []
  ): Promise<T[]> {
    console.log('load from backend', methodName, params);
    try {
      console.log(apiService);
      console.log(methodName);
      const result$ = apiService[methodName](...params);
      const response = await firstValueFrom(result$) as PaginatedResponse<T>;

      console.log(response);
      
      if (!response || !response.data) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Helper to load delta from backend API service
   * 
   * @param apiService The API service instance
   * @param deltaMethodName Delta method name to call on the service
   * @param lastSyncTimestamp Timestamp of last sync
   * @returns Promise with DeltaResponse
   */
  static async loadDeltaFromBackend<T extends BaseEntity>(
    apiService: any,
    deltaMethodName: string,
    lastSyncTimestamp: number
  ): Promise<DeltaResponse<T>> {
    
    try {
      const result$ = apiService[deltaMethodName](lastSyncTimestamp);
      const response = await firstValueFrom(result$) as DeltaResponse<T>;
      return response;
    } catch (error) {
      return { created: [], updated: [], deleted: [], timestamp: Date.now() };
    }
  }
}
