export interface DeltaResponse<T> {
  created: T[];
  updated: T[];
  deleted: string[];
  timestamp: number;
}
