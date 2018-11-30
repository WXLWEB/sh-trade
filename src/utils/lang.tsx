import Cookie from 'js-cookie';

function getDefaultLang() {
  let nav = window.navigator;
  return Cookie.get('ZG-lang') || (nav.language || '').split('-')[0] || 'zh';
}

export default getDefaultLang;
