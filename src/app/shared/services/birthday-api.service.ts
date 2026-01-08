import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/helper/pagination.interface';
import { DeltaResponse } from '../models/helper/delta-response.interface';
import { Birthday } from '../models/entities/birthday.interface';

@Injectable({
  providedIn: 'root',
})
export class BirthdayApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/birthdays';

  /**
   * Get paginated birthday list
   */
  getBirthdays(pageNumber: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Birthday>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Birthday>>(this.apiUrl, { params });
  }

    /**
   * Get delta changes since last sync (for offline-first sync)
   */
  getDelta(lastSyncTimestamp: number): Observable<DeltaResponse<Birthday>> {
    const params = new HttpParams().set('since', lastSyncTimestamp.toString());
    return this.http.get<DeltaResponse<Birthday>>(`${this.apiUrl}/delta`, { params });
  }
}
