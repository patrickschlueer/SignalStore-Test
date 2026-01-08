import { Injectable } from '@angular/core';
import { BaseCollection } from '../base/base.collection';
import { Birthday } from '../../../models/entities/birthday.interface';

/**
 * Birthday Collection
 * SignalDB collection for birthdays with IndexedDB persistence
 */
@Injectable({ providedIn: 'root' })
export class BirthdayCollection extends BaseCollection<Birthday> {
  
  constructor() {
    super('birthdays');
  }
}
