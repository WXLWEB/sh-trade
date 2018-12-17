import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { browserHistory, Link } from 'react-router';
import * as SocketActions from '@/store/actions/socket';
import * as ActiveContractsActions from '@/store/actions/activeContract';
import { Icon, Tabs, Button, Table, Select } from 'antd';
import findIndex from 'lodash.findindex'
import filter from 'lodash.filter'
import { ActiveContractsState } from '@/store/reducers/activeContracts';
import Box from '@/components/Box';
import emitter from '@/utils/events';
import UneyeIcon from '@/assets/svg/UneyeIcon'
import { getStorage, addStorage, removeStorage } from '@/utils/storage';
import './index.less';

const Option = Select.Option;
const TabPane = Tabs.TabPane;

interface AssetsProps {
  activeContracts: ActiveContractsState;
  symbol: string;
  actions: any;
  hasAccount: boolean;
  openLoginPopup: () => void
}
export type AssetsState = Readonly<any>;

const activeKeyList = ['CNZ', 'ETH', 'EOS', 'Other'];

class Assets extends React.Component<AssetsProps, AssetsState>{
  constructor(props: AssetsProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      optional: getStorage(),
      hideAssets: !!Cookies.get('ZG-hideAssets') ? Cookies.get('ZG-hideAssets') : false
    }
  };

  protected addOptional = (symbol: string) => {
    if(this.isOptional(symbol)){
      removeStorage(symbol)
    }else {
      addStorage(symbol)
    }
    this.setState({optional: getStorage()})
  }

  protected hideAssets = () => {
    this.setState({hideAssets: !this.state.hideAssets})
    Cookies.set('ZG-hideAssets', !this.state.hideAssets, {
        domain: '',
        path: '/',
        expires: new Date(Date.now() + 8760 * 3600 * 1000),
      });
  }

  protected switchActiveTabIndex = (value) => {
    const index = findIndex(activeKeyList, (coin: string) => {
      return value.indexOf(coin) !== -1
    })
    if(index >= 0){
      this.setState({ activeIndex: index})
    }else {
      this.setState({ activeIndex: 0})
    }
  }

  protected handleTabChange = (value) => {
    console.log(`selected tab ${value}`);
    this.switchActiveTabIndex(value)
  }

  protected handleChange = (value) => {
    console.log(`selected ${value}`);
    this.switchActiveTabIndex(value)
    this.switchSymbol(value)
  }

  protected switchSymbol = (symbol: string) => {
    const { actions } = this.props;
    browserHistory.push(symbol.toLowerCase());
    actions.setCurrentSymbol(symbol)
    emitter.emit('clearForm');
    actions.closeSocket();
  }

  protected onSelectedChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
    this.setState({ selectedRowKeys });
  }

  protected isOptional = (symbol: string) => {
    console.log('isOptional1:', symbol);
    console.log('isOptional2:', this.state.optional.indexOf(symbol) >= 0);
    return this.state.optional.indexOf(symbol) >= 0
  }

  componentWillReceiveProps(nextProps: AssetsProps) {
    if(nextProps.symbol !== this.props.symbol){
      this.switchActiveTabIndex(nextProps.symbol)
    }
  }

  public render(){
    const { activeContracts, hasAccount, symbol } = this.props;
    let searchOptions: any = []
    let activeDataList: any[] = [];
    if(activeContracts.contracts[activeKeyList[0]].length > 0) {
      for(let i = 0; i < activeKeyList.length - 1; i++) {
        searchOptions.push(activeContracts.contracts[activeKeyList[i]].map((obj: any,) => {
          return (<Option value={obj.Symbol} key={obj.Symbol+ obj.BaseCurrency}>{obj.Symbol}</Option>)
        }))
        activeDataList.push(activeContracts.contracts[activeKeyList[i]].map((obj: any, i: number) => {
          return {
            key: i,
            coin: obj.Coin,
            symbol: obj.Symbol,
            lastPrice: 32,
            percent: `${i}%`,
          }
        }))
      }
      activeDataList[activeKeyList.length - 1] = this.state.optional.map((obj: any, i: number) => {
        return {
          key: i,
          coin: obj,
          symbol: obj,
          lastPrice: 32,
          percent: `${i}%`,
        }
      })
    }

    const { activeIndex } = this.state

    const search = <Select
                    showSearch
                    style={{ width: 120 }}
                    placeholder="Search"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    suffixIcon={<Icon type="search" />}
                    filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {
                      searchOptions
                    }
                  </Select>;
    const optional = <Button
      style={{ lineHeight: '32px', border: 'none', padding: '0', background: 'none' }}
      >
      <Icon type="star" theme="filled" style={{ fontSize: '11px' }}/>
      自选
    </Button>
    const columns = [{
        title: '币种',
        dataIndex: 'coin',
        align: 'left',
        width: '35%',
        render: (item, row) => (
          <div className={row.symbol === symbol ? 'active' : ''}>
            <Icon type="star" theme={this.isOptional(row.symbol) ? 'filled' : 'outlined'} style={{ fontSize: '11px', marginRight: '0' }} onClick={() => {this.addOptional(row.symbol)}}/>&nbsp;
            <span onClick={() => {
              this.switchSymbol(row.symbol)
            }}>{item}</span>
          </div>
        )
      }, {
        title: '最新价',
        dataIndex: 'lastPrice',
        align: 'center',
        width: '35%',
        onCell: (record) => {
          return {
            onClick: () => {
              console.log("record:", record);
              this.switchSymbol(record.symbol)
            },
          }
        }
      }, {
        title: '涨幅',
        dataIndex: 'percent',
        align: 'right',
        width: '30%',
        render: (item) => (
          <div className={item > 0 ? 'red' : 'green'}>
            {item}
          </div>
        ),
        onCell: (record) => {
          return {
            onClick: () => {
              this.switchSymbol(record.symbol)
            },
          }
        }
      }]
    return(
      <div className="assets">
        <Box
          title={hasAccount ? `资产折合 ≈ ${this.state.hideAssets ? '***' : 6000  } CNY` : <span><a href="javascript:void(0);" onClick={this.props.openLoginPopup}>登录</a> 或 <Link to="">注册</Link> 开始交易</span>}
          extra={
            hasAccount &&
            (this.state.hideAssets ?
              <span onClick={this.hideAssets}><UneyeIcon /></span>:
              <Icon type="eye" style={{ fontSize: '14px', cursor: 'pointer'}} onClick={this.hideAssets}/>
            )}
          >
          <Tabs className="tab1" tabBarExtraContent={search} size="small" tabBarGutter={0}>
            <TabPane tab="主版" key="1" >
              <Tabs className="tab2" activeKey={activeKeyList[activeIndex]} onChange={this.handleTabChange} size="small" tabBarGutter={0}>
                <TabPane tab="CNZ" key={activeKeyList[0]}>
                  <Table
                    size='small'
                    className="coin-table"
                    columns={columns}
                    dataSource={activeDataList[0]}
                    pagination={false}
                    bordered={false}
                    scroll={{ y: 300 }}
                    rowKey="symbol"
                  />
                </TabPane>
                <TabPane tab="ETH" key={activeKeyList[1]}>
                  <Table
                    size='small'
                    className="coin-table"
                    columns={columns}
                    dataSource={activeDataList[1]}
                    pagination={false}
                    bordered={false}
                    scroll={{ y: 300 }}
                    rowKey="symbol"
                  />
                </TabPane>
                <TabPane tab="EOS" key={activeKeyList[2]}>
                  <Table
                    size='small'
                    className="coin-table"
                    columns={columns}
                    dataSource={activeDataList[2]}
                    pagination={false}
                    bordered={false}
                    scroll={{ y: 300 }}
                    rowKey="symbol"
                  />
                </TabPane>
                <TabPane tab={optional} key={activeKeyList[3]}>
                  <Table
                    size='small'
                    className="coin-table"
                    columns={columns}
                    dataSource={activeDataList[3]}
                    pagination={false}
                    bordered={false}
                    scroll={{ y: 300 }}
                    rowKey="symbol"
                  />
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="创业版" key="2">创业版</TabPane>
          </Tabs>
        </Box>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    lang: state.locales.get('lang'),
    activeContracts: state.activeContracts,
  };
}


function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, SocketActions, ActiveContractsActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Assets);
