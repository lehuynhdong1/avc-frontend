import { filter, skip } from 'rxjs/operators';

export interface ListingPageState {
  isOpened: boolean;
  selectedStaffId: number;
}
export const INITIAL_STATE: ListingPageState = { selectedStaffId: 0, isOpened: false };

export const CUSTOM_OPERATORS = {
  filterValidId: () => filter((id: number) => id > 0),
  skipInitial: () => skip<number>(1)
};
