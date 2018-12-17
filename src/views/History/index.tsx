import * as React from 'react';
import { Checkbox, Table, Button } from 'antd'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import filter from 'lodash.filter';
import * as RequestActions from '@/store/actions/request';
import Filter from '@/Filter';
import Box from '@/components/Box';
import './index.less';
export interface HistoryProps {
  symbol: string,
  execReportResponse: any;
  activeContracts: any;
  actions: any;
  hasAccount: boolean;
}
export interface HistoryState {
  noTitleKey: string;
  columns: any;
  filledColumns: any;
  alreadyRequestAllOrders: boolean;
  filterOption: string;
};

const tabListNoTitle = [{
  key: 'current',
  tab: '当前委托',
}, {
  key: 'history',
  tab: '历史委托',
}];

class History extends React.Component<HistoryProps, HistoryState>{
  constructor(props: HistoryProps) {
    super(props);
    this.state = {
      noTitleKey: 'current',
      alreadyRequestAllOrders: false,
      filterOption: '',
      columns: [{
        title: '方向',
        dataIndex: 'Side',
        align: 'left',
        width: '10%',
        render: (item) => (
          <Filter value={item} keyname="orderside" />
        )
      }, {
        title: '时间',
        dataIndex: 'Time',
        align: 'center',
        width: '15%',
        render: (item: any) => (
          <Filter value={item} keyname="timestamp" />
        )
      }, {
        title: '交易对',
        dataIndex: 'Symbol',
        align: 'center',
        width: '15%',
      }, {
        title: '价格',
        dataIndex: 'Price',
        align: 'center',
        width: '15%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentPriceDecimal}`}/>
        )
      }, {
        title: '数量',
        dataIndex: 'Total',
        align: 'center',
        width: '10%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentQuantityDecimal}`}/>
        )
      }, {
        title: '已成交',
        dataIndex: 'CumQty',
        align: 'center',
        width: '10%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentQuantityDecimal}`}/>
        )
      }, {
        title: '未成交',
        align: 'center',
        width: '10%',
        render: (_, row: any) => (
          <Filter value={row.Total - row.CumQty} keyname={`decimal: ${this.props.activeContracts.currentQuantityDecimal}`}/>
        )
      }, {
        title: '操作',
        dataIndex: 'OID',
        align: 'center',
        width: '15%',
        render: (item: string) => {
          if(item!== '-'){
            return (<Button size="small" onClick={() => { this.cancelOrder(item)}}>撤销</Button>)
          }else {
            return '-'
          }
        }
      }],
      filledColumns:[{
        title: '方向',
        dataIndex: 'Side',
        align: 'left',
        width: '10%',
        render: (item) => (
          <Filter value={item} keyname="orderside" />
        )
      }, {
        title: '时间',
        dataIndex: 'Time',
        align: 'center',
        width: '20%',
        render: (item: any) => (
          <Filter value={item} keyname="timestamp" />
        )
      }, {
        title: '交易对',
        dataIndex: 'Symbol',
        align: 'center',
        width: '15%',
      }, {
        title: '平均价格',
        dataIndex: 'AvgPrice',
        align: 'center',
        width: '20%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentPriceDecimal}`}/>
        )
      }, {
        title: '数量',
        dataIndex: 'Quantity',
        align: 'center',
        width: '20%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentQuantityDecimal}`}/>
        )
      }, {
        title: '状态',
        dataIndex: 'Status',
        align: 'center',
        width: '15%',
        render: (item) => (
          <Filter value={item} keyname="orderstatus"/>
        )
      }]
    }
  }
  protected cancelOrder = (OID: string) => {
    const { actions, symbol } = this.props;
    actions.cancelOrderRequest({symbol: symbol, OID: OID})
  }
  protected onTabChange = (key: string) => {
    this.setState({ noTitleKey: key });
  }
  protected onChange = (e: any) => {
    const { actions, symbol, hasAccount } = this.props;
    if(hasAccount) {
      if(this.state.alreadyRequestAllOrders){
        if(e.target.checked){
          this.setState({filterOption: ''})
        }else {
          this.setState({filterOption: symbol})
        }
      }else {
        if(e.target.checked) {
          actions.getAllOrdersRequest()
          this.setState({alreadyRequestAllOrders: true})
        }else {
          actions.getOrdersRequest(symbol)
        }
      }
    }
  }
  public render(){
    const { execReportResponse, hasAccount } = this.props
    let pendingOrders = execReportResponse.get('pendingOrders').toJS()
    let closedOrders = execReportResponse.get('closedOrders').toJS()
    if(this.state.filterOption && hasAccount){
      pendingOrders = filter(pendingOrders, {Symbol: this.state.filterOption})
      closedOrders = filter(closedOrders, {Symbol: this.state.filterOption})
    }
    const contentListNoTitle = {
      current: <Table
        className="history-table"
        columns={this.state.columns}
        dataSource={pendingOrders}
        pagination={{pageSize: 10}}
        bordered={false}
        locale={{emptyText: '暂时还没有委托信息'}}
        rowKey="OID"
        />,
      history: <Table
        className="history-table"
        columns={this.state.filledColumns}
        dataSource={closedOrders}
        pagination={{pageSize: 10}}
        bordered={false}
        locale={{emptyText: '暂时还没有历史信息'}}
        rowKey="OID"
        />,
    };
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


function mapStateToProps(state: any) {
  return {
    execReportResponse: state.execReportResponse,
    activeContracts: state.activeContracts,
  };
}


function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, RequestActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
