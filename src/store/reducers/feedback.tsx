import { Record } from 'immutable';
import { message } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import isUndefined from 'lodash.isundefined';
let execReportData = {};

export interface FeedbackAction {
    payload: {
        RC: string;
        OrdRejReason: number;
        CxlRejReason: number;
    };
    type: string;
};

export class FeedbackState extends Record({
    execReportData: {},
}) {
    execReportData: any;
}

const dealExecReportResponse = (newData) => {
  const old = execReportData[newData.OID];

  // New Order Placed
  if(isUndefined(old) && newData.Status == 'A'){
    execReportData[newData.OID] = newData;
    return;
  };

  //Cancelled By System
  if(newData.Status != old.Status && newData.Status == 'G'){
    execReportData[newData.OID] = newData;
    return;
  };

  //Cancelled
  if ((old.LeaveQty > 0) && (newData.LeaveQty == 0) && (old.CumQty == newData.CumQty)) {
    execReportData[newData.OID] = newData;
    return;
  };

  //Replaced
  if ((newData.LeaveQty != old.LeaveQty && newData.CumQty == old.CumQty) || newData.Price != old.Price || newData.StopPrice != old.StopPrice){
    execReportData[newData.OID] = newData;
    return;
  };

  //Filled
  if (newData.LeaveQty == 0 && newData.CumQty > old.CumQty) {
     message.success(<FormattedMessage id='quantum_buy_sell_success'/>, 20);
     execReportData[newData.OID] = newData;
    return;
  };

  // PartiallyFilled
  if (newData.LeaveQty > 0 && newData.CumQty > old.CumQty){
    // if ($('#audio-execution').length !== 0) {
    //   $('#audio-execution')[0].play();
    // }
    execReportData[newData.OID] = newData;
    return;
  };
};

const initialState = new (FeedbackState);

const errorMessage = (code: number) => {
  switch (code) {
    case 109:
      message.error("下单失败，未开放交易");
      break;
    case 110:
      message.error("资金不足");
      break;
    case 13:
      message.error("数量错误");
      break;
    default:
      message.error("下单失败");
      break;
  }
}

export default function feedbackReducer(state: FeedbackState = initialState, action: FeedbackAction) {
  switch (action.type) {
    case 'place order response':
      if (action.payload.RC === '0') {
        message.success('下单成功');
        return state;
      } else {
        errorMessage(action.payload.OrdRejReason)
        return state;
      };
      break;
    case 'cancel order response':
      if (action.payload.RC === '0') {
        message.success("取消成功");
        return state;
      }else {
        errorMessage(action.payload.CxlRejReason)
        return state;
      }
      break;
    case 'cancel replace order response':
      if (action.payload.RC === '0') {
        message.success("替换成功");
        return state;
      }else {
        errorMessage(action.payload.CxlRejReason)
        return state;
      }
      break;
    case 'exec report order response':
      dealExecReportResponse(action.payload);
      return state;
      case 'exec report order response array':
      action.payload.forEach((report: any) => {
          execReportData[report.OID] = report;
      });
      return state;
    default:
      return state;
  }
}
