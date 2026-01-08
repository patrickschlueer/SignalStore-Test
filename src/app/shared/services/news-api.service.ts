import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/entities/news.model';
import { PaginatedResponse } from '../models/helper/pagination.interface';
import { DeltaResponse } from '../models/helper/delta-response.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/news';

  /**
   * Get paginated news list
   */
  getNews(pageNumber: number = 1, pageSize: number = 10): Observable<PaginatedResponse<News>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<News>>(this.apiUrl, { params });
  }

  /**
   * Get single news by ID
   */
  getNewsById(id: string): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create new news
   */
  createNews(news: News): Observable<News> {
    return this.http.post<News>(this.apiUrl, news);
  }

  /**
   * Update existing news
   */
  updateNews(id: string, news: News): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/${id}`, news);
  }

  /**
   * Delete news
   */
  deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get delta changes since last sync (for offline-first sync)
   */
  getDelta(lastSyncTimestamp: number): Observable<DeltaResponse<News>> {
    const params = new HttpParams().set('since', lastSyncTimestamp.toString());
    return this.http.get<DeltaResponse<News>>(`${this.apiUrl}/delta`, { params });
  }
}
