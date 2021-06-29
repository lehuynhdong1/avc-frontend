import { Id } from '@shared/ui/dynamic-table';
export interface ListingPageState {
  isOpened: boolean;
  selectedManagerId: Id;
}
export const INITIAL_STATE: ListingPageState = { selectedManagerId: 0, isOpened: false };
