import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as SocketActions from '@/store/actions/socket';
import { Icon, Tabs, Input, Button, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import findIndex from 'lodash.findindex'
import global from '@/constants/config';
import { ActiveContractsState } from '@/store/reducers/activeContracts';
import Box from '@/components/Box';
import './index.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const search = <Search
      onSearch={(value: any) => console.log(value)}
      style={{ height: '24px', width: '80px' }}
    />;

interface ICoins {
  coin: string;
  lastPrice: string;
  percent: string;
  width?: number;
  render: () => void;
}

const columns: ColumnProps<ICoins>[] = [{
  title: '币种',
  dataIndex: 'coin',
  align: 'left',
  width: 60,
  render: (item) => (
    <div className={item === global.CurrentSymbol ? 'active' : ''}>
      {item}
    </div>
  )
}, {
  title: '最新价',
  dataIndex: 'lastPrice',
  align: 'center',
  width: 80,
}, {
  title: '涨幅',
  dataIndex: 'percent',
  align: 'right',
  render: (item) => (
    <div className={item > 0 ? 'red' : 'green'}>
      {item}
    </div>
  )
}];

interface AssetsProps {
  activeContracts: ActiveContractsState;
  symbol: string;
  actions: any;
}
export type AssetsState = Readonly<any>;

class Assets extends React.Component<AssetsProps, AssetsState>{
  constructor(props: AssetsProps) {
    super(props);
  };

  protected handleTabChange = () => {

  }

  public render(){
    const activeKeyList = ['CNZ', 'ETH', 'EOS', 'Other'];
    const { activeContracts, symbol, actions } = this.props;
    const index = findIndex(activeKeyList, (coin: string) => {
      return symbol.indexOf(coin) !== -1
    })
    const activeIndex = index >= 0 ? index : 0

    let activeDataList: any[] = [];
    activeDataList.push(activeContracts.contracts.CNZ.map((obj: any, i: number) => {
      return {
        key: i,
        coin: obj.Symbol,
        lastPrice: 32,
        percent: `${i}%`,
      }
    }))
    activeDataList.push(activeContracts.contracts.ETH.map((obj: any, i: number) => {
      return {
        key: i,
        coin: obj.Symbol,
        lastPrice: 32,
        percent: `${i}%`,
      }
    }))
    activeDataList.push(activeContracts.contracts.EOS.map((obj: any, i: number) => {
      return {
        key: i,
        coin: obj.Symbol,
        lastPrice: 32,
        percent: `${i}%`,
      }
    }))
    activeDataList.push(activeContracts.contracts.EOS.map((obj: any, i: number) => {
      return {
        key: i,
        coin: obj.Symbol,
        lastPrice: 32,
        percent: `${i}%`,
      }
    }))
    const optional = <Button
      style={{ lineHeight: '32px', border: 'none', padding: '0', background: 'none' }}
      onClick={this.handleTabChange}
      >
      <Icon type="star" theme="filled" style={{ fontSize: '11px' }}/>
      自选
    </Button>
    return(
      <div className="assets">
        <Box
          title={`资产折合 ≈ ${6000} CNY`}
          extra={<Icon type="eye" style={{ fontSize: '14px'}}/>}
          >
          <Tabs className="tab1" tabBarExtraContent={search} size="small" tabBarGutter={0}>
            <TabPane tab="主版" key="1" >
              <Tabs className="tab2" defaultActiveKey={activeKeyList[activeIndex]} tabBarExtraContent={optional} size="small" tabBarGutter={0}>
                <TabPane tab="CNZ" key={activeKeyList[0]}>
                  <Table
                    size='small'
                    className="coin-table"
                    columns={columns}
                    dataSource={activeDataList[0]}
                    pagination={false}
                    bordered={false}
                    scroll={{ y: 300 }}
                    onRow={(record) => {
                      return {
                        onClick: () => {
                          browserHistory.push(record.coin.toLowerCase());
                          actions.closeSocket();
                        },
                      }
                    }}
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
                    onRow={(record) => {
                      return {
                        onClick: () => {
                          browserHistory.push(record.coin.toLowerCase());
                          actions.closeSocket();
                        },
                      }
                    }}
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
                    onRow={(record) => {
                      return {
                        onClick: () => {
                          browserHistory.push(record.coin.toLowerCase())
                        },
                      }
                    }}
                  />
                </TabPane>
                <TabPane tab='' key='other'>
                  自选内容
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
    actions: bindActionCreators(Object.assign({}, SocketActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Assets);
