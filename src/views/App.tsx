import { Rate } from 'antd';
import * as React from 'react';
import { Button } from 'antd';
import Header from '@/components/Header';
import logo from '@/assets/images/logo.png';
import Navigation from '@/constants/navigation';
import './App.less';

// global.spotAccountKey = 'test';
// global.spotAccountID = 'ptest2';

export interface IAppProps {
  // lang: any;
  // pathname: string;
  // auth: any;
  // account: any;
  // children: any;
  // hasAccount: boolean;
  actions: any;
};
export interface IAppState {};

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
  };

  logout = () => {
    const { actions } = this.props;
    actions.logoutRequest();
    actions.logout();
    actions.clearAccount();
  }

  showPopup = () =>  {
    this.props.actions.showPopup();
  }

  showRegisterPopup = () =>  {
    this.props.actions.showRegisterPopup();
  }

  public render() {
    const { children } = this.props;
    // const { children,lang, pathname, auth, account, hasAccount } = this.props;
    return (
      <div className="App">
        {/* <Header
          isHome={false}
          Navigation={Navigation}
          pathname={pathname}
          hasAccount={false}
          logout={this.logout}
          account={account.get('email')}
          showPopup={this.showPopup}
          showRegisterPopup={this.showRegisterPopup}
          product='btcchina' /> */}
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <Button type="primary">Button</Button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Rate character="6"/>
        {children}
      </div>
    );
  }
}

export default App;
