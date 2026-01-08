import { computed, Signal } from '@angular/core';
import { News } from '../../../models/entities/news.model';

export function newsComputedFactory(newsEntities: Signal<News[]>) {
  return {
    sortedNews: computed(() => {
      return [...newsEntities()].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    })
  };
}
