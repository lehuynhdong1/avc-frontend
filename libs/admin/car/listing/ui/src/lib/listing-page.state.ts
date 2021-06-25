export interface ListingPageState {
  isOpened: boolean;
  selectedCarId: number;
}
export const INITIAL_STATE: ListingPageState = { selectedCarId: 0, isOpened: false };
