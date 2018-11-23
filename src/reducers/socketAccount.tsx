import { ISocket } from '../constants/ReducerType';
import { ISocketAction } from '../constants/ActionType';

 const initialState = {
   AccountInfo: {},
 };

 export default function SocketAccount(state:  any= initialState, action: ISocketAction): ISocket {
   switch (action.type) {
     case 'get accountinfo response':
       state.AccountInfo = action.payload;
       return state;
     default:
       return state;
   }
 }
