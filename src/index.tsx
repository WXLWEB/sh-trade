import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import App from '@/views/App';
import ConnectedIntlProvider from '@/components/ConnectedIntlProvider/index';
import registerServiceWorker from '@/registerServiceWorker';
import configureStore from '@/store/configureStore';
import '@/index.less';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
     <Router history={history}>
        <Route path='/' component={App} />
     </Router>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
