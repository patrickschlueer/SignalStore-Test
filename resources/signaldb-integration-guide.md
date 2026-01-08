# SignalDB Integration Guide

This guide shows how to integrate SignalDB with SignalStore for offline-first data persistence with delta synchronization, using NewsStore as an example.

## What is SignalDB?

SignalDB is a local-first database that:
- Stores data in IndexedDB for offline access
- Syncs with backend via delta updates (only loads changes)
- Provides automatic conflict resolution
- Works seamlessly with Angular signals

## Benefits

### ✅ Offline-First
Data is available immediately from local cache, even without internet connection.

### ✅ Reduced Backend Load
After initial sync, only changes are loaded (created, updated, deleted items).

### ✅ Faster Load Times
Reading from IndexedDB is much faster than API calls.

### ✅ Persistent Timestamps
Sync metadata is stored persistently, surviving page reloads.

---

## Architecture Overview

```
Component
    ↓ calls loadNews()
SignalStore
    ↓ fires load event
Event Handler
    ↓ calls sync()
Sync Manager ← manages sync logic
    ↓ pulls data
Collection ← wraps IndexedDB
    ↓ stores/retrieves
IndexedDB ← persistent storage
```

---

## Integration Steps

### Step 1: Entity Model Preparation

Your entity **must** extend `BaseEntity` which requires an `id` field.

**File:** `models/entities/news.model.ts`

```typescript
import { BaseEntity } from '../base/base-entity.interface';

export interface News extends BaseEntity {
  id: string;  // Required by BaseEntity
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  // ... other fields
}
```

---

### Step 2: API Service Requirements

Your API service needs two methods:

**File:** `core/api/news-api.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class NewsApiService {
  private apiUrl = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) {}

  /**
   * Full load - used for initial sync
   */
  getNews(pageNumber: number, pageSize: number): Observable<PaginatedResponse<News>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PaginatedResponse<News>>(this.apiUrl, { params });
  }

  /**
   * Delta load - used for subsequent syncs
   * Backend returns only changes since lastSyncTimestamp
   */
  getDelta(lastSyncTimestamp: number): Observable<DeltaResponse<News>> {
    const params = new HttpParams().set('since', lastSyncTimestamp.toString());
    return this.http.get<DeltaResponse<News>>(`${this.apiUrl}/delta`, { params });
  }
}
```

**Backend Requirements:**
- `GET /api/news` → Returns paginated list (first sync)
- `GET /api/news/delta?since=<timestamp>` → Returns delta response (subsequent syncs)

**Delta Response Format:**
```typescript
interface DeltaResponse<T> {
  created: T[];      // New items
  updated: T[];      // Modified items
  deleted: string[]; // IDs of deleted items
  timestamp: number; // Current server timestamp
}
```

---

### Step 3: Create SignalDB Collection

**File:** `signaldb/collections/entities/news.collection.ts`

```typescript
import { Injectable } from '@angular/core';
import { BaseCollection } from '../base/base.collection';
import { News } from '../../../models/entities/news.model';

/**
 * News Collection
 * SignalDB collection for news with IndexedDB persistence
 */
@Injectable({ providedIn: 'root' })
export class NewsCollection extends BaseCollection<News> {
  
  constructor() {
    super('news'); // Collection name in IndexedDB
  }
}
```

**What it does:**
- Wraps IndexedDB operations
- Provides type-safe CRUD operations
- Handles persistence automatically

**IndexedDB Structure:**
```
IndexedDB
  └─ point-news  ← Your data stored here
```

---

### Step 4: Create Sync Manager

**File:** `signaldb/sync-manager/entities/news-sync-manager.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { BaseSyncManager } from '../base/base-sync-manager';
import { News } from '../../../models/entities/news.model';
import { NewsCollection } from '../../collections/entities/news.collection';
import { NewsApiService } from '../../../../core/api/news-api.service';

/**
 * News Sync Manager
 * Manages synchronization between backend and IndexedDB for news
 */
@Injectable({ providedIn: 'root' })
export class NewsSyncManager extends BaseSyncManager<News> {
  
  constructor() {
    const newsCollection = inject(NewsCollection);
    const newsApiService = inject(NewsApiService);
    super('news', newsCollection, newsApiService);
  }

  protected getLoadMethod(): string {
    return 'getNews'; // API method for full load
  }

  protected getDeltaMethod(): string {
    return 'getDelta'; // API method for delta load
  }
  
  // Optional: Override default pagination
  // protected getDefaultParams(): any[] {
  //   return [1, 50]; // pageNumber, pageSize
  // }
}
```

**What it does:**
- Manages sync between backend and IndexedDB
- Stores sync timestamps persistently
- Implements cache-first strategy with delta updates

**IndexedDB Structure (with sync metadata):**
```
IndexedDB
  ├─ point-news          ← Your data
  └─ point-_sync_news    ← Sync metadata (timestamps)
```

---

### Step 5: Update Store Handler

**File:** `stores/news/handlers/news.handlers.ts`

