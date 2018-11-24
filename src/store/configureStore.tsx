import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from './middleware/logger';
import { rootReducer, RootState } from './reducers';
import sagaManager from './sagas/sagaManager';
import socketMiddleware from './middleware/socketMiddleware';

// declare var module: any;

export default function configureStore(initialState: any) {
  const create = (window as any).devToolsExtension ? (window as any).devToolsExtension()(createStore) : createStore;
  const sagaMiddleware = createSagaMiddleware();
  const createStoreWithMiddleware = applyMiddleware(logger, sagaMiddleware, socketMiddleware)(create);

  const store = createStoreWithMiddleware(rootReducer, initialState);
  sagaManager.startSagas(sagaMiddleware);
  // if (module.hot) {
  //   // enable Webpack hot module replacement for reducers
  //   module.hot.accept('@/store/reducers', () => {
  //     const nextReducer = rootReducer;
  //     store.replaceReducer(nextReducer);
  //   });
  // }
  return store;
}
