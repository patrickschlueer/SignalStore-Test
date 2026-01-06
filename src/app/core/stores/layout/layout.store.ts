import { signalStore, withState } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { layoutEvents } from './events/layout-events';
import {
  toggleNavigationSidenavReducer,
  openNavigationSidenavReducer,
  closeNavigationSidenavReducer,
  toggleNotificationSidenavReducer,
  openNotificationSidenavReducer,
  closeNotificationSidenavReducer,
  closeAllReducer
} from './reducers/layout.reducers';

export interface LayoutState {
  navigationSidenavOpen: boolean;
  notificationSidenavOpen: boolean;
}

export const LayoutStore = signalStore(
  { providedIn: 'root' },
  withState<LayoutState>({
    navigationSidenavOpen: false,
    notificationSidenavOpen: false
  }),
  withReducer(
    on(layoutEvents.navigationSidenavToggled, toggleNavigationSidenavReducer),
    on(layoutEvents.navigationSidenavOpened, openNavigationSidenavReducer),
    on(layoutEvents.navigationSidenavClosed, closeNavigationSidenavReducer),
    on(layoutEvents.notificationSidenavToggled, toggleNotificationSidenavReducer),
    on(layoutEvents.notificationSidenavOpened, openNotificationSidenavReducer),
    on(layoutEvents.notificationSidenavClosed, closeNotificationSidenavReducer),
    on(layoutEvents.allClosed, closeAllReducer)
  )
);
