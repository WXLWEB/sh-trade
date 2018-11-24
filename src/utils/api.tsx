import 'isomorphic-fetch';
import * as fetch from 'isomorphic-fetch';
import env from '../constants/env';
import fetchBase from './fetchbase';

export const login = ({ mobile, password, sms_key, sms_code }) => fetchBase('/api/v1/login/mobile', 'POST', { mobile, password, sms_key, sms_code });
export const register = ({ mobile, password, sms_key, sms_code }) => fetchBase('/api/v1/register/mobile', 'POST', { mobile, password, sms_key, sms_code });
export const getSmsVcode = ({ mobile }) => fetchBase('/api/v1/vcode/sms', 'POST', { mobile });

export const getChartData = async (payload) => {
  return await fetch(`${env.CHART_URL}?symbol=ETHCNY&from=${payload.startTime}&to=${payload.endTime}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).then((response) => {
    return response;
  });
};
