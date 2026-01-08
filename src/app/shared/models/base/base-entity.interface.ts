/**
 * Base interface for all SignalDB entities
 * Ensures all entities have an id field required by SignalDB
 */
export interface BaseEntity {
  id: string;
}
