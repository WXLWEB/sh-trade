import * as Immutable from 'immutable';
import { List } from 'immutable';
import * as _ from 'lodash';
export class IRetrieveTransactionsResponse extends Immutable.Record({
    History: Immutable.List([{ 'Time': '-', 'Symbol': '-', 'Type': '-', 'Side': '-', 'Quantity': '-', 'Price': '-', 'Status': '-', 'CY': '-'}]),
    TotalCount: 0,
}) {
    History: Immutable.List<>;
}


export interface IRetrieveTransactionsResponseAction {
    payload: {

    };
};

const initialState = new(IRetrieveTransactionsResponse);

const dealExecutionsOrder = (report) => {
  return {
    'Time': report.Timestamp,
    'Symbol': report.Symbol,
    'Type': report.OrderType,
    'Price': report.Price,
    'Quantity': report.CumQty,
    'Side': report.Side,
    'Type': report.OrderType,
    'Maker': report.maker !== 0 ? report.maker : '-',
    'Taker': report.taker !== 0 ? report.taker : '-',
    'Status': report.Status,
  };
};

const getFeeDetail = (exec) => {
    if (_.isEmpty(exec.TradeFeeLogs)) {
      exec.taker = '-';
      exec.maker = '-';
      return exec;
    }
    const taker = _.sumBy(_.filter(exec.TradeFeeLogs, _.matches({FeeSubType: 'Taker'})), 'FeeTotal');
    const maker = _.sumBy(_.filter(exec.TradeFeeLogs, _.matches({FeeSubType: 'Maker'})), 'FeeTotal');
    exec.taker = taker;
    exec.maker = maker;
    return exec;
};

export default function retrieveTransactionsResponse(state: IRetrieveTransactionsResponse = initialState, action: IRetrieveTransactionsResponseAction): any {
    switch (action.type) {
        case 'retrieve transactions response':
          if (_.isEmpty(action.payload.Orders)) {
            return state.set('History', Immutable.List([{ 'Time': '-', 'Symbol': '-', 'Type': '-',  'Price': '-', 'Quantity': '-', 'Side': '-', 'Maker': '-', 'Taker': '-', 'Status': '-', 'CY': '-'}]))
                        .set('TotalCount', 0);
          }
          const reports = action.payload.Orders.map((obj) => {
            return getFeeDetail(obj);
          });
          const history = _.filter(reports, function(obj: Object) {
            return {Symbol: Symbol};
          }).map((obj) => {
            return dealExecutionsOrder(obj);
          });
          return state.set('History', List(history))
                      .set('TotalCount', action.payload.TotalCount);
        case 'clear account info':
          return state.set('History', Immutable.List([{ 'Time': '-', 'Symbol': '-', 'Type': '-', 'Price': '-', 'Quantity': '-', 'Side': '-', 'Maker': '-', 'Taker': '-', 'Status': '-', 'CY': '-'}]))
                      .set('TotalCount', 0);
        default:
            return state;
    }
}
