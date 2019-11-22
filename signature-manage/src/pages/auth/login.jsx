/**
 * title: 登录
 */

import React from 'react'
import { connect } from "dva";
import {
  Avatar,
  Alert,
  Button,
  Form,
  Icon,
  Input,
  Checkbox,
} from "antd";
import Link from 'umi/link';

@connect(({ user, loading }) => ({ user, loading }))
class Login extends React.Component {
  componentDidMount() {
    // console.log(this.props,'login props');
  }
  render() {
    const { message, token } = this.props.user;
    return (
      <>
        <Avatar size={64} icon="user" style={{ display: 'block', margin: '0rem auto 2rem' }} />
        {(token === null && message !== null) &&
          <Alert closable
            message={this.props.user.message || '登录失败'} type="error" showIcon
            style={{ margin: '0rem auto 1rem' }} />
        }
        <WrappedNormalLoginForm
          loading={this.props.loading.effects['user/login']} // 此段代码返回值为 boolean 
          submit={(form) => {
            // console.log('Received values of form: ', form);
            this.props.dispatch({ // 此段代码 触发 request 事件
              type: 'user/login', // 执行 namespace(user) effects(异步任务处理)下的 login 方法
              payload: form
            })
          }} />
      </>
    )
  }
}



class NormalLoginForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { submit } = this.props;
        submit(values);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input allowClear size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input allowClear size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="密码"
              type="password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={this.props.loading}>登录</Button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {getFieldDecorator("remenber", {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>自动登录</Checkbox>)}

            <Link to="/auth/register">立即注册</Link>
          </div>
        </Form.Item>
      </ Form >
    )
  }
}
// 使用 Form.create 处理后的表单具有自动收集数据并校验的功能。
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default (Login)