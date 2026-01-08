import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withEntities, entityConfig } from '@ngrx/signals/entities';
import { birthdayComputedFactory } from './factories/birthday-computed.factory';
import { on, withReducer, withEventHandlers, injectDispatch } from '@ngrx/signals/events';
import {
  loadInitial,
  loadSuccess
} from './reducers/birthday.reducers';
import { createBirthdayEventHandlers } from './handlers/birthday.handlers';
import { Birthday } from '../../models/entities/birthday.interface';
import { birthdayEvents } from './events/birthday.events';

const birthdayConfig = entityConfig({
  entity: {} as Birthday,
  collection: 'birthday'
});

export const BirthdayStore = signalStore(
  { providedIn: 'root' },
  withEntities(birthdayConfig),
  withState({ isLoading: false }),
  withComputed(({ birthdayEntities }) => birthdayComputedFactory(birthdayEntities)),
  withReducer(
    on(birthdayEvents.load, loadInitial),
    on(birthdayEvents.loadedSuccess, (event) => 
      loadSuccess(event, birthdayConfig)
    )
  ),
  withMethods((store) => {
    const dispatcher = injectDispatch(birthdayEvents);
    return {
      loadBirthday: () => {
        dispatcher.load();
      }
    };
  }),
  withEventHandlers(createBirthdayEventHandlers)
);
