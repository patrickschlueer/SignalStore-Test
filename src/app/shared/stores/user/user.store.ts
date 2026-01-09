import { signalStore, withState, withComputed } from '@ngrx/signals';
import { Employee } from '../../models/entities/employee.interface';
import { on, withReducer, withEventHandlers } from '@ngrx/signals/events';
import { userEvents } from './events/user-events';
import { userComputedFactory } from './factories/user-computed.factory';
import { loadUser, loadedSuccessUser } from './reducer/user.reducer';
import { createUserHandlers } from './handlers/user.handlers';

export interface UserState {
  user: Employee | null;
  isLoading: boolean;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>({
    user: null,
    isLoading: false
  }),
  withComputed(({ user }) => userComputedFactory(user)),
  withReducer(
    on(userEvents.load, loadUser),
    on(userEvents.loadedSuccess, loadedSuccessUser)
  ),
  withEventHandlers(createUserHandlers)
);
