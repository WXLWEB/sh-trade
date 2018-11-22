import * as Immutable from 'immutable';
import * as _ from 'lodash';
export class IChartData extends Immutable.Record({
    AskData: [],
    BidData: [],
    Ask: [],
    Bid: [],
}) {
    readonly AskData: array;
    readonly BidData: array;
    readonly Ask: array;
    readonly Bid: array;
}


export interface IChartDataAction {
    payload: [{
            timestamp: number;
            askprice: number;
            bidprice: number;
          }];
    type: string;
};

const initialState = new(IChartData);

const getChartArray = (data: array, type : string) => {
  return data.map(arr => {
    switch (type) {
      case 'ask':
      return [JSON.parse(arr[0]) + 1000 * 60 * 60 * 8, JSON.parse(arr[1])];
      case 'bid':
      return [JSON.parse(arr[0]) + 1000 * 60 * 60 * 8, JSON.parse(arr[2])];
    }
  });
};

export default function chartData(state: IChartData = initialState, action: IChartDataAction): any {
    _.remove(action.payload, function(n: array){
        return _.isNull(n);
    });
    switch (action.type) {
        case 'get chart data success':
          if ( !_.isEmpty(action.payload)) {
            const newState = state.update('AskData', v => v.concat(getChartArray(action.payload, 'ask')))
            .update('BidData',  v => v.concat(getChartArray(action.payload, 'bid')));
            return newState;
          }
          break;
        case 'get increase chart data success':
          if ( !_.isEmpty(action.payload)) {
            return state.update('Ask', v => getChartArray(action.payload, 'ask'))
                        .update('Bid',  v => getChartArray(action.payload, 'bid'));
          }
          return state;
          break;
        default:
            return state;
    }
}
