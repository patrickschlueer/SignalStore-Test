import { addEntity, removeEntity, updateEntity, setAllEntities } from '@ngrx/signals/entities';
import { notificationEvents } from '../events/notification-events';
import { TEST_NOTIFICATIONS } from '../../../mocks/notification.mock';
import { Notification } from '../../../models/notification.interface';

export function removeNotification(
  event: ReturnType<typeof notificationEvents.removed>,
  config: { collection: string }
) {
  return removeEntity(event.payload, config);
}

export function readNotification(
  event: ReturnType<typeof notificationEvents.read>,
  config: { collection: string }
) {
  return updateEntity({ id: event.payload, changes: { read: true } }, config);
}

export function unreadNotification(
  event: ReturnType<typeof notificationEvents.unread>,
  config: { collection: string }
) {
  return updateEntity({ id: event.payload, changes: { read: false } }, config);
}

export function addNotification(
  config: { collection: string }
) {
  const randomNotification = TEST_NOTIFICATIONS[
    Math.floor(Math.random() * TEST_NOTIFICATIONS.length)
  ];
  
  const notification: Notification = {
    id: crypto.randomUUID(),
    ...randomNotification,
    timestamp: new Date()
  };
  
  return addEntity(notification, config);
}

export function loadInitial() {
  return {
    isLoading: true
  };
}

export function loadSuccess(
  event: ReturnType<typeof notificationEvents.loadedSuccess>,
  config: { collection: string }
) {
  return [
    setAllEntities(event.payload, config),
    { isLoading: false }
  ];
}