```typescript
import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map, from } from 'rxjs';
import { newsEvents } from '../events/news-events';
import { NewsSyncManager } from '../../../signaldb/sync-manager/entities/news-sync-manager';
import { NewsCollection } from '../../../signaldb/collections/entities/news.collection';

export function createNewsEventHandlers() {
  const events = inject(Events);
  const syncManager = inject(NewsSyncManager);
  const newsCollection = inject(NewsCollection);
  
  return {
    loadNotifications: events.on(newsEvents.load).pipe(
      switchMap(() => from(
        (async () => {
          // 1. Trigger sync (cache-first + delta)
          await syncManager.sync();
          
          // 2. Read from local collection
          return newsCollection.collection.find().fetch();
        })()
      )),
      map(result => newsEvents.loadedSuccess(result))
    )
  };
}
```

**Data Flow:**

**First Load (empty cache):**
```
1. syncManager.sync()
2. → Check lastSyncTimestamp → undefined
3. → Full load: getNews(1, 100)
4. → Save to IndexedDB: point-news
5. → Save timestamp to: point-_sync_news
6. collection.find().fetch()
7. → Return data from IndexedDB
```

**Second Load (page reload):**
```
1. syncManager.sync()
2. → Load lastSyncTimestamp from point-_sync_news
3. → Delta load: getDelta(1704709800000)
4. → Apply changes to IndexedDB:
    - Insert created items
    - Update modified items
    - Delete removed items
5. → Update timestamp in point-_sync_news
6. collection.find().fetch()
7. → Return updated data from IndexedDB
```

---

## Complete Example: Adding Events Entity

Let's add a new entity with full SignalDB integration.

### 1. Create Collection

```typescript
// signaldb/collections/entities/event.collection.ts
@Injectable({ providedIn: 'root' })
export class EventCollection extends BaseCollection<Event> {
  constructor() { super('events'); }
}
```

### 2. Create Sync Manager

```typescript
// signaldb/sync-manager/entities/event-sync-manager.ts
@Injectable({ providedIn: 'root' })
export class EventSyncManager extends BaseSyncManager<Event> {
  constructor() {
    const eventCollection = inject(EventCollection);
    const eventApiService = inject(EventApiService);
    super('events', eventCollection, eventApiService);
  }

  protected getLoadMethod(): string { return 'getEvents'; }
  protected getDeltaMethod(): string { return 'getDelta'; }
}
```

### 3. Update Handler

```typescript
// stores/events/handlers/event.handlers.ts
export function createEventEventHandlers() {
  const events = inject(Events);
  const syncManager = inject(EventSyncManager);
  const eventCollection = inject(EventCollection);
  
  return {
    loadEvents: events.on(eventEvents.load).pipe(
      switchMap(() => from((async () => {
        await syncManager.sync();
        return eventCollection.collection.find().fetch();
      })())),
      map(result => eventEvents.loadedSuccess(result))
    )
  };
}
```

**That's it!** Only 3 small files needed for full offline-first support.

---

## Manual Operations

### Clear Cache

```typescript
import { inject } from '@angular/core';
import { NewsSyncManager } from '...';

export class SomeComponent {
  private syncManager = inject(NewsSyncManager);

  clearCache() {
    this.syncManager.clearCache(); // Clears all data from IndexedDB
  }
}
```

### Force Sync

```typescript
async forceSync() {
  await this.syncManager.sync(); // Manually trigger sync
}
```

---

## Debugging

### Chrome DevTools

1. Open DevTools → Application tab
2. Click "IndexedDB" in left sidebar
3. Expand your database:
   - `point-news` → See your data
   - `point-_sync_news` → See sync timestamps

### Verify Sync Behavior

**First load:**
- Check Network tab → Should see API call to `/api/news`

**Second load (reload page):**
- Check Network tab → Should see API call to `/api/news/delta?since=...`
- Timestamp in URL matches IndexedDB timestamp

**Third load (no changes on backend):**
- Delta response: `{ created: [], updated: [], deleted: [] }`
- No data changes in IndexedDB

---

## When to Use SignalDB

### ✅ Good Use Cases
- News/notifications
- Events/calendar data
- Employee lists
- Reference data (skills, categories)
- Data that changes infrequently

### ⚠️ Not Ideal For
- Real-time chat messages (use WebSockets)
- Large files/media (use direct backend access)
- Sensitive data requiring encryption at rest

---

## Summary

To add SignalDB to any entity:

1. ✅ Entity extends `BaseEntity`
2. ✅ API service has `getAll()` and `getDelta()` methods
3. ✅ Create `{Entity}Collection` (~10 lines)
4. ✅ Create `{Entity}SyncManager` (~25 lines)
5. ✅ Update store handler to use sync manager (~15 lines)

**Result:**
- Offline-first data access
- Automatic delta synchronization
- Persistent timestamp management
- Reduced backend load

---

## Next Steps

- Review [SignalStore Setup Guide](./signalstore-setup-guide.md) for store architecture
- Check SignalDB documentation: https://signaldb.js.org/
