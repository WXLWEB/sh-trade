import { Rate } from 'antd';
import * as React from 'react';
import { Button } from 'antd';
import './App.less';

import logo from '@/assets/images/logo.png';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <Button type="primary">Button</Button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Rate character="6"/>
      </div>
    );
  }
}

export default App;
