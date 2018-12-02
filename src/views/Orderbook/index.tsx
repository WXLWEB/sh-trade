import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Box from '@/components/Box';
import './index.less';
interface IOrderbook {
  Price: number;
  Size: number;
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
  dataIndex: 'Size',
  align: 'center',
  width: 60,
}, {
  title: '累计',
  dataIndex: 'TotalQty',
  align: 'right',
}];

interface OrderbookProps {
  orderbook: any;
  ticker: any;
}
export type OrderbookState = Readonly<any>;
const OrderBookItemLength = 20;
const getEmptyArray:any = (size: number) => {
  if(size >= OrderBookItemLength)
  return [];
  const data = [];
  for (let i = 0; i < OrderBookItemLength - size; i++) {
    data.push({
      Price: '-',
      Size: '-',
      TotalPrice: '-',
      TotalQty: '-',
    });
  }
  return data
}


class Orderbook extends React.Component<OrderbookProps, OrderbookState>{
  constructor(props: OrderbookProps) {
    super(props);
  }

  componentDidMount(){
    console.log('scrollContent', this.refs.scrollContent.clientHeight);
  }

  public render(){
    const { orderbook, ticker } = this.props;
    const askSize = orderbook.get('BidList').size;
    const bidSize = orderbook.get('BidList').size;
    const BidList = orderbook.get('BidList').toJS().concat(getEmptyArray(bidSize)).slice(0,6).reverse();
    const AskList = orderbook.get('AskList').toJS().concat(getEmptyArray(askSize)).slice(0,6);
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
            <div id="orders">
              <div className="content" ref="scrollContent">
                <Table
                  size='small'
                  className="orderbook-table ask"
                  columns={columns}
                  dataSource={BidList}
                  pagination={false}
                  bordered={false}
                  showHeader={false}
                  rowKey={(_, index: number) => {return index.toString()}}
                  />
                <div className="new-price">
                  <div>{ticker.get("LastPrice")}</div>
                  <div>¥ 3213</div>
                </div>
                <Table
                  size='small'
                  className="orderbook-table bid"
                  columns={columns}
                  dataSource={AskList}
                  pagination={false}
                  bordered={false}
                  showHeader={false}
                  rowKey={(_, index: number) => {return index.toString()}}
                 />
               </div>
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
    ticker: state.ticker,
  };
}
export default connect(
  mapStateToProps,
)(Orderbook);
