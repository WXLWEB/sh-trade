import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, Input, Button, Row, Col, Slider } from 'antd';
import filter from 'lodash.filter';
import Filter from '@/Filter';
import { getBuyUnit, getSellUnit } from '@/utils/symbol';
import { accMul } from '@/utils/calculate';
import * as RequestActions from '@/store/actions/request';
import Box from '@/components/Box';
import FeedbackText from '@/components/FeedbackText';

import './index.less';

const FormItem = Form.Item;

export interface TradeProps {
  accountInfoResponse: any;
  symbol: string;
  form: any;
  actions: any;
  hasAccount: boolean;
}
export type TradeState = Readonly<any>;
@Form.create()
class Trade extends React.Component<TradeProps, TradeState> {
  constructor(props: TradeProps, context: any) {
    super(props, context);
    this.state = {
      formLayout: 'vertical',
      buyPercentKey: 0,
      sellPercentKey: 0,
      percent: {0:'0', 25:'', 50:'', 75:'', 100:'100%'}
    };
  }
  protected onPercentChange = (percentKey: any, side: string, available: number) => {
    this.setState({ [`${side}PercentKey`]: percentKey });
    console.log(side+'---'+percentKey);
    if(available > 0) {
      this.props.form.setFieldsValue({[`${side}Quantity`]: accMul(available, percentKey / 100)})
    }
  }
  protected handleSubmit = (e: Event, side: string) => {
    e.preventDefault();
    const { actions, symbol } = this.props;
    const checkFields = side === '1' ? ['buyPrice', 'buyQuantity'] : ['sellPrice', 'sellQuantity'];
    this.props.form.validateFields(checkFields,(err: any, values: any) => {
      if (!err) {
        const order = {
          symbol: symbol,
          side: side, // '1': buy, '2':sell
          orderType: '2', // 2: limit
          quantity: side === '1' ? values.buyQuantity : values.sellQuantity,
          price: side === '1' ? values.buyPrice : values.sellPrice,
          stopPrice: 0,
        };
        actions.placeOrderRequest(order);
      }
    });
  }

  public render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { formLayout, percent, buyPercentKey, sellPercentKey } = this.state;
    const { accountInfoResponse, symbol, hasAccount } = this.props;
    const balanceArr = accountInfoResponse.get('balanceArr');
    const buyUnit = getBuyUnit(symbol);
    const sellUnit = getSellUnit(symbol);
    const buySideAssets = filter(balanceArr, {currency: buyUnit });
    const sellSideAssets = filter(balanceArr, {currency: sellUnit });
    return(
      <div className="trade">
        <Box
          title={'限价交易'}
          extra={<Link to='fee'>费率</Link>}
          >
            <Form layout={formLayout} className="trade-form" hideRequiredMark>
              <Row gutter={24}>
                 <Col span={12}>
                   <FormItem>
                     <div className='tip'>
                       <div>可用：<Filter value={sellSideAssets[0].available} keyname="price"/> {buyUnit}</div>
                       <div><Link to=''>充币</Link></div>
                     </div>
                   </FormItem>
                   <FormItem
                     label="价格"
                   >
                     {getFieldDecorator('buyPrice', {
                       rules: [{ required: true }],
                     })(
                       <Input placeholder="价格" suffix={buyUnit} />
                     )}
                   </FormItem>
                    <FormItem
                      label="数量"
                    >
                      {getFieldDecorator('buyQuantity', {
                        rules: [{ required: true }],
                      })(
                        <Input placeholder="数量" suffix={sellUnit}/>
                      )}
                    </FormItem>
                    <FormItem>
                      <Slider
                        value={buyPercentKey}
                        onChange={(value: number) => {this.onPercentChange(value, 'buy', sellSideAssets[0].available)}}
                        marks={percent}
                        step={1}
                        tipFormatter={null}
                      />
                    </FormItem>
                    <FormItem>
                      <div className='tip'>
                        <div>交易额</div>
                        <div><Filter value={accMul(getFieldValue('buyPrice'), getFieldValue('buyQuantity'))} keyname="price" /> {buyUnit}</div>
                      </div>
                    </FormItem>
                    <FormItem>
                      <Button type={hasAccount ? "primary" : 'default'} onClick={(e: Event) => {this.handleSubmit(e, '1')}}  block style={{color: '#fff', border: 'none'}}>
                        {hasAccount ? `买入${sellUnit}` : <span><Link to=''>登录</Link> 或 <Link to=''>注册</Link> 开始交易</span>}
                      </Button>
                    </FormItem>
                 </Col>
                 <Col span={12}>
                   <FormItem>
                     <div className='tip'>
                       <div>可用：<Filter value={buySideAssets[0].available} keyname="price"/> {sellUnit}</div>
                       <div><Link to=''>充币</Link></div>
                     </div>
                   </FormItem>
                   <FormItem
                      label="价格"
                    >
                      {getFieldDecorator('sellPrice', {
                        rules: [{ required: true }],
                      })(
                        <Input placeholder="价格" suffix={sellUnit} />
                      )}
                    </FormItem>
                    <FormItem
                      label="数量"
                    >
                      {getFieldDecorator('sellQuantity', {
                        rules: [{ required: true }],
                      })(
                        <Input placeholder="数量" suffix={buyUnit}/>
                      )}
                    </FormItem>
                    <FormItem>
                      <Slider
                        value={sellPercentKey}
                        onChange={(value: number) => {this.onPercentChange(value, 'sell', buySideAssets[0].available)}}
                        marks={percent}
                        step={1}
                        tipFormatter={null}
                      />
                    </FormItem>
                    <FormItem>
                      <div className='tip'>
                        <div>交易额</div>
                        <div><Filter value={accMul(getFieldValue('sellPrice'), getFieldValue('sellQuantity'))} keyname="price" /> {sellUnit}</div>
                      </div>
                    </FormItem>
                    <FormItem>
                      <Button type={hasAccount ? "" : 'default'} onClick={(e: Event) => {this.handleSubmit(e, '2')}} block style={{background: '#DD4546', color: '#fff', border: 'none'}}>
                        {hasAccount ? `卖出${buyUnit}` : <span><Link to=''>登录</Link> 或 <Link to=''>注册</Link> 开始交易</span>}
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

function mapStateToProps(state: any) {
  return {
    accountInfoResponse: state.accountInfoResponse,
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
)(Trade);
