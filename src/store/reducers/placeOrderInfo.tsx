import * as Immutable from 'immutable';
import { Map } from 'immutable';
import * as _ from 'lodash';

export class IPlaceOrderInfo extends Immutable.Record({
    buyQuantity: '',
    sellQuantity: '',
    buyPrice: '',
    sellPrice: '',
    buyStopPrice: '',
    sellStopPrice: '',
    buyTotal: '',
    sellTotal: '',
}) {
    readonly buyQuantity: string;
    readonly sellQuantity: string;
    readonly buyPrice: string;
    readonly sellPrice: string;
    readonly buyStopPrice: string;
    readonly sellStopPrice: string;
    readonly buyTotal: string;
    readonly sellTotal: string;
}


export interface IPlaceOrderInfoAction {
    payload: any;
    type: string;
};

const initialState = new(IPlaceOrderInfo);

export default function placeOrderInfo(state: IPlaceOrderInfo = initialState, action: IPlaceOrderInfoAction): any {
    switch (action.type) {
        case 'update buy quantity':
          return state.update('buyQuantity', v => action.payload);
        case 'update sell quantity':
          return state.update('sellQuantity', v => action.payload);
        case 'update buy price':
          return state.update('buyPrice', v => action.payload);
        case 'update sell price':
          return state.update('sellPrice', v => action.payload);
        case 'update buy stop price':
          return state.update('buyStopPrice', v => action.payload);
        case 'update sell stop price':
          return state.update('sellStopPrice', v => action.payload);
        case 'update buy total':
          return state.update('buyTotal', v => action.payload);
        case 'update sell total':
          return state.update('sellTotal', v => action.payload);
        case 'clear place order info':
          return Map({
            buyQuantity: '',
            sellQuantity: '',
            buyPrice: '',
            sellPrice: '',
            buyStopPrice: '',
            sellStopPrice: '',
            buyTotal: '',
            sellTotal: '',
          });
        case 'clear account info':
          return Map({
            buyQuantity: '',
            sellQuantity: '',
            buyPrice: '',
            sellPrice: '',
            buyStopPrice: '',
            sellStopPrice: '',
            buyTotal: '',
            sellTotal: '',
          });
        default:
            return state;
    }
}
