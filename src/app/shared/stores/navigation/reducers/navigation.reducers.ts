import { setAllEntities } from '@ngrx/signals/entities';
import { navigationEvents } from '../events/navigation.events';

export function loadNavigation() {
  return {
    isLoading: true
  };
}

export function loadSuccessReducer(
  event: ReturnType<typeof navigationEvents.loadedSuccess>,
  config: { collection: string }
) {
  return [
    setAllEntities(event.payload, config),
    { isLoading: false }
  ];
}
