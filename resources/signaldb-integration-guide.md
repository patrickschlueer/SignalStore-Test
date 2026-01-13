# SignalDB Integration Guide

This guide shows how to integrate SignalDB with SignalStore for offline-first data persistence with delta synchronization, using the Reactive Collection Pattern.

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

### ✅ Automatic UI Updates
Collection changes automatically propagate to UI via reactive signals.

---

## Architecture Overview

```
Component
    ↓ inject store
SignalStore (Reactive)
    ↓ computed reads from
Collection (SignalDB) ← manages sync
    ↓ pulls data
Sync Manager
    ↓ calls API
Backend (Delta Endpoint)
    ↓ stores in
IndexedDB (Persistent)
```

**Key Difference from Event-Based Pattern:**
- No events, reducers, or handlers needed
- Store reads directly from reactive collection
- Collection is single source of truth
- Changes propagate automatically

---

## Integration Steps

### Step 1: Entity Model Preparation

Your entity **must** extend `BaseEntity` which requires an `id` field.

**File:** `models/entities/birthday.interface.ts`

```typescript
import { BaseEntity } from '../base/base-entity.interface';

export interface Birthday extends BaseEntity {
  id: string;  // Required by BaseEntity
  userName: string;
  birthday: Date;
}
```

---

### Step 2: API Service Requirements

Your API service needs two methods:

**File:** `services/birthday-api.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class BirthdayApiService {
  private apiUrl = `${environment.apiUrl}/birthdays`;

  constructor(private http: HttpClient) {}

  /**
   * Full load - used for initial sync
   */
  getBirthdays(pageNumber: number, pageSize: number): Observable<PaginatedResponse<Birthday>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PaginatedResponse<Birthday>>(this.apiUrl, { params });
  }

  /**
   * Delta load - used for subsequent syncs
   * Backend returns only changes since lastSyncTimestamp
   */
  getDelta(lastSyncTimestamp: number): Observable<DeltaResponse<Birthday>> {
    const params = new HttpParams().set('since', lastSyncTimestamp.toString());
    return this.http.get<DeltaResponse<Birthday>>(`${this.apiUrl}/delta`, { params });
  }
}
```

**Backend Requirements:**
- `GET /api/birthdays` → Returns paginated list (first sync)
- `GET /api/birthdays/delta?since=<timestamp>` → Returns delta response (subsequent syncs)

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

**File:** `signaldb/collections/entities/birthday.collection.ts`

```typescript
import { Injectable } from '@angular/core';
import { BaseCollection } from '../base/base.collection';
import { Birthday } from '../../../models/entities/birthday.interface';

/**
 * Birthday Collection
 * SignalDB collection with IndexedDB persistence and Angular reactivity
 */
@Injectable({ providedIn: 'root' })
export class BirthdayCollection extends BaseCollection<Birthday> {
  constructor() {
    super('birthdays'); // Collection name in IndexedDB
  }
}
```

**What BaseCollection provides:**
- IndexedDB persistence adapter
- Angular reactivity adapter (automatic signal updates)
- Type-safe CRUD operations

**IndexedDB Structure:**
```
IndexedDB
  └─ point-birthdays  ← Your data stored here
```

---

### Step 4: Create Sync Manager

**File:** `signaldb/sync-manager/entities/birthday-sync-manager.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { BaseSyncManager } from '../base/base-sync-manager';
import { Birthday } from '../../../models/entities/birthday.interface';
import { BirthdayCollection } from '../../collections/entities/birthday.collection';
import { BirthdayApiService } from '../../../services/birthday-api.service';

/**
 * Birthday Sync Manager
 * Manages synchronization between backend and IndexedDB
 */
@Injectable({ providedIn: 'root' })
export class BirthdaySyncManager extends BaseSyncManager<Birthday> {
  constructor() {
    const birthdayCollection = inject(BirthdayCollection);
    const birthdayApiService = inject(BirthdayApiService);
    super('birthdays', birthdayCollection, birthdayApiService);
  }

  protected getLoadMethod(): string {
    return 'getBirthdays'; // API method for full load
  }

  protected getDeltaMethod(): string {
    return 'getDelta'; // API method for delta load
  }
}
```

**What BaseSyncManager provides:**
- Delta sync logic with upsert support
- Persistent timestamp management
- Cache-first strategy
- Handles restored soft-deleted entities

**IndexedDB Structure (with sync metadata):**
```
IndexedDB
  ├─ point-birthdays          ← Your data
  └─ point-_sync_birthdays    ← Sync metadata (timestamps)
```

---

### Step 5: Create Store Structure

Create the following directory structure:

```
stores/birthday/
├── state/
│   └── birthday.state.ts
├── factories/
│   └── birthday-computed.factory.ts
├── methods/
│   └── birthday.methods.ts
└── birthday.store.ts
```

