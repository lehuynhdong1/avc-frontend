export interface ListingPageState {
  isOpened: boolean;
  selectedIssueId: number;
}
export const INITIAL_STATE: ListingPageState = { selectedIssueId: 0, isOpened: false };
