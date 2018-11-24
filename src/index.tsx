import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '@/views/App';
import ConnectedIntlProvider from '@/components/ConnectedIntlProvider/index';
import registerServiceWorker from '@/registerServiceWorker';
import configureStore from '@/store/configureStore';
import '@/index.less';

const store = configureStore({});
// const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute  component={App}/>
        </Route>
      </Router>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
