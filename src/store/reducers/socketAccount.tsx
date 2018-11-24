import * as Immutable from 'immutable';
import { Map } from 'immutable';

 export class ISocketAccount extends Immutable.Record({
     AccountInfo: {},
 }) {
    AccountInfo: any
 }

 export interface ISocketAccountAction {
     payload: any;
     type: string;
 };

 const initialState = {
   AccountInfo: {},
 };

 export default function SocketAccount(state: any= initialState, action: ISocketAccountAction): ISocketAccount {
   switch (action.type) {
     case 'get accountinfo response':
       return state.set('AccountInfo', action.payload);
     default:
       return state;
   }
 }
