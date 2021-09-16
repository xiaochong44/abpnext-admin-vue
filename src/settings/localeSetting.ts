import type { LocaleSetting, LocaleType } from '/#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
  AR: 'ar',
  CS: 'cs',
  EN: 'en',
  EN_GB: 'en-GB',
  FI: 'fi',
  FR: 'fr',
  HI: 'hi',
  IT: 'it',
  HU: 'hu',
  PT_BR: 'pt-BR',
  RU: 'ru',
  SK: 'sk',
  TR: 'tr',
  ZH_HANS: 'zh-Hans',
  ZH_HANT: 'zh-Hant',
  DE_DE: 'de-DE',
  ES: 'es',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_HANS,
  // Default locale
  fallback: LOCALE.ZH_HANS,
};
