import { Collection } from '@signaldb/core';
import createIndexedDBAdapter from '@signaldb/indexeddb';
import { PREFIX_NAME } from '../../core/config/signaldb.config';
import { BaseEntity } from '../../../models/base/base-entity.interface';
import angularReactivityAdapter from '@signaldb/angular';

/**
 * Generic Base Collection for SignalDB
 * Provides persistent storage in IndexedDB with automatic synchronization
 * 
 * @template T The type of documents stored in the collection
 */
export abstract class BaseCollection<T extends BaseEntity> {
  
  readonly collection: Collection<T>;

  constructor(collectionName: string) {
    this.collection = new Collection<T>({
      persistence: createIndexedDBAdapter(collectionName, {
        prefix: PREFIX_NAME
      }),
      reactivity: angularReactivityAdapter
    });
  }
}
