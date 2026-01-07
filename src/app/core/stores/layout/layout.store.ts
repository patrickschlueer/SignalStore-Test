import { signalStore, withState } from '@ngrx/signals';
import { on, withReducer, withEventHandlers } from '@ngrx/signals/events';
import { layoutEvents } from './events/layout-events';
import {
  toggleNavigationSidenavReducer,
  openNavigationSidenavReducer,
  closeNavigationSidenavReducer,
  toggleDarkModeReducer
} from './reducers/layout.reducers';
import { createLayoutHandlers } from './handlers/layout.handlers';

export interface LayoutState {
  navigationSidenavOpen: boolean;
  darkMode: boolean;
}

export const LayoutStore = signalStore(
  { providedIn: 'root' },
  withState<LayoutState>({
    navigationSidenavOpen: true,
    darkMode: false
  }),
  withReducer(
    on(layoutEvents.navigationSidenavToggled, toggleNavigationSidenavReducer),
    on(layoutEvents.navigationSidenavOpened, openNavigationSidenavReducer),
    on(layoutEvents.navigationSidenavClosed, closeNavigationSidenavReducer),
    on(layoutEvents.darkModeToggled, toggleDarkModeReducer)
  ),
  withEventHandlers(createLayoutHandlers)
);
