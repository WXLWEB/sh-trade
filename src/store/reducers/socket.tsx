import * as Immutable from 'immutable';

 export class SocketState extends Immutable.Record({
     status: 3,
 }){
   status: number;
 }


 export interface SocketAction {
     payload: {};
     type: string;
 };

 const initialState = new(SocketState);

 export default function Socket(state: any= initialState, action: SocketAction) {
   switch (action.type) {
     case 'connecting':
       return state.set('status', 0);
     case 'socket connected':
       return state.set('status', 1);
     case 'close socket':
       return state.set('status', 2);
     case 'disconnected':
       return state.set('status', 3);
     default:
       return state;
   }
 }
