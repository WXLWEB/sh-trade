
import env from '../constants/env';
import fetchBase from './fetchbase';

export const login = ({ mobile_prefix, mobile, password, sms_code }: any) => fetchBase('/api/login/mobile', 'POST', { mobile_prefix, mobile, password, sms_code });
export const register = ({ mobile, password, sms_key, sms_code }: any) => fetchBase('/api/register/mobile', 'POST', { mobile, password, sms_key, sms_code });
export const getSmsVcode = ({ mobile_prefix, mobile, type }: any) => fetchBase('/api/vcode/sms', 'POST', { mobile_prefix, mobile, type });
export const getAccountInfo = () => fetchBase('/api/account_info', 'GET');

export const getChartData = async (payload) => {
  return await fetch(`${env.CHART_URL}?symbol=ETHCNY&from=${payload.startTime}&to=${payload.endTime}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).then((response) => {
    return response;
  });
};
