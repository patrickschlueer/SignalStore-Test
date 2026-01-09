import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { createEmployeeComputedFactory } from './factories/employee-computed.factory';
import { createEmployeeMethods } from './methods/employee.methods';
import { initialEmployeeState } from './state/employee.state';

export const EmployeeStore = signalStore(
  { providedIn: 'root' },
  withState(initialEmployeeState),
  withComputed(createEmployeeComputedFactory),
  withMethods(createEmployeeMethods),
  withHooks({
    onInit(store) {
      store.loadEmployees();
    }
  })
);
