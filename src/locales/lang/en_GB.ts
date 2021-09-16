import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_GB';
import momentLocale from 'moment/dist/locale/en_gb';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    antdLocale,
  },
  momentLocale: momentLocale,
  momentLocaleName: 'en-gb',
};
