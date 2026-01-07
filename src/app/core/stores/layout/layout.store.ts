import { signalStore, withState } from '@ngrx/signals';
import { on, withReducer, withEventHandlers } from '@ngrx/signals/events';
import { layoutEvents } from './events/layout-events';
import {
  toggleNavigationSidenavReducer,
  openNavigationSidenavReducer,
  closeNavigationSidenavReducer,
  toggleNotificationSidenavReducer,
  openNotificationSidenavReducer,
  closeNotificationSidenavReducer,
  closeAllReducer,
  toggleDarkModeReducer
} from './reducers/layout.reducers';
import { createLayoutHandlers } from './handlers/layout.handlers';

export interface LayoutState {
  navigationSidenavOpen: boolean;
  notificationSidenavOpen: boolean;
  darkMode: boolean;
}

export const LayoutStore = signalStore(
  { providedIn: 'root' },
  withState<LayoutState>({
    navigationSidenavOpen: false,
    notificationSidenavOpen: false,
    darkMode: false
  }),
  withReducer(
    on(layoutEvents.navigationSidenavToggled, toggleNavigationSidenavReducer),
    on(layoutEvents.navigationSidenavOpened, openNavigationSidenavReducer),
    on(layoutEvents.navigationSidenavClosed, closeNavigationSidenavReducer),
    on(layoutEvents.notificationSidenavToggled, toggleNotificationSidenavReducer),
    on(layoutEvents.notificationSidenavOpened, openNotificationSidenavReducer),
    on(layoutEvents.notificationSidenavClosed, closeNotificationSidenavReducer),
    on(layoutEvents.allClosed, closeAllReducer),
    on(layoutEvents.darkModeToggled, toggleDarkModeReducer)
  ),
  withEventHandlers(createLayoutHandlers)
);
