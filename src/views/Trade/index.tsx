import * as React from 'react';
import { Link } from 'react-router';
import { Form, Input, Button, Row, Col, Slider } from 'antd';
import { call } from 'redux-saga/effects';
import Box from '@/components/Box';
import './index.less';

const FormItem = Form.Item;

export type TradeProps = Readonly<any>
export type TradeState = Readonly<any>;

export default class Trade extends React.Component<TradeProps, TradeState>{
  constructor(props: TradeProps, context: any) {
    super(props, context);
    this.state = {
      formLayout: 'vertical',
      percentKey: 0,
      percent: {0:'0', 25:'', 50:'', 75:'', 100:'100%'}
    };
  }
  protected onPercentChange = (percentKey: any) => {
    this.setState({ percentKey });
  }
  public render(){
    const { formLayout, percent, percentKey } = this.state;

    return(
      <div className="trade">
        <Box
          title={'限价交易'}
          extra={<Link to='fee'>费率</Link>}
          >
            <Form layout={formLayout} className="trade-form">
              <Row gutter={24}>
                 <Col span={12}>
                   <FormItem>
                     <div className='tip'>
                       <div>可用：349,323.28CNZ</div>
                       <div><Link to=''>充币</Link></div>
                     </div>
                   </FormItem>
                   <FormItem
                      label="价格"
                    >
                      <Input placeholder="价格" />
                    </FormItem>
                    <FormItem
                      label="数量"
                    >
                      <Input placeholder="数量" />
                    </FormItem>
                    <FormItem>
                      <Slider
                        value={percentKey}
                        onChange={this.onPercentChange}
                        marks={percent}
                        step={1}
                        tipFormatter={null}
                      />
                    </FormItem>
                    <FormItem>
                      <div className='tip'>
                        <div>交易额</div>
                        <div>349,323.28CNZ</div>
                      </div>
                    </FormItem>
                    <FormItem>
                      <Button block style={{background: '#3562FF', color: '#fff', border: 'none'}}>
                        Submit
                      </Button>
                    </FormItem>
                 </Col>
                 <Col span={12}>
                   <FormItem>
                     <div className='tip'>
                       <div>可用：349,323.28CNZ</div>
                       <div><Link to=''>充币</Link></div>
                     </div>
                   </FormItem>
                   <FormItem
                      label="价格"
                    >
                      <Input placeholder="价格" />
                    </FormItem>
                    <FormItem
                      label="数量"
                    >
                      <Input placeholder="数量" />
                    </FormItem>
                    <FormItem>
                      <Slider
                        value={percentKey}
                        onChange={this.onPercentChange}
                        marks={percent}
                        step={1}
                        tipFormatter={null}
                      />
                    </FormItem>
                    <FormItem>
                      <div className='tip'>
                        <div>交易额</div>
                        <div>349,323.28CNZ</div>
                      </div>
                    </FormItem>
                    <FormItem>
                      <Button block style={{background: '#DD4546', color: '#fff', border: 'none'}}>
                        Submit
                      </Button>
                    </FormItem>
                 </Col>
               </Row>
             </Form>
        </Box>
      </div>
    )
  }
}
