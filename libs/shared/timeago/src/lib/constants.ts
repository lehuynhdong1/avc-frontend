import { IL10nsStrings } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
// import { strings as viStrings } from 'ngx-timeago/language-strings/vi';

export const TIMEAGO_LANGUAGES = {
  en: englishStrings
  // vi: viStrings
};

export type TimeagoLanguage = 'en';
export type IL10nsStringsKey = keyof IL10nsStrings;
