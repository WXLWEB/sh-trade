import * as React from 'react';
import Box from '@/components/Box';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import './index.less';

interface ITimeSales {
  time: string;
  price: string;
  size: string;
  width?: number;
  render: () => void;
}

const columns: ColumnProps<ITimeSales>[] = [{
  title: '时间',
  dataIndex: 'time',
  align: 'left',
  width: 60,
}, {
  title: '价格',
  dataIndex: 'price',
  align: 'center',
  width: 80,
  render: (item) => (
    <div className={item > 0 ? 'red' : 'green'}>
      {item}
    </div>
  )
}, {
  title: '数量',
  dataIndex: 'size',
  align: 'right',
}];

let data:any[] = [];
for (let i = 0; i < 13; i++) {
  data.push({
    key: i,
    time: `BTC${i}`,
    price: 32,
    size: `${i}%`,
  });
}

interface TimeSalesProps {

}
export type TimeSalesState = Readonly<any>;

export default class TimeSales extends React.Component<TimeSalesProps, TimeSalesState>{
  public render(){
    return(
      <div className="timesales">
        <Box
          title='实时成交'>
          <Table
            size='small'
            className="timesales-table"
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered={false}
            />
        </Box>
      </div>
    )
  }
}
