export interface BirthdayState {
  isLoading: boolean;
  isSyncing: boolean;
}

export const initialBirthdayState: BirthdayState = {
  isLoading: false,
  isSyncing: false
};
