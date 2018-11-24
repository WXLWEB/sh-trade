import * as Immutable from 'immutable';

export class ITicker extends Immutable.Record({
    LastPrice: 0,
    AskPrice: 0,
    BidPrice: 0,
    High: 0,
    Low: 0,
    Volume24H: 0,
    Change: 0,
    Percent: 0,
}) {
    readonly LastPrice: number;
    readonly AskPrice: number;
    readonly BidPrice: number;
    readonly Change: number;
}


export interface ITickerAction {
    payload: {
            readonly Last: number;
            readonly High: number;
            readonly Low: number;
            readonly Volume24H: number;
            readonly PrevCls: number;
            readonly AskPrice: number;
            readonly BidPrice: number;
    };
    type: string;
};

const initialState = new(ITicker);

export default function ticker(state: ITicker = initialState, action: ITickerAction): any {
    switch (action.type) {
        case 'get symbol ticker':
            return state.update('AskPrice', v => action.payload.AskPrice)
                        .update('BidPrice', v => action.payload.BidPrice)
                        .update('High', v => action.payload.High)
                        .update('Low', v => action.payload.Low)
                        .update('LastPrice', v => action.payload.Last)
                        .update('Volume24H', v => action.payload.Volume24H)
                        .update('Change', v => action.payload.Last - action.payload.PrevCls)
                        .update('Percent', v => (action.payload.Last - action.payload.PrevCls) / action.payload.PrevCls * 100);
        case 'get bpi ticker':
            return state.update('LastPrice', v => action.payload.Last);
        default:
            return state;
    }
}
