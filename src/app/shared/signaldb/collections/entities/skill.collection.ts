import { Injectable } from '@angular/core';
import { Skill } from '../../../models/entities/skill.interface';
import { BaseCollection } from '../base/base.collection';

/**
 * SignalDB Collection for Skill
 * Provides persistent storage in IndexedDB with automatic synchronization
 */
@Injectable({
  providedIn: 'root'
})
export class SkillCollection extends BaseCollection<Skill> {
  
  constructor() {
    super('skills');
  }
}
