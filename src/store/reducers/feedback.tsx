import { Map } from 'immutable';
import * as Immutable from 'immutable';
import * as _ from 'lodash';

let execReportData = {};

export interface IFeedbackAction {
    payload: {
        RC: string;
        OrdRejReason: number;
        CxlRejReason: number;
    };
    type: string;
};

export class IFeedback extends Immutable.Record({
    execReportData: {},
    tipSuccess: false,
    tipFailed: false,
    backSuccess: false,
    successReason: Immutable.Map({
      palced: false,
      replaced: false,
      canceled: false,
    }),
    backFailed: false,
    error: false,
    failedReason: Immutable.Map({
        maxPositionReach: false,
        insufficient: false,
        incorrectQuantity: false,
        otherError: false,
        TooManyActiveQuotes: false,
        ActiveQuoteStands: false,
        InvalidSymbol: false,
        NoActiveQuote: false,
    }),
}) {
    tipSuccess: boolean;
    tipFailed: boolean;
    backSuccess: boolean;
    successReason: any;
    backFailed: boolean;
    error: boolean;
    failedReason: any;
}

const dealExecReportResponse = (newData) => {
  console.log('oldData:', execReportData);
  console.log('newData:', newData);
  const old = execReportData[newData.OID];

  // New Order Placed
  if(_.isUndefined(old) && newData.Status == 'A'){
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
    // if($('#audio-execution').length !== 0) {
    //    $('#audio-execution')[0].play();
    //  }
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

const initialState = new (IFeedback);

export default function feedback(state: IFeedback = initialState, action: IFeedbackAction) {
  switch (action.type) {
    case 'place order response':
      if (action.payload.RC === '0') {
        const successReason = {
          palced: true,
          replaced: false,
          canceled: false,
        };
        return state.update('tipSuccess', v => true).update('successReason', v => Map(successReason)).update('backSuccess', v => true);
      } else {
        let newState;
        switch (action.payload.OrdRejReason) {
          case 109:
            newState = state.update('failedReason', v => v.set('maxPositionReach', true));
            break;
          case 110:
            newState = state.update('failedReason', v => v.set('insufficient', true));
            break;
          case 13:
            newState = state.update('failedReason', v => v.set('incorrectQuantity', true));
            break;
          default:
            newState = state.update('failedReason', v => v.set('otherError', true));
            break;
        }
        // if ($('#audio-failed').length !== 0 ) {
        //   $('#audio-failed')[0].play();
        // }
        return newState.update('tipFailed', v => true)
        .update('backFailed', v => true);
      };
      break;
    case 'cancel order response':
      if (action.payload.RC === '0') {
        const successReason = {
          palced: false,
          replaced: false,
          canceled: true,
        };
        return state.update('tipSuccess', v => true).update('successReason', v => Map(successReason)).update('backSuccess', v => true);
      }else {
        let newState;
        switch (action.payload.CxlRejReason) {
          case 110:
            newState = state.update('failedReason', v => v.set('insufficient', true));
            break;
          case 13:
            newState = state.update('failedReason', v => v.set('incorrectQuantity', true));
            break;
          default:
            newState = state.update('failedReason', v => v.set('otherError', true));
            break;
        }
        // if ($('#audio-failed').length !== 0 ) {
        //   $('#audio-failed')[0].play();
        // }
        return newState.update('tipFailed', v => true)
        .update('backFailed', v => true);
      }
      break;
    case 'cancel replace order response':
      if (action.payload.RC === '0') {
        const successReason = {
          palced: false,
          replaced: true,
          canceled: false,
        };
        return state.update('tipSuccess', v => true).update('successReason', v => Map(successReason)).update('backSuccess', v => true);
      }else {
        let newState;
        switch (action.payload.CxlRejReason) {
          case 110:
            newState = state.update('failedReason', v => v.set('insufficient', true));
            break;
          case 13:
            newState = state.update('failedReason', v => v.set('incorrectQuantity', true));
            break;
          default:
            newState = state.update('failedReason', v => v.set('otherError', true));
            break;
        }
        return newState.update('tipFailed', v => true)
        .update('backFailed', v => true);
      }
      break;
    case 'reset feedback tips':
      return state.update('tipSuccess', v => false).update('tipFailed', v => false);
    case 'reset feedback back':
      return state.update('backSuccess', v => false)
      .update('successReason', v => Map({
        palced: false,
        replaced: false,
        canceled: false,
      }))
      .update('backFailed', v => false)
      .update('failedReason', v => Map({
        maxPositionReach: false,
        insufficient: false,
        incorrectQuantity: false,
        otherError: false,
        TooManyActiveQuotes: false,
        ActiveQuoteStands: false,
        InvalidSymbol: false,
        NoActiveQuote: false,
      }));
    case 'set error to true':
      return state.update('error', v => true);
    case 'set error to false':
      return state.update('error', v => false);
    case 'exec report order response':
      dealExecReportResponse(action.payload);
      return state;
    // case 'exec report order response array':
    //   action.payload.forEach(report => {
    //       execReportData[report.OID] = report;
    //   });
    //   return state;
    default:
      return state;
  }
}
