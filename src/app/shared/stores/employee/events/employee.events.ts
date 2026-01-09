import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Employee } from '../../../models/entities/employee.interface';

export const employeeEvents = eventGroup({
  source: 'Employee',
  events: {
    load: type<void>(),
    loadedSuccess: type<Employee[]>()
  },
}); 