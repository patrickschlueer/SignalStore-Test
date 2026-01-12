import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/helper/pagination.interface';
import { DeltaResponse } from '../models/helper/delta-response.interface';
import { Skill } from '../models/entities/skill.interface';

@Injectable({
  providedIn: 'root',
})
export class SkillApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/skills';

  /**
   * Get paginated skill list
   */
  getSkills(pageNumber: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Skill>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Skill>>(this.apiUrl, { params });
  }

    /**
   * Get delta changes since last sync (for offline-first sync)
   */
  getDelta(lastSyncTimestamp: number): Observable<DeltaResponse<Skill>> {
    const params = new HttpParams().set('since', lastSyncTimestamp.toString());
    return this.http.get<DeltaResponse<Skill>>(`${this.apiUrl}/delta`, { params });
  }
}
