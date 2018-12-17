import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl } from 'react-intl';
import { message, Form, Input, Button, Row, Col, Slider, Modal } from 'antd';
import filter from 'lodash.filter';
import Filter from '@/Filter';
import { accMul, accDiv, accFloor } from '@/utils/calculate';
import emitter from '@/utils/events';
import * as RequestActions from '@/store/actions/request';
import Box from '@/components/Box';

import './index.less';


const confirm = Modal.confirm;

message.config({
  top: 180,
  duration: 3,
  maxCount: 3,
});

const debounce = (func, wait = 50, immediate = false) => {
  let timer, context, args
  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait);
  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

const FormItem = Form.Item;

export interface TradeProps {
  accountInfoResponse: any;
  activeContracts: any;
  ticker: any;
  symbol: string;
  form: any;
  actions: any;
  hasAccount: boolean;
  openLoginPopup: () => void;
  eventEmitter: any;
  intl: any,
}
export type TradeState = Readonly<any>;
@Form.create()
class Trade extends React.Component<TradeProps, TradeState> {
  constructor(props: TradeProps, context: any) {
    super(props, context);
    this.state = {
      formLayout: 'vertical',
      order: {Price: ''},
      buyPercentKey: 0,
      sellPercentKey: 0,
      percent: {0:'0', 25:'', 50:'', 75:'', 100:'100%'}
    };
    this.setPrice = false;
    this.eventEmitterOrder = null;
    this.eventEmitterSuccess = null;
    this.eventEmitterError = null;
  }
  protected onPercentChange = (percentKey: any, side: string, available: number, price: number) => {
    this.setState({ [`${side}PercentKey`]: percentKey });
    const { activeContracts } = this.props;
    console.log(side+'---'+percentKey);
    if(available > 0 && price > 0) {
      this.props.form.setFieldsValue({[`${side}Quantity`]: accFloor(accMul(accDiv(available, price), percentKey / 100), activeContracts.currentQuantityDecimal).toFixed(activeContracts.currentQuantityDecimal)})
    }
  }

  protected showConfirm = (side: any, order: any) => {
    const { actions } = this.props;
    confirm({
      title: `${side=== '1' ? '买入': '卖出'}订单确认?`,
      content: `当前${side=== '1' ? '买入': '卖出'}价格${side=== '1' ? '高于': '低于'}现价 ${side=== '1' ? '105%': '95%'} 是否确认下单？`,
      onOk() {
        debounce(actions.placeOrderRequest(order))
      },
      onCancel() {},
    });
  }

