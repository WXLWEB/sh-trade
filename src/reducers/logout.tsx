import { ILogout } from '../constants/ReducerType';
import { ILogoutAction } from '../constants/ActionType';
import cookie from 'react-cookie';

const initialState: ILogout = {
  sequence: 'next',
};

export default function logout(state: ILogout = initialState, action: ILogoutAction): ILogout {
  switch (action.type) {
    case 'logout requested':
      cookie.remove('btcchina_jwt', { path: '/' });
      cookie.remove('btcchina_jwt', { domain: '.btcc.com', path: '/' });
      cookie.remove('btcchina_jwt', { domain: '.btcchina.com', path: '/' });
      return state;
    case 'logout failed':
      return state;
    default:
      return state;
  }
}
