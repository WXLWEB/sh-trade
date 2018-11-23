import * as Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import env from '../constants/env';
const ICaptchaRecord = Immutable.Record({
  data: null,
});

export class ICaptcha extends ICaptchaRecord {
  data: string;
}

const initialState = new(ICaptcha);

export default handleActions({
    'refresh captcha requested'(state: ICaptcha = initialState, action: any) {
      const email = action.payload;
        return state.update('data', v => `${env.API_URL}/api.php/account/captcha?username=${encodeURIComponent(email)}&rand=${Math.random()}`);
    },
}, initialState);