  protected handleSubmit = (e: Event, side: string, available: number) => {
    e.preventDefault();
    const { actions, symbol, ticker } = this.props;
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
        order.price = parseFloat(order.price);
        order.quantity = parseFloat(order.quantity);

        if(order.side === '1') {
          if(accMul(order.price, order.quantity) > available){
            this.error("quantum_feedback_insufficient_balance");
            return;
          }
          if(order.price > accMul(ticker.get('LastPrice'), 1.05)){
            this.showConfirm(order.side, order);
          }else {
            debounce(actions.placeOrderRequest(order))
          }
        } else {
          if(order.quantity > available){
            this.error("quantum_feedback_insufficient_balance");
            return;
          }
          if(order.price < accMul(ticker.get('LastPrice'), 0.95)){
            this.showConfirm(order.side, order);
          }else {
            debounce(actions.placeOrderRequest(order))
          }
        }
        this.props.form.resetFields()
      }
    });
  }

  protected success = (info: any) => {
    const { intl: { formatMessage } } = this.props
    message.success(formatMessage({id: info}));
  };

  protected error = (info: any) => {
    const { intl: { formatMessage } } = this.props
    message.error(formatMessage({id: info}));
  };

  componentWillReceiveProps(nextProps: TradeProps) {
    console.log('ticker',nextProps.ticker.get('LastPrice'))
    const { setFieldsValue } = this.props.form;
    if(nextProps.hasAccount && nextProps.ticker.get('LastPrice') > 0 && !this.setPrice ){
      setFieldsValue({'buyPrice': nextProps.ticker.get('LastPrice')})
      setFieldsValue({'sellPrice': nextProps.ticker.get('LastPrice')})
      this.setPrice = true;
    }
  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    // 组件装载完成以后声明一个自定义事件
    this.eventEmitterOrder = emitter.addListener('getPriceQuantity', (order) => {
      setFieldsValue({'buyPrice': order.Price});
      setFieldsValue({'sellPrice':  order.Price});
      setFieldsValue({'sellQuantity': order.TotalQty});
      setFieldsValue({'buyQuantity':  order.TotalQty});
    });
    this.eventEmitterClearForm = emitter.addListener('clearForm', () => {
      this.props.form.resetFields();
    });
    this.eventEmitterSuccess = emitter.addListener('showSuccessMessage', (message) => {
      this.success(message)
    });
    this.eventEmitterError = emitter.addListener('showErrorMessage', (message) => {
      this.error(message)
    });
  }
  componentWillUnmount() {
    emitter.removeListener(this.eventEmitterOrder);
    emitter.removeListener(this.eventEmitterClearForm);
    emitter.removeListener(this.eventEmitterSuccess);
    emitter.removeListener(this.eventEmitterError);
  }
  public render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { formLayout, percent, buyPercentKey, sellPercentKey } = this.state;
    const { accountInfoResponse, activeContracts, hasAccount } = this.props;
    const balanceArr = accountInfoResponse.get('balanceArr');
    const buySideAssets = filter(balanceArr, {currency: activeContracts.currentPriceUnit });
    const sellSideAssets = filter(balanceArr, {currency: activeContracts.currentQuantityUnit });
    const priceReg = new RegExp("^(\\-)*(\\d+)\\.(\\d{1,"+activeContracts.currentPriceDecimal+ "}).*$");
    const quantityReg = new RegExp("^(\\-)*(\\d+)\\.(\\d{1,"+activeContracts.currentQuantityDecimal+ "}).*$");
    return(
      <div className="trade" id="Trade">
        <Box
          title={'限价交易'}
          extra={<Link to='fee'>费率</Link>}
          >
            <Form layout={formLayout} className="trade-form" hideRequiredMark>
              <Row gutter={24}>
                 <Col span={12}>
                   <FormItem>
                     <div className='tip'>
                       <div>可用：<Filter value={buySideAssets[0].available} keyname={`decimal: ${activeContracts.currentPriceDecimal}`}/> {activeContracts.currentPriceUnit}</div>
                       <div><Link to=''>充币</Link></div>
                     </div>
                   </FormItem>
                   <FormItem
                     label="价格"
                   >
                     {getFieldDecorator('buyPrice', {
                       initialValue:'',
                       rules: [{
                         required: true,
                         message: '请输入价格',
                         pattern: new RegExp(/^[1-9]\d*.?|[0]\.\d*[1-9]$/)
                       }],
                       getValueFromEvent: (event) => {
                          return event.target.value.replace(/[^\d.]/g,'')
                          .replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
                          .replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
                          .replace(priceReg, '$1$2.$3')
                       },
                     })(
                       <Input placeholder="价格" suffix={activeContracts.currentPriceUnit} />
                     )}
                   </FormItem>
                    <FormItem
                      label="数量"
                    >
                      {getFieldDecorator('buyQuantity', {
                        initialValue:'',
                        rules: [{
                          required: true,
                          message: '数量输入错误',
                          pattern: new RegExp(/^[1-9]\d*.?|[0]\.\d*[1-9]$/)
                        }],
                        getValueFromEvent: (event) => {
                           return event.target.value.replace(/[^\d.]/g,'')
                           .replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
                           .replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
                           .replace(quantityReg, '$1$2.$3')
                        },
                      })(
                        <Input min={activeContracts.currentMinQuantity} placeholder="数量" suffix={activeContracts.currentQuantityUnit}/>
                      )}
                    </FormItem>
                    <FormItem>
                      <Slider
                        disabled={!hasAccount || buySideAssets[0].available === 0 || !getFieldValue('buyPrice')}
                        value={buyPercentKey}
                        onChange={(value: number) => {this.onPercentChange(value, 'buy', buySideAssets[0].available, getFieldValue('buyPrice'))}}
                        marks={percent}
                        step={1}
                        tipFormatter={null}
                      />
                    </FormItem>
                    <FormItem>
                      <div className='tip'>
                        <div>交易额</div>
                        <div><Filter value={accMul(getFieldValue('buyPrice'), getFieldValue('buyQuantity'))} keyname={`decimal: 8`} /> {activeContracts.currentPriceUnit}</div>
                      </div>
                    </FormItem>
                    <FormItem>
                      {hasAccount &&<Button type="primary" onClick={(e: Event) => {this.handleSubmit(e, '1', buySideAssets[0].available)}}  block style={{color: '#fff', border: 'none'}}>
                        买入{activeContracts.currentPriceUnit}
                      </Button>}
                      {!hasAccount && <div className="ant-btn ant-btn-default ant-btn-block" style={{ border: 'none'}}>
                        <a href="javascript:void(0);" onClick={this.props.openLoginPopup}>登录</a> 或 <Link to=''>注册</Link> 开始交易
                      </div>}
                    </FormItem>
                 </Col>
                 <Col span={12}>
                   <FormItem>
                     <div className='tip'>
                       <div>可用：<Filter value={sellSideAssets[0].available} keyname={`decimal: ${activeContracts.currentQuantityDecimal}`}/>  {activeContracts.currentQuantityUnit}</div>
                       <div><Link to=''>充币</Link></div>
                     </div>
                   </FormItem>
                   <FormItem
                      label="价格"
                    >
                      {getFieldDecorator('sellPrice', {
                        initialValue:'',
                        rules: [{
                          required: true,
                          message: '请输入价格',
                          pattern: new RegExp(/^[1-9]\d*.?|[0]\.\d*[1-9]$/)
                        }],
                        getValueFromEvent: (event) => {
                           return event.target.value.replace(/[^\d.]/g,'')
                           .replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
                           .replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
                           .replace(priceReg, '$1$2.$3')
                        },
                      })(
                        <Input placeholder="价格" suffix={activeContracts.currentPriceUnit} />
                      )}
                    </FormItem>
                    <FormItem
                      label="数量"
                    >
                      {getFieldDecorator('sellQuantity', {
                        initialValue:'',
                        rules: [{
                          required: true,
                          message: '数量输入错误',
                          pattern: new RegExp(/^[1-9]\d*.?|[0]\.\d*[1-9]$/)
                        }],
                        getValueFromEvent: (event) => {
                           return event.target.value.replace(/[^\d.]/g,'')
                           .replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
                           .replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
                           .replace(quantityReg, '$1$2.$3')
                        },
                      })(
                        <Input min={activeContracts.currentMinQuantity} placeholder="数量" suffix={activeContracts.currentQuantityUnit}/>
                      )}
                    </FormItem>
                    <FormItem>
                      <Slider
                        value={sellPercentKey}
                        disabled={!hasAccount || sellSideAssets[0].available === 0 || !getFieldValue('sellPrice')}
                        onChange={(value: number) => {this.onPercentChange(value, 'sell', sellSideAssets[0].available, 1)}}
                        marks={percent}
                        step={1}
                        tipFormatter={null}
                      />
                    </FormItem>
                    <FormItem>
                      <div className='tip'>
                        <div>交易额</div>
                        <div><Filter value={accMul(getFieldValue('sellPrice'), getFieldValue('sellQuantity'))} keyname={`decimal: 8`} /> {activeContracts.currentPriceUnit}</div>
                      </div>
                    </FormItem>
                    <FormItem>
                      {hasAccount &&<Button type="primary" onClick={(e: Event) => {this.handleSubmit(e, '2', sellSideAssets[0].available)}}  block style={{background: '#DD4546', color: '#fff', border: 'none'}}>
                        卖出{activeContracts.currentQuantityUnit}
                      </Button>}
                      {!hasAccount && <div className="ant-btn ant-btn-default ant-btn-block" style={{ border: 'none'}}>
                        <a href="javascript:void(0);" onClick={this.props.openLoginPopup}>登录</a> 或 <Link to=''>注册</Link> 开始交易
                      </div>}
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
    activeContracts: state.activeContracts,
    ticker: state.ticker,
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
)(injectIntl(Trade));
