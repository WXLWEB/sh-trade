import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as zh from 'react-intl/locale-data/zh';
import { IaLLMapState } from '../../constants/AppType';

// import { IConnectIntlState, IConnectIntlReturn } from '../../constants/ComponentsType';
addLocaleData(en);
addLocaleData(zh);

function mapStateToProps(state: IaLLMapState) {
  const lang = state.locales.get('lang');
  const messages = state.locales.get('messages');
  return { key: lang, locale: lang, messages };
}

export default connect(mapStateToProps)(IntlProvider);
