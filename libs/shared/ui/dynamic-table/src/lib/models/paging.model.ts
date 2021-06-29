import { HasId } from './ui-state.model';

export interface PagingResponse<T extends HasId> {
  result?: Array<T> | null;
  count?: number;
  nextPage?: string | null;
  previousPage?: string | null;
}
