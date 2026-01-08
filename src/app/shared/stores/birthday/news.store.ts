import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withEntities, entityConfig } from '@ngrx/signals/entities';
import { newsComputedFactory } from './factories/news-computed.factory';
import { on, withReducer, withEventHandlers, injectDispatch } from '@ngrx/signals/events';
import {
  loadInitial,
  loadSuccess
} from './reducers/event.reducers';
import { createNewsEventHandlers } from './handlers/news.handlers';
import { News } from '../../models/entities/news.model';
import { newsEvents } from './events/birthday.events';

const newsConfig = entityConfig({
  entity: {} as News,
  collection: 'news'
});

export const NewsStore = signalStore(
  { providedIn: 'root' },
  withEntities(newsConfig),
  withState({ isLoading: false }),
  withComputed(({ newsEntities }) => newsComputedFactory(newsEntities)),
  withReducer(
    on(newsEvents.load, loadInitial),
    on(newsEvents.loadedSuccess, (event) => 
      loadSuccess(event, newsConfig)
    )
  ),
  withMethods((store) => {
    const dispatcher = injectDispatch(newsEvents);
    return {
      loadNews: () => {
        dispatcher.load();
      }
    };
  }),
  withEventHandlers(createNewsEventHandlers)
);
