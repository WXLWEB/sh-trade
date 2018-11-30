import * as React from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Box from '@/components/Box';
import './index.less';
interface IOrderbook {
  Price: number;
  Quantity: number;
  TotalPrice: number;
  TotalQty: number;
  width?: number;
  render: () => void;
}

const columns: ColumnProps<IOrderbook>[] = [{
  title: '价格',
  dataIndex: 'Price',
  align: 'left',
  width: 60,
}, {
  title: '数量',
  dataIndex: 'Quantity',
  align: 'center',
  width: 60,
}, {
  title: '累计',
  dataIndex: 'TotalQty',
  align: 'right',
}];

interface OrderbookProps {
  orderbook: any;
}
export type OrderbookState = Readonly<any>;

class Orderbook extends React.Component<OrderbookProps, OrderbookState>{
  constructor(props: OrderbookProps) {
    super(props);
  }

  public render(){
    const { orderbook } = this.props
    const BidData = orderbook.get('BidData').toJS()
    const AskData = orderbook.get('AskData').toJS().reverse()
    console.log('BidData:', BidData)
    return(
      <div className="orderbook">
        <Box
          title="挂单薄">
          <div className="order-conent">
            <div className="table-header">
              <div style={{width: 60, textAlign:'left'}}>价格</div>
              <div style={{width: 60, textAlign:'center'}}>数量</div>
              <div style={{width: 62, textAlign:'right'}}>累计</div>
            </div>
            <div className="conent">
              <Table
                size='small'
                className="orderbook-table ask"
                columns={columns}
                dataSource={AskData}
                pagination={false}
                bordered={false}
                showHeader={false}
                />
              <div className="new-price">
                <div>4,12341</div>
                <div>¥ 3213</div>
              </div>
              <Table
                size='small'
                className="orderbook-table bid"
                columns={columns}
                dataSource={BidData}
                pagination={false}
                bordered={false}
                showHeader={false}
               />
            </div>
          </div>
        </Box>
      </div>
    )
  }
}


function mapStateToProps(state: any) {
  return {
    orderbook: state.orderbook,
  };
}
export default connect(
  mapStateToProps,
)(Orderbook);
