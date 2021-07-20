import { TimeagoClock } from 'ngx-timeago';
import { Observable, interval } from 'rxjs';

export class CustomTimeagoClock extends TimeagoClock {
  tick(): Observable<number> {
    return interval(60 * 1000);
  }
}
