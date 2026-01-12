import { computed, inject } from '@angular/core';
import { SkillCollection } from '../../../signaldb/collections/entities/skill.collection';

export function createSkillComputedFactory() {
  const skillCollection = inject(SkillCollection);
  
  return {
    // Reactive: Liest direkt aus Collection
    skill: computed(() => skillCollection.collection.find().fetch()),
    
    // Sortierte Skill nach Datum (neueste zuerst)
    sortedSkill: computed(() => {
      const allSkill = skillCollection.collection.find().fetch();
      return allSkill;
    })
  };
}
