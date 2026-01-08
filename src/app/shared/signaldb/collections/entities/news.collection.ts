import { Injectable } from '@angular/core';
import { News } from '../../../models/entities/news.model';
import { BaseCollection } from '../base/base.collection';

/**
 * SignalDB Collection for News
 * Provides persistent storage in IndexedDB with automatic synchronization
 */
@Injectable({
  providedIn: 'root'
})
export class NewsCollection extends BaseCollection<News> {
  
  constructor() {
    super('news');
  }
}
