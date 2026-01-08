# SignalStore Setup Guide

This guide demonstrates how to create a clean, maintainable SignalStore using the NewsStore as a reference example.

## Overview

A properly structured SignalStore follows a clear separation of concerns with dedicated files for:
- **Events** - Type-safe event definitions
- **Reducers** - State update logic
- **Handlers** - Side effect handling (API calls, etc.)
- **Computed Factories** - Derived state calculations
- **Store** - Main store composition

## Directory Structure

```
stores/
└── news/
    ├── events/
    │   └── news-events.ts
    ├── reducers/
    │   └── event.reducers.ts
    ├── handlers/
    │   └── news.handlers.ts
    ├── factories/
    │   └── news-computed.factory.ts
    └── news.store.ts
```

---

## Step 1: Define Events

**File:** `events/news-events.ts`

Events represent actions that can occur in your store. Define them with type-safe payloads.

```typescript
import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { News } from '../../../models/entities/news.model';

export const newsEvents = eventGroup({
  source: 'News',
  events: {
    load: type<void>(),
    loadedSuccess: type<News[]>()
  },
});
```

**Key Points:**
- Use `eventGroup` to organize related events
- `source` identifies the event source (used in logging/debugging)
- `type<T>()` defines the event payload type
- `void` for events without payload

---

## Step 2: Create Reducers

**File:** `reducers/event.reducers.ts`

Reducers handle state updates in response to events. Keep them pure and focused.

```typescript
import { setAllEntities } from '@ngrx/signals/entities';
import { newsEvents } from '../events/news-events';

export function loadInitial() {
  return {
    isLoading: true
  };
}

export function loadSuccess(
  event: ReturnType<typeof newsEvents.loadedSuccess>,
  config: { collection: string }
) {
  return [
    setAllEntities(event.payload, config),
    { isLoading: false }
  ];
}
```

**Key Points:**
- Each reducer is a pure function
- Return state updates as objects or arrays
- Use `setAllEntities` for entity collections
- `event.payload` contains the event data

---

## Step 3: Create Event Handlers

**File:** `handlers/news.handlers.ts`

Handlers process events and trigger side effects (API calls, async operations).

```typescript
import { inject } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { switchMap, map } from 'rxjs';
import { newsEvents } from '../events/news-events';
import { NewsApiService } from '../../../../core/api/news-api.service';

export function createNewsEventHandlers() {
  const events = inject(Events);
  const apiService = inject(NewsApiService);
  
  return {
    loadNotifications: events.on(newsEvents.load).pipe(
      switchMap(() => apiService.getNews(1, 100)),
      map(result => newsEvents.loadedSuccess(result.data))
    )
  };
}
```

**Key Points:**
- Use `inject()` for dependency injection
- `events.on(event)` listens to specific events
- Use RxJS operators for async operations
- Return new events to update the store
- Handler names can be descriptive (not tied to event names)

---

## Step 4: Create Computed Factories

**File:** `factories/news-computed.factory.ts`

Computed values derive from store state and update automatically.

```typescript
import { computed, Signal } from '@angular/core';
import { News } from '../../../models/entities/news.model';

export function newsComputedFactory(newsEntities: Signal<News[]>) {
  return {
    sortedNews: computed(() => {
      return [...newsEntities()].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    })
  };
}
```

**Key Points:**
- Accept signals as parameters
- Return object with computed properties
- Use `computed()` for derived values
- Computeds update automatically when dependencies change

---

## Step 5: Compose the Store

**File:** `news.store.ts`

The main store file brings everything together using composition.

```typescript
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withEntities, entityConfig } from '@ngrx/signals/entities';
import { on, withReducer, withEventHandlers, injectDispatch } from '@ngrx/signals/events';
import { newsComputedFactory } from './factories/news-computed.factory';
import { loadInitial, loadSuccess } from './reducers/event.reducers';
import { createNewsEventHandlers } from './handlers/news.handlers';
import { News } from '../../models/entities/news.model';
import { newsEvents } from './events/news-events';

const newsConfig = entityConfig({
  entity: {} as News,
  collection: 'news'
});

export const NewsStore = signalStore(
  { providedIn: 'root' },
  withEntities(newsConfig),
  withState({ isLoading: false }),
  withComputed(({ newsEntities }) => newsComputedFactory(newsEntities)),
  withReducer(
    on(newsEvents.load, loadInitial),
    on(newsEvents.loadedSuccess, (event) => 
      loadSuccess(event, newsConfig)
    )
  ),
  withMethods((store) => {
    const dispatcher = injectDispatch(newsEvents);
    return {
      loadNews: () => {
        dispatcher.load();
      }
    };
  }),
  withEventHandlers(createNewsEventHandlers)
);
```

