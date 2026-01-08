import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { PaginatedResponse } from '../../../models/pagination.model';
import { News } from '../../../models/news.model';

export const newsEvents = eventGroup({
  source: 'News',
  events: {
    load: type<void>(),
    loadedSuccess: type<PaginatedResponse<News>>()
  },
}); 