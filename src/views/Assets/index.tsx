import * as React from 'react';
import { Icon, Tabs, Input, Button, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Box from '@/components/Box';
import './index.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const search = <Search
      onSearch={(value: any) => console.log(value)}
      style={{ height: '24px', width: '80px' }}
    />;
interface ICoins {
  title: string;
  dataIndex: string;
  align: string;
  width?: number;
  render: () => void;
}

const columns: ColumnProps<ICoins>[] = [{
  title: '币种',
  dataIndex: 'coin',
  align: 'left',
  width: 60,
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

let data:any[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    coin: `BTC${i}`,
    lastPrice: 32,
    percent: `${i}%`,
  });
}

interface AssetsProps {

}
export type AssetsState = Readonly<any>;

export default class Assets extends React.Component<AssetsProps, AssetsState>{

  protected handleTabChange = () => {

  }

  public render(){
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
            <TabPane tab="主版" key="1">
              <Tabs className="tab2" tabBarExtraContent={optional} size="small" tabBarGutter={0}>
                <TabPane tab="CNZ" key='cnz'>
                  <Table
                    size='small'
                    className="coin-table"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered={false}
                    scroll={{ y: 300 }} />
                </TabPane>
                <TabPane tab="ETH" key='eth'>
                  ETH
                </TabPane>
                <TabPane tab="EOS" key='eos'>
                  EOS
                </TabPane>
                <TabPane tab=''>
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
