import { Injectable, inject } from "@angular/core";
import { News } from "../../../models/entities/news.interface";
import { NewsApiService } from "../../../services/news-api.service";
import { NewsCollection } from "../../collections/entities/news.collection";
import { BaseSyncManager } from "../base/base-sync-manager";

/**
 * News Sync Manager
 * Handles synchronization for News entities
 */
@Injectable({
  providedIn: 'root'
})
export class NewsSyncManager extends BaseSyncManager<News> {
  
  constructor() {
    const newsCollection = inject(NewsCollection);
    const newsApiService = inject(NewsApiService);
    super('news', newsCollection, newsApiService);
  }

  protected getLoadMethod(): string {
    return 'getNews';
  }

  protected getDeltaMethod(): string {
    return 'getDelta';
  }

  // Optional: Override default params if needed
  // protected getDefaultParams(): any[] {
  //   return [1, 50]; // Custom page size
  // }
}
