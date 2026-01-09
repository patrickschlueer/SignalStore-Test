export interface EmployeeState {
  isLoading: boolean;
  isSyncing: boolean;
}

export const initialEmployeeState: EmployeeState = {
  isLoading: false,
  isSyncing: false
};
