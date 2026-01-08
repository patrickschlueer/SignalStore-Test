import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Birthday } from '../../../models/entities/birthday.interface';

export const birthdayEvents = eventGroup({
  source: 'Birthday',
  events: {
    load: type<void>(),
    loadedSuccess: type<Birthday[]>()
  },
}); 