import * as React from 'react';
import { Checkbox, Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RequestActions from '@/store/actions/request';
import Filter from '@/Filter';
import Box from '@/components/Box';
import './index.less';
export interface HistoryProps {
  symbol: string,
  execReportResponse: any;
  actions: any;
}
export interface HistoryState {
  noTitleKey: string;
};

const columns: ColumnProps<any>[] = [{
  title: '方向',
  dataIndex: 'Side',
  align: 'left',
  width: 50,
  render: (item) => (
    <Filter value={item} keyname="orderside" />
  )
}, {
  title: '时间',
  dataIndex: 'Time',
  align: 'center',
  width: 80,
  render: (item: any) => (
    <Filter value={item} keyname="timestamp" />
  )
}, {
  title: '交易对',
  dataIndex: 'Symbol',
  align: 'center',
  width: 80,
}, {
  title: '平均价格',
  dataIndex: 'AvgPrice',
  align: 'center',
  width: 90,
}, {
  title: '数量',
  dataIndex: 'Quantity',
  align: 'center',
  width: 80,
}, {
  title: '状态',
  dataIndex: 'Status',
  align: 'center',
  render: (item) => (
    <Filter value={item} keyname="orderstatus"/>
  )
}]


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
    }
    this.colums = [{
      title: '方向',
      dataIndex: 'Side',
      align: 'left',
      width: 30,
      render: (item) => (
        <Filter value={item} keyname="orderside" />
      )
    }, {
      title: '时间',
      dataIndex: 'Time',
      align: 'center',
      width: 80,
      render: (item: any) => (
        <Filter value={item} keyname="timestamp" />
      )
    }, {
      title: '交易对',
      dataIndex: 'Symbol',
      align: 'center',
      width: 60,
    }, {
      title: '价格',
      dataIndex: 'Price',
      align: 'center',
      width: 60,
    }, {
      title: '数量',
      dataIndex: 'Total',
      align: 'center',
      width: 60,
    }, {
      title: '已成交',
      dataIndex: 'CumQty',
      align: 'center',
      width: 60,
    }, {
      title: '未成交',
      align: 'center',
      width: 60,
      render: (_, row: any) => (
        <span>{row.Total !== '-' ? row.Total - row.CumQty : '-'}</span>
      )
    }, {
      title: '操作',
      dataIndex: 'OID',
      align: 'center',
      render: (item: string) => {
        if(item!== '-'){
          return (<Button size="small" onClick={() => { this.cancelOrder(item)}}>撤销</Button>)
        }else {
          return '-'
        }
      }
    }]
  }
  protected cancelOrder = (OID: string) => {
    const { actions, symbol } = this.props;
    actions.cancelOrderRequest({symbol: symbol, OID: OID})
  }
  protected onTabChange = (key: string) => {
    this.setState({ noTitleKey: key });
  }
  protected onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }
  public render(){
    const { execReportResponse } = this.props
    const pendingOrders = execReportResponse.get('pendingOrders').toJS()
    const closedOrders = execReportResponse.get('closedOrders').toJS()
    const contentListNoTitle = {
      current: <Table
        className="history-table"
        columns={this.colums}
        dataSource={pendingOrders}
        pagination={{pageSize: 10}}
        bordered={false}
        rowKey="OID"
        />,
      history: <Table
        className="history-table"
        columns={columns}
        dataSource={closedOrders}
        pagination={{pageSize: 10}}
        bordered={false}
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
