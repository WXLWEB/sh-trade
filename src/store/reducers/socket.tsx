import * as Immutable from 'immutable';
import { Map } from 'immutable';

 export class ISocket extends Immutable.Record({
     status: 3,
 }) {
     status: number;
 }

 export interface ISocketAction {
     payload: {};
     type: string;
 };

 const initialState = new(ISocket);

 export default function Socket(state: any= initialState, action: ISocketAction): ISocket {
   switch (action.type) {
     case 'connecting':
       return state.update('status', v => 0);
     case 'socket connected':
       return state.update('status', v => 1);
     case 'close socket':
       return state.update('status', v => 2);
     case 'disconnected':
       return state.update('status', v => 3);
     default:
       return state;
   }
 }
