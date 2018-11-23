import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { reactLocalStorage } from 'reactjs-localstorage';

export class ILocalStorage extends Immutable.Record({
  sound: false,
}) {
  readonly sound: boolean;
};

export interface ILocalStorageAction {
    payload: {
      readonly sound: boolean;
    };
};

const initialState = new(ILocalStorage);

export default function localStorage(state: ILocalStorage = initialState, action: ILocalStorageAction): any {
    switch (action.type) {
        case 'get local storage':
          const local = reactLocalStorage.getObject(`${action.payload}-btcchina`);
          console.log('getLocalStorage', local);
           if (_.isEmpty(local)) {
             reactLocalStorage.setObject(`${action.payload}-btcchina`,
               {
                 sound: false,
               }
             );
             return state.update('sound', v => false);
           };
           return state.update('sound', v => local.sound);
        case 'set sound local storage':
          reactLocalStorage.setObject(`${Symbol}-btcchina`, {sound : action.payload});
          return state.update('sound', v => action.payload);
        default:
            return state;
    }
}