**Key Points:**
- `providedIn: 'root'` makes it a singleton service
- `withEntities` manages entity collections
- `withState` adds additional state properties
- `withComputed` adds derived values
- `withReducer` registers event handlers
- `withMethods` exposes public API
- `withEventHandlers` registers side effect handlers

---

## Usage in Components

```typescript
import { Component, inject, Signal } from '@angular/core';
import { NewsStore } from '../../shared/stores/news/news.store';
import { News } from '../../shared/models/entities/news.model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  templateUrl: './news-card.component.html'
})
export class NewsCardComponent {
  private readonly newsStore = inject(NewsStore);
  
  // Reactive data - updates automatically
  readonly news: Signal<News[]> = this.newsStore.sortedNews;
  readonly isLoading: Signal<boolean> = this.newsStore.isLoading;

  constructor() {
    // Trigger data load
    this.newsStore.loadNews();
  }
}
```

**Template:**
```html
<div class="news-list">
  @if (isLoading()) {
    <mat-spinner />
  } @else {
    @for (item of news(); track item.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ item.title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          {{ item.content }}
        </mat-card-content>
      </mat-card>
    }
  }
</div>
```

---

## Benefits of This Architecture

### ✅ Separation of Concerns
Each file has a single responsibility, making the code easier to understand and maintain.

### ✅ Type Safety
Full TypeScript support with compile-time checks for events and payloads.

### ✅ Testability
Pure functions (reducers, computed) are easy to test in isolation.

### ✅ Reusability
Factories and handlers can be reused across different stores.

### ✅ Scalability
Adding new features means creating new files, not modifying existing ones.

---

## Creating Your Own Store

To create a new store (e.g., EventsStore):

1. Create directory: `stores/events/`
2. Define events: `events/event-events.ts`
3. Create reducers: `reducers/event.reducers.ts`
4. Create handlers: `handlers/event.handlers.ts`
5. Create computed: `factories/event-computed.factory.ts`
6. Compose store: `event.store.ts`

Follow the same patterns shown above, replacing "news" with your entity name.

---

## External Resources

Official NgRx documentation for deeper understanding:

### Core Concepts
- [NgRx SignalStore Documentation](https://ngrx.io/guide/signals) - Official overview and concepts
- [SignalStore API Reference](https://ngrx.io/guide/signals/signal-store) - Complete API documentation

### Features Used in This Guide
- [Signal Store Features](https://ngrx.io/guide/signals/signal-store/store-features) - Overview of all available features
- [withEntities](https://ngrx.io/guide/signals/signal-store/entity-management) - Entity collection management
- [withState](https://ngrx.io/guide/signals/signal-store/custom-store-features#withstate) - Adding custom state
- [withComputed](https://ngrx.io/guide/signals/signal-store/custom-store-features#withcomputed) - Derived state values
- [withMethods](https://ngrx.io/guide/signals/signal-store/custom-store-features#withmethods) - Adding store methods

### Events & Side Effects
- [Signal Store Events](https://ngrx.io/guide/signals/signal-store-events) - Event-driven architecture
- [withEventHandlers](https://ngrx.io/guide/signals/signal-store-events/event-handlers) - Side effect handling
- [Event Types](https://ngrx.io/guide/signals/signal-store-events/event-types) - Defining type-safe events

### Advanced Topics
- [Custom Store Features](https://ngrx.io/guide/signals/signal-store/custom-store-features) - Creating reusable features
- [RxJS Interop](https://ngrx.io/guide/signals/rxjs-integration) - Working with observables
- [Testing SignalStore](https://ngrx.io/guide/signals/signal-store/testing) - Unit testing strategies

---

## Next Steps

- [SignalDB Integration Guide](./signaldb-integration-guide.md) - Add offline-first persistence to your store
