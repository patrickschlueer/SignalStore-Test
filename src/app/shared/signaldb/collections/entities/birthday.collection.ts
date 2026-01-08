import { Injectable } from '@angular/core';
import { Birthday } from '../../../models/entities/birthday.interface';
import { BaseCollection } from '../base/base.collection';

/**
 * SignalDB Collection for Birthdays
 * Provides persistent storage in IndexedDB with automatic synchronization
 */
@Injectable({
  providedIn: 'root'
})
export class BirthdayCollection extends BaseCollection<Birthday> {
  
  constructor() {
    super('birthday');
  }
}
