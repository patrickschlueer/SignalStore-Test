import { setAllEntities } from '@ngrx/signals/entities';
import { newsEvents } from '../events/birthday.events';

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
