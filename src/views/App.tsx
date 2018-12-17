import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { Link } from 'react-router';
import Header from '@/components/Header';
import * as SocketActions from '@/store/actions/socket';
import * as AuthActions from '@/store/actions/auth';
import * as RequestActions from '@/store/actions/request';
import * as ActiveContractsActions from '@/store/actions/activeContract';
import AllSymbols from '@/constants/allSymbols';
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
  readonly activeContracts: any;
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
    const { actions, routeParams, activeContracts } = this.props;
    if(routeParams.symbol){
       const symbol = AllSymbols.indexOf(routeParams.symbol.toUpperCase()) >= 0 ? routeParams.symbol.toUpperCase() : 'ETH_CNZ'
       actions.setCurrentSymbol(symbol)
    }
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
    const { socket, account, activeContracts, actions } = nextProps;
    if (socket.get('status') === 3) {
      requestSend = true;
      requestSendAccount = true;
    }
    if (socket.get('status') === 1 && requestSend) {
      actions.startSendPublicRequest(activeContracts.currentSymbol);
      requestSend = false;
      // requestSendAccount = true;
    }
    if (!!account.get('accountID') && socket.get('status') === 1 && requestSendAccount) {
      actions.startSendPrivateRequest(activeContracts.currentSymbol);
      requestSendAccount = false;
    }
  }

  public render() {
    const { visible } = this.state;
    const { location, lang, account, activeContracts } = this.props;
    const hasAccount = !!account.get('mobile');
    // let symbol = 'ETH_CNZ'
    // if(routeParams.symbol){
    //    symbol = findIndex(activeContracts.AllContracts, function(o: any){ return o.Symbol = routeParams.symbol}) >= 0 ? routeParams.symbol.toUpperCase() : 'ETH_CNZ'
    // }
    return (
      <div className="App">
        <Header
          location={location}
          showLoginPopup={this.showLoginPopup}
        />
        <div className="content">
          <div className="box-1">
            <Assets symbol={activeContracts.currentSymbol} hasAccount={hasAccount} openLoginPopup={this.showLoginPopup}/>
            <Chart symbol={activeContracts.currentSymbol} lang={lang} theme="white"/>
            <TimeSales />
          </div>
          <div className="box-2">
            <Orderbook />
            <Trade symbol={activeContracts.currentSymbol} hasAccount={hasAccount} openLoginPopup={this.showLoginPopup}/>
            <History symbol={activeContracts.currentSymbol} hasAccount={hasAccount}/>
          </div>
          <div className="box-3">
            <Introduce />
          </div>
        </div>
        <Modal title="用户登录"
           visible={visible}
           footer={<div>还没有账户？<Link to="register">立即注册</Link></div>}
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
    activeContracts: state.activeContracts,
  };
}


function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, SocketActions, AuthActions, RequestActions, ActiveContractsActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
