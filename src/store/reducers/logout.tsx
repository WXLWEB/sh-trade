import { ILogout } from '@/constants/ReducerType';
import { ILogoutAction } from '@/constants/ActionType';
import { removeToken } from '@/utils/token';

const initialState: ILogout = {
  sequence: 'next',
};

export default function logout(state: ILogout = initialState, action: ILogoutAction): ILogout {
  switch (action.type) {
    case 'logout requested':
      removeToken()
      return state;
    case 'logout failed':
      return state;
    default:
      return state;
  }
}
