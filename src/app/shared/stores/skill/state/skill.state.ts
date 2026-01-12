export interface SkillState {
  isLoading: boolean;
  isSyncing: boolean;
}

export const initialSkillState: SkillState = {
  isLoading: false,
  isSyncing: false
};
