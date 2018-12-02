import { removeToken } from '@/utils/token';

export type LogoutState = Readonly<any>

export type LogoutAction = Readonly<any>

export default function logout(state: LogoutState, action: LogoutAction){
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
