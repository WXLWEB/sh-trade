import { Map, List } from 'immutable';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { accSub, accMul } from '../utils/calculate';

export interface IExecReportResponseAction {
    payload: {
        RC: string;
    };
    type: string;
};

export class IExecReportResponse extends Immutable.Record({
    newPosition: false,
    pendingOrders: Immutable.List([{ 'Time': '-', 'Symbol': '-', 'CumQty': '-', 'Total': '-', 'Price': '-', 'Type': '-', 'Side': '-', 'OID': '-'}]),
    pendingSort: Immutable.Map({key: 'Time', order: 'desc'}),
    OCOPendingOrders: Immutable.List([]),
    closedOrders: Immutable.List([{ 'Time': '-', 'Symbol': '-', 'Type': '-', 'Side': '-', 'Quantity': '-', 'Avg.Price': '-', 'Status': '-'}]),
    closedSort: Immutable.Map({key: 'Time', order: 'desc'}),
    positionDetails: Immutable.List([{ 'Time': '-', 'Positions': '-', 'Price': '-', 'Profit': '-'}]),
    positionSort: Immutable.Map({key: 'Time', order: 'desc'}),
    oldExecReportData: Immutable.List([]),
}) {
    newPosition: boolean;
    pendingSort: Immutable.Map<>;
    pendingOrders: Immutable.List<>;
    OCOPendingOrders: Immutable.List<>;
    closedOrders: Immutable.List<>;
    closedSort: Immutable.Map<>;
    positionDetails: Immutable.List<>;
    oldExecReportData: Immutable.List<>;
}

const initialState = new (IExecReportResponse);
const newState = initialState;
const pendingObj = Map();
const closedObj = Map();
const positionObj = Map();

let Ticker = {
  AskPrice: '-',
  BidPrice: '-',
};

const dealPendingOrder = (report) => {
  return {
    'Time': report.Timestamp,
    'Symbol': report.Symbol,
    'CumQty': report.CumQty,
    'Total': report.CumQty + report.LeaveQty,
    'Price': report.OrderType === '2' ? report.Price : report.StopPrice,
    'Type': report.OrderType,
    'Side': report.Side,
    'OID': report.OID,
  };
};

const dealExecutionsOrder = (report) => {
  return {
    'Time': report.ExecutionTimeStamp,
    'Symbol': report.Symbol,
    'Type': report.OrderType,
    'Side': report.Side,
    'Quantity': report.CumQty,
    'Avg.Price': report.UserAveragePrice,
    'Type': report.OrderType,
    'Status': report.Status,
  };
};

const dealPositionsOrder = (order) => {
  return {
    'Time': order.Timestamp,
    'Positions': order.OpenPosition,
    'Price': order.Price,
    'Profit': order.totalProfit,
  };
};

const getUserAveragePrice = (exec) => {
  if ( _.isEmpty(exec.ExecutionDetails)) {
    return exec.Price;
  }
  const orderQuantity = _.sumBy(exec.ExecutionDetails, 'TotalQuantity');
  const averagePerExec = exec.ExecutionDetails.map(detail => {
    const weight = detail.TotalQuantity / orderQuantity;
    return weight * detail.Price;
  });
  const UserAveragePrice = _.sum(averagePerExec);
  return UserAveragePrice;
};

const getExecutionTimeStamp = (exec) => {
  const details = _.get(exec, 'ExecutionDetails', []);
  if ( _.isEmpty(details)) {
    return exec.Timestamp;
  }else {
    const ExecutionTimeStamp = _.get(_.last(details), 'Timestamp');
    return ExecutionTimeStamp;
  }
};

const calculateProfit = (Ticker, orderPrice, side, position) => {
  position = Math.abs(position);
  const p1 = side === '1' ? accSub(Ticker.BidPrice, orderPrice) : accSub(orderPrice, Ticker.AskPrice) ;
  const profit = accMul(p1, position);
  return profit;
};

