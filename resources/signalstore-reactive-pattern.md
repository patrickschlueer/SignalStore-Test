# SignalStore Pattern - Reactive Collection Architecture

This guide shows how to create a clean, maintainable SignalStore using the Reactive Collection pattern with proper separation of concerns.

## Overview

The Reactive Collection pattern eliminates the need for events, reducers, and handlers by reading directly from SignalDB collections. The store becomes a thin layer that provides computed values and methods.

---

## Directory Structure

```
stores/
└── {entity}/
    ├── state/
    │   └── {entity}.state.ts           ← State interface & initial values
    ├── factories/
    │   └── {entity}-computed.factory.ts ← Computed signals (derived state)
    ├── methods/
    │   └── {entity}.methods.ts         ← Store methods (actions)
    └── {entity}.store.ts               ← Store composition (~15 lines)
```

---

## Implementation Steps

### Step 1: Create State Definition

**File:** `state/{entity}.state.ts`

```typescript
export interface EntityState {
  isLoading: boolean;
  isSyncing: boolean;
  // Add any additional state properties
}

export const initialEntityState: EntityState = {
  isLoading: false,
  isSyncing: false
};
```

**Purpose:** Define the shape of the store's internal state.

---

### Step 2: Create Computed Factory

**File:** `factories/{entity}-computed.factory.ts`

```typescript
import { computed, inject } from '@angular/core';
import { EntityCollection } from '../../../signaldb/collections/entities/{entity}.collection';

export function createEntityComputedFactory() {
  const entityCollection = inject(EntityCollection);
  
  return {
    // Raw data from collection
    entities: computed(() => entityCollection.collection.find().fetch()),
    
    // Sorted/filtered/transformed data
    sortedEntities: computed(() => {
      const all = entityCollection.collection.find().fetch();
      return [...all].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }),
    
    // Add more computed properties as needed
    totalCount: computed(() => {
      return entityCollection.collection.find().fetch().length;
    })
  };
}
```

**Key Points:**
- Inject the collection
- Use `computed()` for derived values
- Collection is reactive - changes automatically propagate
- Keep computeds pure (no side effects)

---

### Step 3: Create Methods Factory

**File:** `methods/{entity}.methods.ts`

```typescript
import { inject } from '@angular/core';
import { EntitySyncManager } from '../../../signaldb/sync-manager/entities/{entity}-sync-manager';

export function createEntityMethods() {
  const syncManager = inject(EntitySyncManager);
  
  return {
    /**
     * Synchronize entities with backend
     * - First call: Full load from backend
     * - Subsequent calls: Delta load (only changes)
     */
    loadEntities: async () => {
      try {
        await syncManager.sync();
      } catch (error) {
        console.error('Entity sync failed:', error);
      }
    },
    
    /**
     * Clear local cache and force full reload on next sync
     */
    clearCache: () => {
      syncManager.clearCache();
    },
    
    // Add more methods as needed
    refreshData: async () => {
      syncManager.clearCache();
      await syncManager.sync();
    }
  };
}
```

**Key Points:**
- Inject services/managers needed for actions
- Methods can be async
- Keep side effects in methods, not computed

---

### Step 4: Compose the Store

**File:** `{entity}.store.ts`

```typescript
import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { createEntityComputedFactory } from './factories/{entity}-computed.factory';
import { createEntityMethods } from './methods/{entity}.methods';
import { initialEntityState } from './state/{entity}.state';

export const EntityStore = signalStore(
  { providedIn: 'root' },
  withState(initialEntityState),
  withComputed(createEntityComputedFactory),
  withMethods(createEntityMethods),
  withHooks({
    onInit(store) {
      // Auto-load on store initialization
      store.loadEntities();
    }
  })
);
```

**Key Points:**
- Use `providedIn: 'root'` for singleton
- Factories provide the actual implementations
- `withHooks` for lifecycle events
- Store file should be ~10-20 lines

---

## Supporting Infrastructure

Before creating the store, ensure these are in place:

### 1. SignalDB Collection

**File:** `signaldb/collections/entities/{entity}.collection.ts`

```typescript
import { Injectable } from '@angular/core';
import { BaseCollection } from '../base/base.collection';
import { Entity } from '../../../models/entities/{entity}.model';

@Injectable({ providedIn: 'root' })
export class EntityCollection extends BaseCollection<Entity> {
  constructor() {
    super('entities'); // IndexedDB collection name
  }
}
```

### 2. Sync Manager

