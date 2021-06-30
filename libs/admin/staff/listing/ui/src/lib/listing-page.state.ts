import { Id } from '@shared/ui/dynamic-table';
export interface ListingPageState {
  isOpened: boolean;
  selectedStaffId: Id;
}
export const INITIAL_STATE: ListingPageState = { selectedStaffId: 0, isOpened: false };