const dealExecReport = (state, report) => {
  if (report.LeaveQty > 0) {
    if (report.OrderType === 'Z') {
      pendingObj = pendingObj.set(report.OID, dealPendingOrder(report));
      newState = newState.update('OCOPendingOrders', v =>  pendingObj.toList());
    }else {
      pendingObj = pendingObj.set(report.OID, dealPendingOrder(report));
      newState = newState.update('pendingOrders', v =>  List(_.orderBy(pendingObj.toList().toJSON(), [state.get('pendingSort').get('key')], [state.get('pendingSort').get('order')])));
    }
  }

  if (report.LeaveQty <= 0) {
    if (report.OrderType === 'Z') {
      pendingObj = pendingObj.delete(report.OID);
      newState = newState.update('OCOPendingOrders', v =>  pendingObj.toList());
    }else {
      pendingObj = pendingObj.delete(report.OID);
      if (pendingObj.size === 0 ) {
        newState = newState.update('pendingOrders', v =>  List([{ 'Time': '-', 'Symbol': '-', 'CumQty': '-', 'Total': '-', 'Price': '-', 'Type': '-', 'Side': '-', 'OID': '-'}]));
      }else {
        newState = newState.update('pendingOrders', v =>  List(_.orderBy(pendingObj.toList().toJSON(), [state.get('pendingSort').get('key')], [state.get('pendingSort').get('order')])));
      }
    }
  }

  if (report.Status === '3' || report.Status === 'S' || report.Status === '4') {
    report.ExecutionTimeStamp =  getExecutionTimeStamp(report);
    report.UserAveragePrice = getUserAveragePrice(report);
    closedObj  = closedObj.set(report.OID, dealExecutionsOrder(report));
    if (closedObj.size === 0) {
      newState = newState.update('closedOrders', v => List([{ 'Time': '-', 'Symbol': '-', 'Type': '-', 'Side': '-', 'Quantity': '-', 'Avg.Price': '-', 'Status': '-'}]));
    }else {
      newState = newState.update('closedOrders', v => List(_.orderBy(closedObj.toList().toJSON(), [state.get('closedSort').get('key')], [state.get('closedSort').get('order')])));
    }
  }

  if (report.ExecutionDetails.length > 0) {
    report.ExecutionDetails.forEach((o, index) => {
      if (o.OpenedQuantity !== 0) {
        o.Symbol = report.Symbol;
        o.Side = report.Side;
        o.OpenPosition = (report.Side === '1') ? o.OpenedQuantity : -o.OpenedQuantity;
        o.totalProfit = calculateProfit(Ticker, o.Price, o.Side, o.OpenedQuantity);
        positionObj  = positionObj.set(report.OID, dealPositionsOrder(o));
        newState = newState.update('positionDetails', v => positionObj.toList());
      }else {
        positionObj = positionObj.delete(report.OID);
        if (positionObj.size === 0) {
          newState = newState.update('positionDetails', v => List([{ 'Time': '-', 'Positions': '-', 'Price': '-', 'Profit': '-'}]));
        }else {
          newState = newState.update('positionDetails', v => List(_.orderBy(positionObj.toList().toJSON(), [state.get('positionSort').get('key')], [state.get('positionSort').get('order')])));
        }
      }
    });
  }

  return newState;
};

const updatePositionsProfit = (state, Ticker) => {
  return state.get('positionDetails').map(o => {
      const side = o.Positions > 0 ? '1' : '2';
      o.Profit = calculateProfit(Ticker, o.Price, side, o.Positions);
      return o;
   });
};


export default function execReportResponse(state: IExecReportResponse = initialState, action: IExecReportResponseAction) {
  switch (action.type) {
    case 'exec report order response array':
      action.payload.forEach(report => {
          newState = dealExecReport(state, report);
      });
      if (_.isUndefined(newState)) {
        return state;
      }
      return newState;
    case 'exec report order response':
        newState = dealExecReport(state, action.payload);
      return newState;
    case 'get symbol ticker':
      if ((Ticker.AskPrice !== action.payload.AskPrice || Ticker.BidPrice !== action.payload.BidPrice)) {
        Ticker.AskPrice = action.payload.AskPrice;
        Ticker.BidPrice = action.payload.BidPrice;
        const time = state.get('positionDetails').get(0).Time;
        if (time !== '-') {
          return state.update('positionDetails', v => updatePositionsProfit(state, Ticker));
        }else {
          return state;
        }
      }else {
         return state;
      }
      break;
    case 'order pending orders':
      return state.update('pendingOrders', v => List(_.orderBy(state.get('pendingOrders').toJSON(), [action.payload.key], [action.payload.order])))
                  .update('pendingSort', v => Map({key: action.payload.key, order: action.payload.order}));
    case 'order closed orders':
      return state.update('closedOrders', v => List(_.orderBy(state.get('closedOrders').toJSON(), [action.payload.key], [action.payload.order])))
                  .update('closedSort', v => Map({key: action.payload.key, order: action.payload.order}));
    case 'order position orders':
      return state.update('positionDetails', v => List(_.orderBy(state.get('positionDetails').toJSON(), [action.payload.key], [action.payload.order])))
                  .update('positionSort', v => Map({key: action.payload.key, order: action.payload.order}));
    case 'clear account info':
      newState = initialState;
      pendingObj = Map();
      closedObj = Map();
      positionObj = Map();
      return Map({
        newPosition: false,
        pendingOrders: Immutable.List([{ 'Time': '-', 'Symbol': '-', 'CumQty': '-',  'Total': '-', 'Price': '-', 'Type': '-', 'Side': '-', 'OID': '-'}]),
        pendingSort: Immutable.Map({key: 'Time', order: 'desc'}),
        OCOPendingOrders: Immutable.List([]),
        closedOrders: Immutable.List([{ 'Time': '-',  'Symbol': '-', 'Type': '-', 'Side': '-', 'Quantity': '-', 'Avg.Price': '-', 'Status': '-'}]),
        closedSort: Immutable.Map({key: 'Time', order: 'desc'}),
        positionDetails: Immutable.List([{ 'Time': '-', 'Positions': '-', 'Price': '-', 'Profit': '-'}]),
        positionSort: Immutable.Map({key: 'Time', order: 'desc'}),
        oldExecReportData: Immutable.List([]),
      });
    default:
      return state;
  }
}
