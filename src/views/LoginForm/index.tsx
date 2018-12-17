import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select, message } from 'antd';
import * as api from '@/utils/api';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;

interface LoginFormProps {
  readonly onOk: () => void;
  readonly onCancel: () => void;
  readonly form: any;
  readonly dispatch: any;
};
interface LoginFormState {
  confirmLoading: boolean;
  leftTime: number;
}
let timer: any = null

@Form.create()

class LoginForm extends React.Component<LoginFormProps, LoginFormState>{
  constructor(props: LoginFormProps, context: any) {
    super(props, context);
    this.state = {
      confirmLoading: false,
      leftTime: 0,
    }
  }

  protected countDown = () => {
    this.setState({ leftTime: 60 });
    timer = setInterval(() => {
      if (!this.state.leftTime) {
        clearInterval(timer);
      } else {
        this.setState({ leftTime: this.state.leftTime - 1 });
      }
    }, 1000);
  }

  protected getCaptcha = () => {
    const mobile = this.props.form.getFieldValue('mobile')
    const mobile_prefix = this.props.form.getFieldValue('mobile_prefix')
    if(!mobile){
      return
    } else {
      api.getSmsVcode({mobile_prefix: mobile_prefix, mobile: mobile, type: '1'}).then((res: any) => {
        if(!res.succeed) {
          message.error(res.error_message);
        }else{
          this.countDown();
        }
      })
    }
  }

  protected handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState({
      confirmLoading: true,
    });
    const that = this;
    const { dispatch } = this.props;
    this.props.form.validateFields((err: any, values: any) => {
      console.log('values:', values);
      if (!err) {
        console.log('Received values of form: ', values);
        api.login({mobile_prefix: '+86', ...values}).then((res: any) => {
          console.log('res:', res)
          if(res.succeed){
            that.props.onCancel()
            dispatch({type: 'login request success', payload: res.data})
          }else {
            message.error(res.error_message);
          }
        })
      }
    });
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  public render(){
    const { getFieldDecorator } = this.props.form;
    const { leftTime } = this.state;
    const prefixSelector = getFieldDecorator('mobile_prefix', {
      initialValue: '+86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+86">+86</Option>
        <Option value="+87">+87</Option>
      </Select>
    );

    return(
      <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical" hideRequiredMark>
          <FormItem
            label="手机号"
            >
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            label="密码"
            >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem
            label="手机验证码"
            >
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('sms_code', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={8}>
                <Button onClick={this.getCaptcha} disabled={leftTime > 0} block>
                  {leftTime > 0 ? `${leftTime} s` : 'Get captcha'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row style={{marginTop:'10px'}}>
              <Col span={18}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  立即登录
                </Button>
              </Col>
              <Col span={6} style={{textAlign:'center'}}>
                <a className="login-form-forgot" href="">忘记密码</a>
              </Col>
            </Row>
          </FormItem>
        </Form>
    )
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}), dispatch),
  };
}

export default connect(
  mapDispatchToProps
)(LoginForm);
