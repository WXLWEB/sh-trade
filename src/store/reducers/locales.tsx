import cookie from 'react-cookie';
import * as Immutable from 'immutable';
import { Map } from 'immutable';
import enLocales from '@/resources/locales/en';
import zhLocales from '@/resources/locales/zh';
import getDefaultLang from '@/utils/lang';

const locales = {
  en: enLocales,
  zh: zhLocales,
};
const lang = getDefaultLang();

export class ILocales extends Immutable.Record({
    lang: lang,
    messages: locales[lang],
}) {
    readonly lang: string;
    readonly messages: Object;
}

export interface ILocalesAction {
    payload: {};
    type: string;
};

const initialState = new(ILocales);

export default function localesReducer(state: ILocales = initialState, action: ILocalesAction){
  switch (action.type) {
      case 'change lang':
        const userLang = action.payload ? action.payload === 'en' ? 'en' : 'zh' : state.lang === 'en' ? 'zh' : 'en';
        cookie.save('btcchina_lang', userLang, {
            domain: '.btcc.com',
            path: '/',
            expires: new Date(Date.now() + 8760 * 3600 * 1000),
          });
        cookie.save('btcchina_lang', userLang, {
            domain: '.btcchina.com',
            path: '/',
            expires: new Date(Date.now() + 8760 * 3600 * 1000),
          });
        return Map({
            lang: userLang,
            messages: locales[userLang],
        });
      default:
        return state;
  }
}
