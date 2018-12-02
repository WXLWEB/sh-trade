import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
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

const columns: ColumnProps<ITimeSales>[] = [{
  title: '时间',
  dataIndex: 'Timestamp',
  align: 'left',
  width: 60,
  render: (item) => (
    <Filter keyname="timestamp" value={item} />
  )
}, {
  title: '价格',
  dataIndex: 'Price',
  align: 'center',
  width: 80,
  render: (item, row) => (
    <div className={row.Side === '1' ? 'green' : 'red'}>
      {item}
    </div>
  )
}, {
  title: '数量',
  dataIndex: 'Size',
  align: 'right',
}];

interface TimeSalesProps {
  exectrade: any;
}
export type TimeSalesState = Readonly<any>;

class TimeSales extends React.Component<TimeSalesProps, TimeSalesState>{
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
            columns={columns}
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
  };
}

export default connect(
  mapStateToProps,
)(TimeSales);
