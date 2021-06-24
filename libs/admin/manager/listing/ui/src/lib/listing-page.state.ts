export interface ListingPageState {
  isOpened: boolean;
  selectedManagerId: number;
}
export const INITIAL_STATE: ListingPageState = { selectedManagerId: 0, isOpened: false };
