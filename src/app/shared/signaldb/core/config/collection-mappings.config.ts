import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntity } from '../../../models/base/base-entity.interface';
import { PaginatedResponse } from '../../../models/helper/pagination.interface';

/**
 * Mapping configuration for Collections to API Services
 * Defines which API service and method to use for each collection
 */
export interface CollectionServiceMapping<T extends BaseEntity = any> {
  /** Collection name (must match the name used in Collection registration) */
  name: string;
  
  /** Angular service class to inject */
  serviceType: Type<any>;
  
  /** Method name on the service to call for loading data */
  loadMethod: string;
  
  /** Optional: Default parameters for the load method */
  defaultParams?: any[];
}

/**
 * Registry of all collection mappings
 * Add new mappings here when creating new collections
 */
export const COLLECTION_SERVICE_MAPPINGS: CollectionServiceMapping[] = [
  {
    name: 'news',
    serviceType: null as any, // Will be set in sync-manager.service.ts to avoid circular dependency
    loadMethod: 'getNews',
    defaultParams: [1, 100] // pageNumber, pageSize - load all for cache
  }
  // Add more mappings here:
  // {
  //   name: 'events',
  //   serviceType: EventsApiService,
  //   loadMethod: 'getEvents',
  //   defaultParams: [1, 100]
  // }
];

/**
 * Helper type for API Service methods
 */
export type ApiServiceMethod<T extends BaseEntity> = (
  ...args: any[]
) => Observable<PaginatedResponse<T>>;
