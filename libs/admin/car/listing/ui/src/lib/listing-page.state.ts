import { Id } from '@shared/ui/dynamic-table';
export interface ListingPageState {
  isOpened: boolean;
  selectedCarId: Id;
}
export const INITIAL_STATE: ListingPageState = { selectedCarId: 0, isOpened: false };
