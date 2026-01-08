import { Injectable, inject } from "@angular/core";
import { Birthday } from "../../../models/entities/birthday.interface";
import { BirthdayCollection } from "../../collections/entities/birthday.collection";
import { BaseSyncManager } from "../base/base-sync-manager";
import { BirthdayApiService } from "../../../services/birthday-api.service";

/**
 * Birthday Sync Manager
 * Handles synchronization for Birthday entities
 */
@Injectable({
  providedIn: 'root'
})
export class BirthdaySyncManager extends BaseSyncManager<Birthday> {
  
  constructor() {
    const birthdayCollection = inject(BirthdayCollection);
    const birthdayApiService = inject(BirthdayApiService);
    super('birthday', birthdayCollection, birthdayApiService);
  }

  protected getLoadMethod(): string {
    return 'getBirthdays';
  }

  protected getDeltaMethod(): string {
    return 'getDelta';
  }

  // Optional: Override default params if needed
  // protected getDefaultParams(): any[] {
  //   return [1, 50]; // Custom page size
  // }
}
