import { Id } from '@shared/ui/dynamic-table';
export interface ListingPageState {
  isOpened: boolean;
  selectedIssueId: Id;
}
export const INITIAL_STATE: ListingPageState = { selectedIssueId: 0, isOpened: false };
