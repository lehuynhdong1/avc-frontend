import { UnaryFunction, Observable, OperatorFunction, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

export function hasValue<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(
    filter((x) => x != null && x !== undefined) as OperatorFunction<T | null | undefined, T>
  );
}
