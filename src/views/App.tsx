import * as React from 'react';
import Header from '@/components/Header';
import Assets from './Assets';
import Chart from './Chart';
import TimeSales from './TimeSales';
import Orderbook from './Orderbook';
import Trade from './Trade';
import History from './History';
import Introduce from './Introduce';
import './App.less';

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
    const {location } = this.props;
    return (
      <div className="App">
        <Header
          hasAccount={false}
          location={location}
        />
        <div className="content">
          <div className="box-1">
            <Assets />
            <Chart />
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
      </div>
    );
  }
}

export default App;
