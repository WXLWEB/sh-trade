import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import Filter from '@/Filter';
import Box from '@/components/Box';
import emitter from '@/utils/events';
import './index.less';

interface OrderbookProps {
  orderbook: any;
  ticker: any;
  activeContracts: any;
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
    this.state = {
      columns: [{
        title: '价格',
        dataIndex: 'Price',
        align: 'left',
        width: '30%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentPriceDecimal}`}/>
        )
      }, {
        title: '数量',
        dataIndex: 'Size',
        align: 'center',
        width: '35%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentQuantityDecimal}`}/>
        )
      }, {
        title: '累计',
        dataIndex: 'TotalQty',
        align: 'right',
        width: '35%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentQuantityDecimal}`}/>
        )
      }]
    }
  }
  protected handleClick = (record) => {
    emitter.emit('getPriceQuantity', record);
  }

  public render(){
    const { orderbook, ticker, activeContracts } = this.props;
    const { columns } = this.state;
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
              <div style={{width: '30%', textAlign:'left'}}>{`价格(${activeContracts.currentPriceUnit})`}</div>
              <div style={{width: '35%', textAlign:'center'}}>{`数量(${activeContracts.currentQuantityUnit})`}</div>
              <div style={{width: '35%', textAlign:'right'}}>{`累计(${activeContracts.currentQuantityUnit})`}</div>
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
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        this.handleClick(record) // 点击行
                      },
                    }
                  }}
                  />
                <div className="new-price">
                  <div><Filter value={ticker.get("LastPrice")} keyname={`decimal: ${this.props.activeContracts.currentPriceDecimal}`}/> {activeContracts.currentPriceUnit}</div>
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
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        this.handleClick(record) // 点击行
                      },
                    }
                  }}
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
    activeContracts: state.activeContracts,
  };
}
export default connect(
  mapStateToProps,
)(Orderbook);
