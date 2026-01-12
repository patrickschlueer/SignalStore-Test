import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Employee } from '../../../models/entities/employee.interface';
import { SkillFilter } from '../../../models/helper/skill-filter.interface';

export const employeeEvents = eventGroup({
  source: 'Employee',
  events: {
    load: type<void>(),
    loadedSuccess: type<Employee[]>(),
    // Filter Events
    searchQueryChanged: type<{ query: string }>(),
    skillFilterChanged: type<{ filter: SkillFilter }>()
  },
}); 