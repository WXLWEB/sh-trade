import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Header from '@/components/Header';
import * as SocketActions from '@/store/actions/socket';
import * as AuthActions from '@/store/actions/auth';
import * as RequestActions from '@/store/actions/request';
import global from  '@/constants/config'
import Assets from './Assets';
import Chart from './Chart';
import TimeSales from './TimeSales';
import Orderbook from './Orderbook';
import Trade from './Trade';
import History from './History';
import Introduce from './Introduce';
import LoginForm from './LoginForm';
import './App.less';

export interface IAppProps {
  readonly lang: any;
  readonly location: string;
  readonly auth: any;
  readonly account: any;
  readonly routeParams: any;
  readonly socket: any;
  readonly actions: any;
};
export interface IAppState {
  visible: boolean;
  offline: boolean;
};
let requestSend = true;
let requestSendAccount = true;
class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      visible: false,
      offline: false,
    }
  };

  protected logout = () => {
    const { actions } = this.props;
    actions.logoutRequest();
    actions.logout();
    actions.clearAccount();
  }

  protected showLoginPopup = () =>  {
    this.setState({
      visible: true,
    });
  }

  protected handleOk = () => {
    setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 2000);
  }

  protected handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  componentDidMount(){
    const { actions } = this.props;
    const that = this;
    window.addEventListener('load', function(e: Event) {
      e.preventDefault();
      if (navigator.onLine) {
        // that.checkJwt();
        actions.connectSocket();
        actions.getAccountInfo();
      } else {
        that.setState({offline: true});
      }
    }, false);

    window.addEventListener('online', function(e: Event) {
      e.preventDefault();
      console.log('And we re back');
    }, false);

    window.addEventListener('offline', function(e: Event) {
      e.preventDefault();
      console.log('network offline');
      actions.closeSocket();
    }, false);
  }

  componentWillReceiveProps(nextProps: IAppProps) {
    const { socket, account } = nextProps;
    const { routeParams, actions } = this.props;
    const symbol = routeParams.symbol ? routeParams.symbol.toUpperCase() : 'ETH_CNZ';
    global.CurrentSymbol = symbol;
    if (socket.get('status') === 3) {
      requestSend = true;
      requestSendAccount = true;
    }
    if (socket.get('status') === 1 && requestSend) {
      actions.startSendPublicRequest(symbol);
      requestSend = false;
      // requestSendAccount = true;
    }
    if (!!account.get('accountID') && socket.get('status') === 1 && requestSendAccount) {
      actions.startSendPrivateRequest(symbol);
      requestSendAccount = false;
    }
  }

  public render() {
    const { visible } = this.state;
    const { location, routeParams } = this.props;
    return (
      <div className="App">
        <Header
          location={location}
          showLoginPopup={this.showLoginPopup}
        />
        <div className="content">
          <div className="box-1">
            <Assets/>
            <Chart symbol={routeParams.symbol} lang="en" theme="white"/>
            <TimeSales />
          </div>
          <div className="box-2">
            <Orderbook />
            <Trade />
            <History />
          </div>
          <div className="box-3">
            <Introduce />
          </div>
        </div>
        <Modal title="登录"
           visible={visible}
           footer={null}
           width={400}
           onOk={this.handleOk}
           onCancel={this.handleCancel}
         >
           <LoginForm
             onOk={this.handleOk}
             onCancel={this.handleCancel}
           />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    socket: state.socket,
    lang: state.locales.get('lang'),
    account: state.account,
    // auth: state.auth,
  };
}


function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, SocketActions, AuthActions, RequestActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
