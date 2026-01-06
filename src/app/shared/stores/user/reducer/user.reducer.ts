// user/reducers/user.reducers.ts
import { UserState } from '../user.store';
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

export function updateUser(event: ReturnType<typeof userEvents.updated>, state: UserState) {
  const currentUser = state.user;
  if (!currentUser) return {};
  
  return {
    user: { ...currentUser, ...event.payload }
  };
}

export function setUser(event: ReturnType<typeof userEvents.set>) {
  return {
    user: event.payload
  };
}

export function clearUser() {
  return {
    user: null
  };
}
