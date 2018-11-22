import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import './index.less';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './app/store/configureStore';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
     <Router history={history}>
        <Route path='/' component={App} >
          <IndexRoute  component={ETHTRADE}/>
          <Route path='eth_trade'  component={ETHTRADE} />
          <Route path='bcc_trade'  component={BCCTRADE} />
        </Route>
        <Route path='fullscreen' component={FullScreen}>
          <IndexRoute component={ETHTRADEFullScreen}/>
          <Route path='eth_trade'  component={ETHTRADEFullScreen} />
          <Route path='bcc_trade'  component={BCCTRADEFullScreen} />
        </Route>
        <Route path='/eth_chart' component={ETHSOSOChart} />
        <Route path='/bcc_chart' component={BCCSOSOChart} />
        <Route path='/eth_chart_v1' component={ETHChart} />
     </Router>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
