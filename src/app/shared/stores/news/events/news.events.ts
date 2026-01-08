import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { News } from '../../../models/entities/news.model';

export const newsEvents = eventGroup({
  source: 'News',
  events: {
    load: type<void>(),
    loadedSuccess: type<News[]>()
  },
}); 