**File:** `signaldb/sync-manager/entities/{entity}-sync-manager.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { BaseSyncManager } from '../base/base-sync-manager';
import { Entity } from '../../../models/entities/{entity}.model';
import { EntityCollection } from '../../collections/entities/{entity}.collection';
import { EntityApiService } from '../../../../core/api/{entity}-api.service';

@Injectable({ providedIn: 'root' })
export class EntitySyncManager extends BaseSyncManager<Entity> {
  constructor() {
    const entityCollection = inject(EntityCollection);
    const entityApiService = inject(EntityApiService);
    super('entities', entityCollection, entityApiService);
  }

  protected getLoadMethod(): string {
    return 'getEntities'; // API method for full load
  }

  protected getDeltaMethod(): string {
    return 'getDelta'; // API method for delta sync
  }
}
```

---

## Usage in Components

```typescript
import { Component, inject, Signal } from '@angular/core';
import { EntityStore } from '../../shared/stores/{entity}/{entity}.store';
import { Entity } from '../../shared/models/entities/{entity}.model';

@Component({
  selector: 'app-entity-list',
  template: `
    <div>
      @for (entity of entities(); track entity.id) {
        <div>{{ entity.name }}</div>
      }
    </div>
  `
})
export class EntityListComponent {
  private readonly entityStore = inject(EntityStore);
  
  // Reactive data - updates automatically
  readonly entities: Signal<Entity[]> = this.entityStore.sortedEntities;
  readonly totalCount: Signal<number> = this.entityStore.totalCount;
  
  // Methods
  refresh() {
    this.entityStore.refreshData();
  }
}
```

---

## Data Flow

```
1. Store initialized
   ↓
2. onInit hook triggers loadEntities()
   ↓
3. SyncManager.sync() starts (non-blocking)
   ↓
4. Computed reads from Collection
   ↓
5. IndexedDB has cache: [10 items] → UI shows 10 items IMMEDIATELY ⚡
   ↓
6. Backend Delta-Call runs in background...
   ↓
7. 3 seconds later: Delta Response: +2 new items
   ↓
8. Collection updates: [12 items]
   ↓
9. Computed detects change → UI shows 12 items automatically 🎉
```

---

## Benefits

### ✅ **Immediate Data Display**
- Cache shown instantly (no waiting for API)
- Sync runs in background

### ✅ **Clean Separation**
- State in one file
- Computed in one file
- Methods in one file
- Store just composes them

### ✅ **True Reactive**
- Collection changes → Computed updates → UI updates
- No manual state management needed

### ✅ **Offline-First**
- Works without internet (shows cache)
- Sync failures don't break UI

### ✅ **Less Boilerplate**
- No events, reducers, or handlers
- Collection is single source of truth

### ✅ **Easy to Test**
- Mock collection or sync manager
- Test factories independently

---

## Pattern Comparison

### Old Event-Based Pattern (~100+ lines):
```
stores/news/
├── events/news-events.ts
├── reducers/event.reducers.ts
├── handlers/news.handlers.ts
├── factories/news-computed.factory.ts
└── news.store.ts

Features:
- withEntities
- withReducer
- withEventHandlers
- Events fired manually
```

### New Reactive Pattern (~60 lines):
```
stores/news/
├── state/news.state.ts
├── factories/news-computed.factory.ts
├── methods/news.methods.ts
└── news.store.ts

Features:
- withState
- withComputed (reactive collection)
- withMethods
- Auto-updates from collection
```

**Result: 40% less code, simpler to understand!**

---

## When to Use This Pattern

### ✅ Good For:
- Data that comes from backend APIs
- Data that needs offline support
- Data that updates infrequently
- Lists, collections, reference data

### ⚠️ Not Ideal For:
- Real-time data (use WebSockets + RxJS)
- Form state (use reactive forms)
- Complex multi-step workflows (use state machines)
- Purely computed data (no backend)

---

## Checklist for New Store

- [ ] Entity model extends `BaseEntity`
- [ ] API service has `getAll()` and `getDelta()` methods
- [ ] `{Entity}Collection` created (~10 lines)
- [ ] `{Entity}SyncManager` created (~25 lines)
- [ ] State file created
- [ ] Computed factory created
- [ ] Methods factory created
- [ ] Store composition file created
- [ ] Component uses store signals

---

## Example: Complete News Store

See implementation in:
- `stores/news/state/news.state.ts`
- `stores/news/factories/news-computed.factory.ts`
- `stores/news/methods/news.methods.ts`
- `stores/news/news.store.ts`

Total: ~60 lines of code for full offline-first reactive store! 🚀

---

## Next Steps

For adding SignalDB to a store, see: [SignalDB Integration Guide](./signaldb-integration-guide.md)
