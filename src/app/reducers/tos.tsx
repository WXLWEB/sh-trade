import { ITos } from '../constants/ReducerType';
import { ITosAction } from '../constants/ActionType';

const initialState = new(ITos);

export default function tos(state: ITos = initialState, action: ITosAction): any {
    switch (action.type) {
        case 'get tos success':
            return state.update('content', v => action.payload);
        case 'get tos failed':
            return state;
        default:
            return state;
    }
}
