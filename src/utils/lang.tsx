import cookie from 'react-cookie';

function getDefaultLang() {
  let nav = window.navigator;
  return cookie.load('btcchina_lang') || (nav.language || '').split('-')[0] || 'zh';
}

export default getDefaultLang;
