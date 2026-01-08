import { signalStore, withState } from '@ngrx/signals';
import { withEntities, entityConfig } from '@ngrx/signals/entities';
import { Navigation } from '../../models/entities/navigation.interface';
import { on, withReducer, withEventHandlers } from '@ngrx/signals/events';
import { navigationEvents } from './events/navigation.events';
import { loadNavigation, loadSuccessReducer } from './reducers/navigation.reducers';
import { createNavigationHandlers } from './handlers/navigation.handlers';

const navigationConfig = entityConfig({
  entity: {} as Navigation,
  collection: 'navigation'
});

export const NavigationStore = signalStore(
  { providedIn: 'root' },
  withEntities(navigationConfig),
  withState({ isLoading: false }),
  withReducer(
    on(navigationEvents.load, loadNavigation),
    on(navigationEvents.loadedSuccess, (event) => 
      loadSuccessReducer(event, navigationConfig)
    )
  ),
  withEventHandlers(createNavigationHandlers)
);
