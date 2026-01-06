import { signalStore, withComputed, withState } from '@ngrx/signals';
import { withEntities, entityConfig } from '@ngrx/signals/entities';
import { Notification } from '../../models/notification.interface';
import { notificationComputedFactory } from './factories/notification-computed.factory';
import { on, withReducer, withEventHandlers } from '@ngrx/signals/events';
import { notificationEvents } from './events/notification-events';
import {
  removeNotification,
  readNotification,
  unreadNotification,
  addNotification,
  loadInitial,
  loadSuccess
} from './reducers/notification.reducers';
import { createNotificationHandlers } from './handlers/notification.handlers';

const notificationConfig = entityConfig({
  entity: {} as Notification,
  collection: 'notification'
});

export const NotificationStore = signalStore(
  { providedIn: 'root' },
  withEntities(notificationConfig),
  withState({ isLoading: false }),
  withComputed(({ notificationEntities }) => notificationComputedFactory(notificationEntities)),
  withReducer(
    on(notificationEvents.removed, (event) => 
      removeNotification(event, notificationConfig)
    ),
    on(notificationEvents.read, (event) => 
      readNotification(event, notificationConfig)
    ),
    on(notificationEvents.unread, (event) => 
      unreadNotification(event, notificationConfig)
    ),
    on(notificationEvents.added, () => 
      addNotification(notificationConfig)
    ),
    on(notificationEvents.load, loadInitial),
    on(notificationEvents.loadedSuccess, (event) => 
      loadSuccess(event, notificationConfig)
    )
  ),
  withEventHandlers(createNotificationHandlers)
);
