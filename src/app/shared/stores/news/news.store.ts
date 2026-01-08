import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { createNewsComputedFactory } from './factories/news-computed.factory';
import { createNewsMethods } from './methods/news.methods';
import { initialNewsState } from './state/news.state';

export const NewsStore = signalStore(
  { providedIn: 'root' },
  withState(initialNewsState),
  withComputed(createNewsComputedFactory),
  withMethods(createNewsMethods),
  withHooks({
    onInit(store) {
      store.loadNews();
    }
  })
);