#### 5.1 State Definition

**File:** `stores/birthday/state/birthday.state.ts`

```typescript
export interface BirthdayState {
  isLoading: boolean;
  isSyncing: boolean;
}

export const initialBirthdayState: BirthdayState = {
  isLoading: false,
  isSyncing: false
};
```

#### 5.2 Computed Factory

**File:** `stores/birthday/factories/birthday-computed.factory.ts`

```typescript
import { computed, inject } from '@angular/core';
import { BirthdayCollection } from '../../../signaldb/collections/entities/birthday.collection';

export function createBirthdayComputedFactory() {
  const birthdayCollection = inject(BirthdayCollection);
  
  return {
    // Raw data from collection (reactive!)
    birthdays: computed(() => birthdayCollection.collection.find().fetch()),
    
    // Sorted birthdays
    sortedBirthdays: computed(() => {
      const all = birthdayCollection.collection.find().fetch();
      return [...all].sort((a, b) => 
        new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
      );
    }),
    
    // Total count
    totalCount: computed(() => {
      return birthdayCollection.collection.find().fetch().length;
    })
  };
}
```

**Key Points:**
- Inject collection directly
- Use `computed()` for derived values
- Collection is reactive - changes propagate automatically
- No manual state management needed

#### 5.3 Methods Factory

**File:** `stores/birthday/methods/birthday.methods.ts`

```typescript
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
```

#### 5.4 Store Composition

**File:** `stores/birthday/birthday.store.ts`

```typescript
import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { createBirthdayComputedFactory } from './factories/birthday-computed.factory';
import { createBirthdayMethods } from './methods/birthday.methods';
import { initialBirthdayState } from './state/birthday.state';

export const BirthdayStore = signalStore(
  { providedIn: 'root' },
  withState(initialBirthdayState),
  withComputed(createBirthdayComputedFactory),
  withMethods(createBirthdayMethods),
  withHooks({
    onInit(store) {
      // Auto-load on store initialization
      store.loadBirthdays();
    }
  })
);
```

**Only ~15 lines!** The store just composes the pieces together.

---

### Step 6: Use in Components

```typescript
import { Component, inject, Signal } from '@angular/core';
import { BirthdayStore } from '../../shared/stores/birthday/birthday.store';
import { Birthday } from '../../shared/models/entities/birthday.interface';

@Component({
  selector: 'app-birthday-list',
  template: `
    <div>
      <h2>Upcoming Birthdays ({{ totalCount() }})</h2>
      @for (birthday of birthdays(); track birthday.id) {
        <div>
          {{ birthday.userName }} - {{ birthday.birthday | date:'dd.MM.yyyy' }}
        </div>
      }
      <button (click)="refresh()">Refresh</button>
    </div>
  `
})
export class BirthdayListComponent {
  private readonly birthdayStore = inject(BirthdayStore);
  
  // Reactive signals - update automatically!
  readonly birthdays: Signal<Birthday[]> = this.birthdayStore.sortedBirthdays;
  readonly totalCount: Signal<number> = this.birthdayStore.totalCount;
  
  // Methods
  refresh() {
    this.birthdayStore.refreshData();
  }
}
```

**Key Points:**
- No constructor needed (store auto-initializes)
- Signals update automatically when collection changes
- No manual subscription management

---

## Complete Data Flow

### First Load (Empty Cache):
```
1. BirthdayStore initialized
2. onInit hook → loadBirthdays()
3. SyncManager.sync() starts
4. lastSyncTime = undefined → Full Load
5. API: GET /api/birthdays?pageNumber=1&pageSize=100
6. Backend returns: { data: [10 birthdays], totalCount: 10 }
7. SignalDB saves to IndexedDB: point-birthdays
8. SignalDB saves timestamp to: point-_sync_birthdays
9. Computed reads collection → UI shows 10 birthdays
```

### Second Load (Page Reload):
```
1. BirthdayStore initialized
2. onInit hook → loadBirthdays()
3. Computed reads collection → UI shows 10 birthdays IMMEDIATELY ⚡
4. SyncManager.sync() runs in background
5. lastSyncTime loaded from point-_sync_birthdays
6. API: GET /api/birthdays/delta?since=1704709800000
7. Backend returns: { created: [2 new], updated: [1 modified], deleted: [] }
8. SignalDB applies delta:
   - Insert 2 new birthdays
   - Update 1 existing birthday (with upsert logic)
9. Collection updates → Computed detects change → UI shows 12 birthdays automatically! 🎉
```

