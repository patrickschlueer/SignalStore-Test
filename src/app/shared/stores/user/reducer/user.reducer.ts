// user/reducers/user.reducers.ts
import { userEvents } from '../events/user-events';

export function loadUser() {
  return {
    isLoading: true
  };
}

export function loadedSuccessUser(event: ReturnType<typeof userEvents.loadedSuccess>) {
  return {
    user: event.payload,
    isLoading: false
  };
}