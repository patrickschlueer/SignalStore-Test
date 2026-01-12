import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Skill } from '../../../models/entities/skill.interface';

export const skillEvents = eventGroup({
  source: 'Skill',
  events: {
    load: type<void>(),
    loadedSuccess: type<Skill[]>()
  },
}); 