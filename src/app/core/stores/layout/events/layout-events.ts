import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const layoutEvents = eventGroup({
  source: 'Layout',
  events: {
    navigationSidenavToggled: type<void>(),
    navigationSidenavOpened: type<void>(),
    navigationSidenavClosed: type<void>(),
    notificationSidenavToggled: type<void>(),
    notificationSidenavOpened: type<void>(),
    notificationSidenavClosed: type<void>(),
    allClosed: type<void>(),
    darkModeToggled: type<void>(),
  },
});
