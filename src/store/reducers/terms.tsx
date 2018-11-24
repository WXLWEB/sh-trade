import { Map } from 'immutable';
import * as Immutable from 'immutable';

export interface ITermsAction {
    payload: {
        account_key: string,
        id: number,
    };
    type: string;
};

export class ITerms extends Immutable.Record({
  agree: true,
  close: true,
  loading: false,
  success: false,
  error: false,
  content: null,
}) {
  agree: boolean;
  close: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
  content: any;
}


const initialState = new (ITerms);

export default function terms(state: ITerms = initialState, action: ITermsAction): any {
    switch (action.type) {
        case 'has agree term service':
            return state.update('agree', v => true);
        case 'not agree term service':
            return state.update('agree', v => false).update('close', v => false).update('error', v => false);
        case 'agree terms requested':
            return state.update('loading', v => true).update('error', v => false);
        case 'agreed terms service success':
            return state.update('loading', v => false).update('agree', v => true).update('error', v => false).update('success', v => true);
        case 'agree terms service failed':
            return state.update('loading', v => false).update('agree', v => false).update('error', v => true);
        case 'close terms popup':
            return state.update('close', v => true);
        case 'open terms popup':
            return state.update('close', v => false);
        case 'logout requested':
            return state.set('success', false)
                    .set('error', false);
        case 'get terms content success':
            return state.set('content', action.payload);
        default:
            return state;
    }
}
