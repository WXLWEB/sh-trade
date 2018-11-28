import * as React from 'react';
import { Card } from 'antd';

import './index.less';
interface BoxProps {
    readonly children: any;
    readonly title?: any;
    readonly headStyle?: any;
    readonly extra?: any;
    readonly tabList?: any[];
    readonly activeTabKey?: any;
    readonly onTabChange?:(key: string) => void;
}
export type BoxState = Readonly<any>;

export default class Box extends React.Component<BoxProps, BoxState>{
  public render(){
    const { children, title, extra, activeTabKey, tabList, onTabChange, headStyle } = this.props;
    return(
      <Card
        className="box"
        type="inner"
        title={title}
        extra={extra}
        activeTabKey={activeTabKey}
        tabList={tabList}
        onTabChange={(key: string) => {onTabChange ? onTabChange(key) : null}}
        headStyle={{height: '48px', textAlign: 'left', ...headStyle}}
        bodyStyle={{backgroundColor: '#fff', padding: 0}}
       >
         {children}
       </Card>
    )
  }
}
