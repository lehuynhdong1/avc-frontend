import { Injectable } from '@angular/core';
import { IL10nsStrings, TimeagoFormatter } from 'ngx-timeago';
import { TIMEAGO_LANGUAGES, TimeagoLanguage, IL10nsStringsKey } from './constants';
import { Store } from '@ngxs/store';
import { LanguageState } from '@shared/language';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
const WEEK_TRANSLATION = {
  en: '%d week',
  vi: '%d tuần'
};

@Injectable()
export class CustomTimeagoFormatter extends TimeagoFormatter {
  constructor(private store: Store) {
    super();
  }

  format(then: number): string {
    const language = this.store.selectSnapshot(LanguageState.getLanguage);
    const i18nStrings: IL10nsStrings = {
      ...TIMEAGO_LANGUAGES[language as TimeagoLanguage],
      weeks: WEEK_TRANSLATION[language]
    };

    const now = Date.now();
    const seconds = Math.round(Math.abs(now - then) / 1000);
    let suffix: IL10nsStringsKey = then < now ? 'suffixAgo' : 'suffixFromNow';
    if (language === 'vi') suffix = 'suffixFromNow';

    const [value, unit]: [number, IL10nsStringsKey] =
      seconds < MINUTE
        ? [1, 'minute']
        : seconds < HOUR
        ? [Math.round(seconds / MINUTE), 'minutes']
        : seconds < DAY
        ? [Math.round(seconds / HOUR), 'hours']
        : seconds < WEEK
        ? [Math.round(seconds / DAY), 'days']
        : seconds < MONTH
        ? [Math.round(seconds / WEEK), 'weeks']
        : seconds < YEAR
        ? [Math.round(seconds / MONTH), 'months']
        : [Math.round(seconds / YEAR), 'years'];

    return `${(i18nStrings[unit] as string).replace('%d', value + '')} ${i18nStrings[suffix]}`;
  }
}
