import * as Immutable from 'immutable';
import { Map } from 'immutable';

 export class ISocket extends Immutable.Record({
     status: 3,
 }) {
     connected: boolean;
 }

 export interface ISocketAction {
     payload: {};
     type: string;
 };

 const initialState = new(ISocket);

 export default function Socket(state: any= initialState, action: ISocketAction): ISocket {
   switch (action.type) {
     case 'connecting':
       return Map({
         status: 0,
       });
     case 'socket connected':
       return Map({
         status: 1,
       });
    case 'close socket':
      return Map({
        status: 2,
      });
     case 'disconnected':
       return Map({
         status: 3,
       });
     default:
       return state;
   }
 }
