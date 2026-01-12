import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { createSkillComputedFactory } from './factories/skill-computed.factory';
import { createSkillMethods } from './methods/skill.methods';
import { initialSkillState } from './state/skill.state';

export const SkillStore = signalStore(
  { providedIn: 'root' },
  withState(initialSkillState),
  withComputed(createSkillComputedFactory),
  withMethods(createSkillMethods),
  withHooks({
    onInit(store) {
      store.loadSkill();
    }
  })
);
