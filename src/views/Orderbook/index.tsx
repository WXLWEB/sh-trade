import * as React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Box from '@/components/Box';
import './index.less';
interface IOrderbook {
  time: string;
  price: string;
  size: string;
  width?: number;
  render: () => void;
}

const columns: ColumnProps<IOrderbook>[] = [{
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

interface OrderbookProps {

}
export type OrderbookState = Readonly<any>;

export default class Orderbook extends React.Component<OrderbookProps, OrderbookState>{
  public render(){
    return(
      <div className="orderbook">
        <Box
          title="挂单薄">
          <div className="order-conent">
            <Table
              size='small'
              className="orderbook-table bid"
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered={false}
              />
            <div className="new-price">
              <div>4,12341</div>
              <div>¥ 3213</div>
            </div>
            <Table
              size='small'
              className="orderbook-table ask"
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered={false}
             />
          </div>
        </Box>
      </div>
    )
  }
}
