import { Map, List, Record } from 'immutable';
import isEmpty from 'lodash.isempty';
import sumBy from 'lodash.sumby';
import sum from 'lodash.sum';
import get from 'lodash.get';
import last from 'lodash.last';
import orderBy from 'lodash.orderby';
import isUndefined from 'lodash.isundefined';
import { accSub, accMul } from '@/utils/calculate';

export interface ExecReportResponseAction {
    payload: {
        RC: string;
    };
    type: string;
};

export class ExecReportResponseState extends Record({
    newPosition: false,
    pendingOrders: List([{ 'Time': '-', 'Symbol': '-', 'CumQty': '-', 'Total': '-', 'Price': '-', 'Type': '-', 'Side': '-', 'OID': '-'}]),
    pendingSort: Map({key: 'Time', order: 'desc'}),
    OCOPendingOrders: List([]),
    closedOrders: List([{ 'Time': '-', 'Symbol': '-', 'Type': '-', 'Side': '-', 'Quantity': '-', 'AvgPrice': '-', 'Status': '-'}]),
    closedSort: Map({key: 'Time', order: 'desc'}),
    positionDetails: List([{ 'Time': '-', 'Positions': '-', 'Price': '-', 'Profit': '-'}]),
    positionSort: Map({key: 'Time', order: 'desc'}),
    oldExecReportData: List([]),
}) {
    newPosition: boolean;
    pendingSort: Map<>;
    pendingOrders: List<>;
    OCOPendingOrders: List<>;
    closedOrders: List<>;
    closedSort: Map<>;
    positionDetails: List<>;
    oldExecReportData: List<>;
}

const initialState = new (ExecReportResponseState);
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
    'AvgPrice': report.UserAveragePrice,
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
  if ( isEmpty(exec.ExecutionDetails)) {
    return exec.Price;
  }
  const orderQuantity = sumBy(exec.ExecutionDetails, 'TotalQuantity');
  const averagePerExec = exec.ExecutionDetails.map(detail => {
    const weight = detail.TotalQuantity / orderQuantity;
    return weight * detail.Price;
  });
  const UserAveragePrice = sum(averagePerExec);
  return UserAveragePrice;
};

const getExecutionTimeStamp = (exec) => {
  const details = get(exec, 'ExecutionDetails', []);
  if ( isEmpty(details)) {
    return exec.Timestamp;
  }else {
    const ExecutionTimeStamp = get(last(details), 'Timestamp');
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
      newState = newState.update('pendingOrders', v =>  List(orderBy(pendingObj.toList().toJSON(), [state.get('pendingSort').get('key')], [state.get('pendingSort').get('order')])));
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
        newState = newState.update('pendingOrders', v =>  List(orderBy(pendingObj.toList().toJSON(), [state.get('pendingSort').get('key')], [state.get('pendingSort').get('order')])));
      }
    }
  }

  if (report.Status === '3' || report.Status === 'S' || report.Status === '4') {
    report.ExecutionTimeStamp =  getExecutionTimeStamp(report);
    report.UserAveragePrice = getUserAveragePrice(report);
    closedObj  = closedObj.set(report.OID, dealExecutionsOrder(report));
    if (closedObj.size === 0) {
      newState = newState.update('closedOrders', v => List([{ 'Time': '-', 'Symbol': '-', 'Type': '-', 'Side': '-', 'Quantity': '-', 'AvgPrice': '-', 'Status': '-'}]));
    }else {
      newState = newState.update('closedOrders', v => List(orderBy(closedObj.toList().toJSON(), [state.get('closedSort').get('key')], [state.get('closedSort').get('order')])));
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
          newState = newState.update('positionDetails', v => List(orderBy(positionObj.toList().toJSON(), [state.get('positionSort').get('key')], [state.get('positionSort').get('order')])));
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


export default function execReportResponseReducer(state: ExecReportResponseState = initialState, action: ExecReportResponseAction) {
  switch (action.type) {
    case 'exec report order response array':
      action.payload.forEach(report => {
          newState = dealExecReport(state, report);
      });
      if (isUndefined(newState)) {
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
      return state.update('pendingOrders', v => List(orderBy(state.get('pendingOrders').toJSON(), [action.payload.key], [action.payload.order])))
                  .update('pendingSort', v => Map({key: action.payload.key, order: action.payload.order}));
    case 'order closed orders':
      return state.update('closedOrders', v => List(orderBy(state.get('closedOrders').toJSON(), [action.payload.key], [action.payload.order])))
                  .update('closedSort', v => Map({key: action.payload.key, order: action.payload.order}));
    case 'order position orders':
      return state.update('positionDetails', v => List(orderBy(state.get('positionDetails').toJSON(), [action.payload.key], [action.payload.order])))
                  .update('positionSort', v => Map({key: action.payload.key, order: action.payload.order}));
    case 'clear account info':
      newState = initialState;
      pendingObj = Map();
      closedObj = Map();
      positionObj = Map();
      return Map({
        newPosition: false,
        pendingOrders: List([{ 'Time': '-', 'Symbol': '-', 'CumQty': '-',  'Total': '-', 'Price': '-', 'Type': '-', 'Side': '-', 'OID': '-'}]),
        pendingSort: Map({key: 'Time', order: 'desc'}),
        OCOPendingOrders: List([]),
        closedOrders: List([{ 'Time': '-',  'Symbol': '-', 'Type': '-', 'Side': '-', 'Quantity': '-', 'AvgPrice': '-', 'Status': '-'}]),
        closedSort: Map({key: 'Time', order: 'desc'}),
        positionDetails: List([{ 'Time': '-', 'Positions': '-', 'Price': '-', 'Profit': '-'}]),
        positionSort: Map({key: 'Time', order: 'desc'}),
        oldExecReportData: List([]),
      });
    default:
      return state;
  }
}
