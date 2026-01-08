import { SyncManager } from "@signaldb/sync";
import { BaseEntity } from "../../../models/base/base-entity.interface";
import { BaseCollection } from "../../collections/base/base.collection";
import { SyncStrategy } from "../helpers/sync.strategy";
import createIndexedDBAdapter from '@signaldb/indexeddb';

/**
 * Base Sync Manager
 * Abstract base class for entity-specific sync managers
 * 
 * Usage:
 * 1. Extend this class for each entity type
 * 2. Provide collection and apiService in constructor
 * 3. Implement getLoadMethod() - API method for full load
 * 4. Implement getDeltaMethod() - API method for delta sync
 * 5. Optionally override getDefaultParams() for API call parameters
 * 
 * @template T The entity type (must extend BaseEntity)
 */
export abstract class BaseSyncManager<T extends BaseEntity> {
  
  protected readonly syncManager: SyncManager<any, any, any>;
  protected readonly collectionName: string;
  protected readonly collection: BaseCollection<T>;
  protected readonly apiService: any;

  constructor(
    collectionName: string,
    collection: BaseCollection<T>,
    apiService: any
  ) {
    this.collectionName = collectionName;
    this.collection = collection;
    this.apiService = apiService;
    
    // Initialize SyncManager with pull function and persistence for sync metadata
    this.syncManager = new SyncManager({
      persistenceAdapter: (name) => createIndexedDBAdapter(`_sync_${name}`, {
        prefix: 'point-'
      }),
      pull: async (collectionOptions, pullParameters) => {
        const items = await this.pull(pullParameters.lastFinishedSyncStart);
        return { items };
      },
      push: async () => {
        // Push functionality not implemented yet
      }
    });

    // Register the collection
    this.registerCollection();
  }

  /**
   * Abstract method: Get the API method name for loading all data
   * Must be implemented by child classes
   */
  protected abstract getLoadMethod(): string;

  /**
   * Abstract method: Get the API method name for loading delta
   * Must be implemented by child classes
   */
  protected abstract getDeltaMethod(): string;

  /**
   * Get default parameters for the API load method
   * Override this in child classes if needed
   * 
   * Default: [1, 100] for pagination (pageNumber, pageSize)
   */
  protected getDefaultParams(): any[] {
    return [1, 100];
  }

  /**
   * Register the collection with the SyncManager
   */
  private registerCollection(): void {
    this.syncManager.addCollection(this.collection.collection, {
      name: this.collectionName
    });
  }

  /**
   * Pull data using delta synchronization
   * 1. First sync (lastSyncTime undefined) -> Full load from backend
   * 2. Subsequent syncs -> Delta load (only changes since lastSyncTime)
   */
  private async pull(lastSyncTime?: number): Promise<T[]> {
    const loadMethod = this.getLoadMethod();
    const deltaMethod = this.getDeltaMethod();
    const params = this.getDefaultParams();

    return await SyncStrategy.pullWithDelta<T>(
      this.collectionName,
      this.collection,
      lastSyncTime,
      () => SyncStrategy.loadFromBackend<T>(this.apiService, loadMethod, params),
      (timestamp) => SyncStrategy.loadDeltaFromBackend<T>(this.apiService, deltaMethod, timestamp)
    );
  }

  /**
   * Manually trigger sync for this collection
   * Uses delta synchronization - only syncs changes since last sync
   */
  async sync(): Promise<void> {
    await this.syncManager.sync(this.collectionName);
  }

  /**
   * Clear the cache for this collection
   */
  clearCache(): void {
    this.collection.collection.removeMany({});
  }

  /**
   * Get the SyncManager instance (for advanced usage)
   */
  getSyncManager(): SyncManager<any, any, any> {
    return this.syncManager;
  }
}
