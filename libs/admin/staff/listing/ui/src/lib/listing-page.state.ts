export interface ListingPageState {
  isOpened: boolean;
  selectedStaffId: number;
}
export const INITIAL_STATE: ListingPageState = { selectedStaffId: 0, isOpened: false };
