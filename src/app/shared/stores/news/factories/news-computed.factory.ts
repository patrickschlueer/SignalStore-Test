import { computed, inject } from '@angular/core';
import { NewsCollection } from '../../../signaldb/collections/entities/news.collection';

export function createNewsComputedFactory() {
  const newsCollection = inject(NewsCollection);
  
  return {
    // Reactive: Liest direkt aus Collection
    news: computed(() => newsCollection.collection.find().fetch()),
    
    // Sortierte News nach Datum (neueste zuerst)
    sortedNews: computed(() => {
      const allNews = newsCollection.collection.find().fetch();
      return [...allNews].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    })
  };
}
