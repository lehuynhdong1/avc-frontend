import { TimeagoClock, TimeagoFormatter } from 'ngx-timeago';
import { CustomTimeagoClock } from './custom-timeago-clock';
import { CustomTimeagoFormatter } from './custom-timeage-formatter';

export const defaultConfig = {
  clock: { provide: TimeagoClock, useClass: CustomTimeagoClock },
  formatter: {
    provide: TimeagoFormatter,
    useClass: CustomTimeagoFormatter
  }
};
