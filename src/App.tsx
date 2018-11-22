import * as React from 'react';
import { Tabs, Select } from 'antd'
import { Button } from 'antd';

import './App.css';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
import logo from './logo.svg';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      tabPosition: 'top',
    }
  };
  public render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div style={{ marginBottom: 16 }}>
          Tab position：
          <Select
            value={this.state.tabPosition}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </div>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
