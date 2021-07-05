export const loader = ['en', 'vi'].reduce((acc: any, lang: string) => {
  acc[lang] = () => import(`./i18n/${lang}.json`);
  return acc;
}, {});

