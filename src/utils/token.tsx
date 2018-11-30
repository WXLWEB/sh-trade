import Cookies from 'js-cookie';

const TokenKey = 'ZG-Token'

const getToken = () => {
  Cookies.get(TokenKey)
}

const setToken = (token: string) => {
  Cookies.set(TokenKey, token, {
      domain: '',
      path: '/',
      expires: new Date(Date.now() + 24 * 3600 * 1000),
    }
  )
}

const removeToken = () => {
  Cookies.remove(TokenKey)
}

export {
  getToken,
  setToken,
  removeToken,
};
