import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { createBirthdayComputedFactory } from './factories/birthday-computed.factory';
import { createBirthdayMethods } from './methods/birthday.methods';
import { initialBirthdayState } from './state/birthday.state';

export const BirthdayStore = signalStore(
  { providedIn: 'root' },
  withState(initialBirthdayState),
  withComputed(createBirthdayComputedFactory),
  withMethods(createBirthdayMethods),
  withHooks({
    onInit(store) {
      store.loadBirthdays();
    }
  })
);
