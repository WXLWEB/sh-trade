import * as React from 'react';
import { Table } from 'antd';

import './index.less';
interface TableProps {
    readonly children: any;
    readonly title?: any;
    readonly headStyle?: any;
    readonly extra?: any;
    readonly tabList?: any[];
    readonly activeTabKey?: any;
    readonly onTabChange?:(key: string) => void;
}
export type TableState = Readonly<any>;

export default class Table extends React.Component<TableProps, TableState>{
  public render(){
    const { columns, data } = this.props;
    return(
      <Table
        size='small'
        className="timesales-table"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={false}
        />
    )
  }
}
