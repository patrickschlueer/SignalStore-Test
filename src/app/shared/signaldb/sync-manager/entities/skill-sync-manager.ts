import { Injectable, inject } from "@angular/core";
import { Skill } from "../../../models/entities/skill.interface";
import { SkillCollection } from "../../collections/entities/skill.collection";
import { BaseSyncManager } from "../base/base-sync-manager";
import { SkillApiService } from "../../../services/skill-api.service";

/**
 * Skill Sync Manager
 * Handles synchronization for Skill entities
 */
@Injectable({
  providedIn: 'root'
})
export class SkillSyncManager extends BaseSyncManager<Skill> {
  
  constructor() {
    const skillCollection = inject(SkillCollection);
    const skillApiService = inject(SkillApiService);
    super('skills', skillCollection, skillApiService);
  }

  protected getLoadMethod(): string {
    return 'getSkills';
  }

  protected getDeltaMethod(): string {
    return 'getDelta';
  }
}
