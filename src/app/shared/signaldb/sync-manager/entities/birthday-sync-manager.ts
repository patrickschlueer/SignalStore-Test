import { Injectable, inject } from '@angular/core';
import { BaseSyncManager } from '../base/base-sync-manager';
import { Birthday } from '../../../models/entities/birthday.interface';
import { BirthdayCollection } from '../../collections/entities/birthday.collection';
import { BirthdayApiService } from '../../../services/birthday-api.service';

/**
 * Birthday Sync Manager
 * Manages synchronization between backend and IndexedDB for birthdays
 */
@Injectable({ providedIn: 'root' })
export class BirthdaySyncManager extends BaseSyncManager<Birthday> {
  
  constructor() {
    const birthdayCollection = inject(BirthdayCollection);
    const birthdayApiService = inject(BirthdayApiService);
    super('birthdays', birthdayCollection, birthdayApiService);
  }

  protected getLoadMethod(): string {
    return 'getBirthdays';
  }

  protected getDeltaMethod(): string {
    return 'getDelta';
  }
}
