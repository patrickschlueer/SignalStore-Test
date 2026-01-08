export interface NewsState {
  isLoading: boolean;
  isSyncing: boolean;
}

export const initialNewsState: NewsState = {
  isLoading: false,
  isSyncing: false
};
