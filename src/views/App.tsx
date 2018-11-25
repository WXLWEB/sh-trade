import { Rate } from 'antd';
import * as React from 'react';
import { Button } from 'antd';
import Header from '@/components/Header';
import logo from '@/assets/images/logo.png';
import './App.less';

// global.spotAccountKey = 'test';
// global.spotAccountID = 'ptest2';

export interface IAppProps {
  lang: any;
  location: string;
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
    // const { children } = this.props;
    const { children, lang, location } = this.props;
    return (
      <div className="App">
        <Header
          hasAccount={false}
          location={location}
        />
        {children}
      </div>
    );
  }
}

export default App;
