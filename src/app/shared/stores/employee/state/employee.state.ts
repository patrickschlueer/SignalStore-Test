import { SKILL_FILTERS } from "../../../mocks/skill-filter.mock";
import { SkillFilter } from "../../../models/helper/skill-filter.interface";

export interface EmployeeState {
  isLoading: boolean;
  isSyncing: boolean;
  
  // Filter State
  searchQuery: string;
  skillFilter: SkillFilter;
  skillFilters: SkillFilter[];
}

export const initialEmployeeState: EmployeeState = {
  isLoading: false,
  isSyncing: false,
  searchQuery: '',
  skillFilters: SKILL_FILTERS,
  skillFilter: SKILL_FILTERS[0]
}
