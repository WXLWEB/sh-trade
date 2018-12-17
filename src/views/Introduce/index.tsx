import * as React from 'react';
import { Row, Col, Card, Table } from 'antd'
import { Link } from  'react-router';
import Box from '@/components/Box';
import './index.less';

const { Meta } = Card;

interface IntroduceProps {

}

export type IntroduceState = Readonly<any>;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  width: 200,
}, {
  title: 'Detail',
  dataIndex: 'detail',
}];

const data = [{
  key: '1',
  name: '发行时间',
  detail: '2017/07/02',
}, {
  key: '2',
  name: '发行总量',
  detail: '10亿',
}, {
  key: '3',
  name: '流通总量',
  detail: '5亿',
}, {
  key: '4',
  name: '合约地址',
  detail: '5亿',
}, {
  key: '5',
  name: '白皮书',
  detail: <a target="_blank" href="https://github.com/EOSl0/Documentation/blob/master/zh-CN/TechnicalWhitePap">https://github.com/EOSl0/Documentation/blob/master/zh-CN/TechnicalWhitePap</a>,
}, {
  key: '6',
  name: '官网',
  detail: <a target="_blank" href="https://eos.io/">Https://eos.io/</a>,
}, {
  key: '7',
  name: '区块链查询',
  detail: <a target="_blank" href="https://etherscan.io/token/EOS">https://etherscan.io/token/EOS</a>,
}];

export default class Introduce extends React.PureComponent<IntroduceProps, IntroduceState>{
  public render(){
    return(
      <div className="introduce">
        <Box
          title="币种介绍">
          <Row gutter={100}>
            <Col span={12}>
               <Card
                 bordered={false}
                 hoverable
                 headStyle={{backgroundColor: '#fff', textAlign: 'left'}}
                 bodyStyle={{textAlign: 'left'}}
                 >
                   <Meta
                     title="EOS"
                     description="Enterprise Operation System  (EOS)"
                   />
                 <p>详细介绍</p>
                 <p>EOS  (Enterprise Operation System）是由 Block. One 公司主导开发的一种全新的基于区块链智能合约平台，旨在为高性能分布式应用提供底层区块链平台服务。EOS 项目的目标是实现一个类似操作系统的支撑分布式应用程序的区块链架构。该架构可以 提供账户，身份认证，数据库，异步通信以及可在数以万计的CPU/GPU群集。上进行程序调度和并行运算。EOS 最终可以支持每秒执行数百万个交易，同时普通用户执行智能合约无需支付使用费用。</p>
               </Card>
            </Col>
            <Col span={12}>
              <Table columns={columns} dataSource={data} pagination={false} showHeader={false} size="middle" rowKey="name"/>
            </Col>
          </Row>
        </Box>
      </div>
    )
  }
}
