import * as React from 'react';
import { Checkbox, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table';
import Box from '@/components/Box';
import './index.less';
interface HistoryProps {

}
export type HistoryState = Readonly<any>;

const columns: ColumnProps<HistoryProps>[] = [{
  title: '价格',
  dataIndex: 'price',
  align: 'left',
  width: 60,
  render: (item) => (
    <div className={item > 0 ? 'red' : 'green'}>
      {item}
    </div>
  )
}, {
  title: '数量',
  dataIndex: 'amount',
  align: 'center',
  width: 60,
}, {
  title: '累计',
  dataIndex: 'total',
  align: 'right',
}];

let data:any[] = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    price: `BTC${i}`,
    amount: 32,
    total: `${i}`,
  });
}

const tabListNoTitle = [{
  key: 'current',
  tab: '当前委托',
}, {
  key: 'history',
  tab: '历史委托',
}];

const contentListNoTitle = {
  current: <Table
    className="history-table"
    columns={columns}
    dataSource={data}
    pagination={{pageSize: 11}}
    bordered={false}
    />,
  history: <Table
    className="history-table"
    columns={columns}
    dataSource={data}
    pagination={{pageSize: 11}}
    bordered={false}
    />,
};

export default class History extends React.Component<HistoryProps, HistoryState>{
  constructor(props: HistoryProps) {
    super(props);
    this.state = {
      noTitleKey: 'current',
    }
  }
  protected onTabChange = (key: string) => {
    this.setState({ noTitleKey: key });
  }
  protected onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }
  public render(){
    return(
      <div className="history">
        <Box
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={this.onTabChange}
          extra={<Checkbox onChange={this.onChange}>显示所有的交易对</Checkbox>}
          headStyle={{display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',}}
          >
          {contentListNoTitle[this.state.noTitleKey]}
        </Box>
      </div>
    )
  }
}
