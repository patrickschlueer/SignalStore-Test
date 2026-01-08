import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { User } from '../../../models/entities/user.interface';

export const userEvents = eventGroup({
  source: 'User',
  events: {
    load: type<void>(),
    loadedSuccess: type<User>()
  },
});
