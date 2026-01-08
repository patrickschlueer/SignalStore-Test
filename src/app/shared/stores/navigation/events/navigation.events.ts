import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Navigation } from '../../../models/entities/navigation.interface';

export const navigationEvents = eventGroup({
  source: 'Navigation',
  events: {
    load: type<void>(),
    loadedSuccess: type<Navigation[]>()
  },
});
