/**
 * title: 注册
 */

import React from 'react'
import {
  Avatar,
  // Alert,
  Button,
  Form,
  Icon,
  Input,
  notification
  // Checkbox,
} from "antd";
import Link from 'umi/link';
import { register } from '../../services/user'
import router from 'umi/router';



class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      errMsg: null
    }
  }
  componentDidMount() {
    // console.log(this.props);
  }
  render() {
    // const { message, token } = this.props;
    return (
      <>
        <Avatar size={64} icon="user" style={{ display: 'block', margin: '0rem auto 2rem' }} />
        {/* {(token === null && message !== null) &&
          <Alert closable
            message={this.props.user.message || '登录失败'} type="error" showIcon
            style={{ margin: '0rem auto 1rem' }} />
        } */}
        <WrappedRegisterLoginForm
          // loading={this.props.loading.effects['user/login']}
          submit={({ username, password }) => {
            this.setState({ loading: true })
            register(username, password).then(({ data }) => {
              // console.log(res)
              notification.success({
                message: data.msg,
                duration: 10,
              })
              router.push('/auth/login')
            }).catch(err => {
            }).finaly(_ => {
              this.setState({ loading: false })
            })
          }} />
      </>
    )
  }
}

class NormalRegisterForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { submit } = this.props;
        submit(values);
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} >
        <Form.Item >
          {getFieldDecorator('username', {
            rules: [
              { min: 4, message: '长度应为 4 个字符以上' },
              { required: true, message: '请输入用户名' }
            ]
          })(
            <Input allowClear size="large"
              autoComplete="off"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请设置用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { min: 4, message: '长度应为 4 个字符以上' },
              { required: true, message: '请输入密码' }
            ]
          })(
            <Input allowClear size="large"
              autoComplete="new-password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请设置登录密码"
              type="password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请再次输入密码' },
              { validator: this.compareToFirstPassword, },
            ]
          })(
            <Input allowClear size="large"
              autoComplete="new-password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请再次输入登录密码"
              type="password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={this.props.loading}>注册</Button>
          <Button type="link" block><Link to="/auth/login">已有帐号, 前往登录</Link></Button>
        </Form.Item>
      </ Form >
    )
  }
}
const WrappedRegisterLoginForm = Form.create({ name: 'normal_register' })(NormalRegisterForm);


export default (Login)