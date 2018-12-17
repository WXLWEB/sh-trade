import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import Box from '@/components/Box';
import Filter from '@/Filter'
import './index.less';

interface ITimeSales {
  Timestamp: number;
  Price: number;
  Size: number;
  Side: string;
  width?: number;
  render: () => void;
}

interface TimeSalesProps {
  exectrade: any;
  activeContracts: any;
}
export type TimeSalesState = Readonly<any>;

class TimeSales extends React.Component<TimeSalesProps, TimeSalesState>{
  constructor(props: TimeSalesProps){
    super(props);
    this.state = {
      columns: [{
        title: '时间',
        dataIndex: 'Timestamp',
        align: 'left',
        width: '30%',
        render: (item) => (
          <Filter keyname="timestamp" value={item} />
        )
      }, {
        title: '价格',
        dataIndex: 'Price',
        align: 'center',
        width: '30%',
        render: (item, row) => (
          <div className={row.Side === '1' ? 'green' : 'red'}>
            <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentPriceDecimal}`}/>
          </div>
        )
      }, {
        title: '数量',
        dataIndex: 'Size',
        align: 'right',
        width: '40%',
        render: (item: number) => (
          <Filter value={item} keyname={`decimal: ${this.props.activeContracts.currentQuantityDecimal}`}/>
        )
      }]
    }
  }
  public render(){
    const { exectrade } = this.props;
    const data = exectrade.get('Trades').toJS();
    return(
      <div className="timesales">
        <Box
          title='实时成交'>
          <Table
            size='small'
            className="timesales-table"
            columns={this.state.columns}
            dataSource={data}
            pagination={false}
            bordered={false}
            rowKey="ShortTime"
            />
        </Box>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    exectrade: state.exectrade,
    activeContracts: state.activeContracts,
  };
}

export default connect(
  mapStateToProps,
)(TimeSales);