### Soft-Delete Restoration (Edge Case):
```
1. Birthday ID=123 soft-deleted: IsDeleted = true
2. Delta: deleted: ["123"]
3. SignalDB: removeOne("123") → Birthday removed from collection
4. Birthday ID=123 restored: IsDeleted = false
5. Delta: updated: [{ id: "123", ... }]
6. SignalDB: findOne("123") → not found
7. SignalDB: insert({ id: "123", ... }) ← Upsert logic! ✅
8. Birthday 123 is back in collection
```

---

## Upsert Logic Explained

The `applyDelta()` method handles edge cases with upsert logic:

```typescript
// Update existing items (with Upsert logic)
delta.updated.forEach(item => {
  const exists = collection.collection.findOne({ id: item.id });
  
  if (exists) {
    // Entity exists → Update
    collection.collection.updateOne(
      { id: item.id },
      { $set: item }
    );
  } else {
    // Entity doesn't exist (e.g., restored from soft-delete) → Insert
    collection.collection.insert(item);
  }
});
```

**Why is this needed?**
- Handles restored soft-deleted entities
- Prevents errors when updating non-existent items
- Makes sync more robust against race conditions

---

## Debugging

### Chrome DevTools

1. Open DevTools → Application tab
2. Click "IndexedDB" in left sidebar
3. Expand your database:
   - `point-birthdays` → See your data
   - `point-_sync_birthdays` → See sync timestamps

### Verify Sync Behavior

**First load:**
- Network tab → `GET /api/birthdays` (full load)
- IndexedDB → Data appears
- UI → Shows data immediately

**Second load (reload page):**
- UI → Shows cached data INSTANTLY (before network call)
- Network tab → `GET /api/birthdays/delta?since=...` (delta load)
- If changes exist → UI updates automatically

**Third load (no backend changes):**
- UI → Shows cached data instantly
- Delta response: `{ created: [], updated: [], deleted: [] }`
- No UI changes (as expected)

---

## Key Differences from Event-Based Pattern

### Old Event-Based Pattern:
```
Component → Event → Reducer → State → Component
         ↓
      Handler → API → Event → Reducer
```

### New Reactive Pattern:
```
Component → Store (Computed) → Collection → Component
                                   ↓
                            Sync Manager → API
```

**Benefits:**
- ✅ 40% less code
- ✅ No events/reducers/handlers
- ✅ Immediate cache display
- ✅ Automatic UI updates
- ✅ Simpler mental model

---

## Best Practices

### ✅ DO:
- Read directly from collection via computed
- Use upsert logic for updates (already built-in)
- Let store auto-initialize with onInit hook
- Keep computed pure (no side effects)
- Handle sync errors gracefully

### ⚠️ DON'T:
- Don't manually manage state (collection does it)
- Don't subscribe to collection manually (use computed)
- Don't bypass sync manager (always use sync())
- Don't call loadX() from component constructor (let store handle it)

---

## When to Use SignalDB

### ✅ Good Use Cases
- User data (birthdays, profiles)
- News/notifications
- Events/calendar data
- Reference data (skills, categories)
- Data that changes infrequently

### ⚠️ Not Ideal For
- Real-time chat messages (use WebSockets)
- Large files/media (use direct backend access)
- Frequently changing data (every second)
- Data that requires server-side validation before display

---

## Troubleshooting

### Issue: Data not showing
**Check:**
1. Is collection reactive? (BaseCollection has `reactivity: createAngularReactivityAdapter()`)
2. Is sync manager calling API? (Check network tab)
3. Is data in IndexedDB? (Check DevTools)

### Issue: Duplicate API calls
**Check:**
1. Store onInit hook (should only call once)
2. Component not calling loadX() again (remove from constructor)

### Issue: Updated entity not appearing after soft-delete restore
**Fixed!** Upsert logic handles this automatically. If issue persists:
1. Check backend: Is `IsDeleted = false` in updated array?
2. Check network: Is delta response correct?

---

## Summary

To add SignalDB to any entity:

1. ✅ Entity extends `BaseEntity`
2. ✅ API service has `getAll()` and `getDelta()` methods
3. ✅ Create `{Entity}Collection` (~10 lines)
4. ✅ Create `{Entity}SyncManager` (~25 lines)
5. ✅ Create store structure:
   - `state/{entity}.state.ts`
   - `factories/{entity}-computed.factory.ts`
   - `methods/{entity}.methods.ts`
   - `{entity}.store.ts`
6. ✅ Use signals in component

**Result:**
- Offline-first data access
- Automatic delta synchronization
- Persistent timestamp management
- Immediate cache display with background sync
- Automatic UI updates via reactive signals
- Robust soft-delete handling

**Total: ~60 lines of code for full offline-first reactive store!** 🚀

---

## Next Steps

- Review [Reactive Collection Pattern Guide](./signalstore-reactive-pattern.md) for detailed store architecture
- Check SignalDB documentation: https://signaldb.js.org/
- Explore example implementation: `stores/birthday/` and `stores/news/`
