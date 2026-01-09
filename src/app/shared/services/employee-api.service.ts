import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/entities/employee.interface';
import { PaginatedResponse } from '../models/helper/pagination.interface';
import { DeltaResponse } from '../models/helper/delta-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/employees';

  /**
   * Get paginated employee list
   */
  getEmployees(pageNumber: number = 1, pageSize: number = 100): Observable<PaginatedResponse<Employee>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Employee>>(this.apiUrl, { params });
  }

  /**
   * Get delta changes since last sync (for offline-first sync)
   */
  getDelta(lastSyncTimestamp: number): Observable<DeltaResponse<Employee>> {
    const params = new HttpParams().set('since', lastSyncTimestamp.toString());
    return this.http.get<DeltaResponse<Employee>>(`${this.apiUrl}/delta`, { params });
  }
}
