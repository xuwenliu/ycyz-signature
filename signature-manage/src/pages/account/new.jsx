/**
 * levels:
 *  - 1
 */

import React from 'react'
import {
  Steps,
  Card,
  Button,
  Result,
  Form,
  Input,
  Upload,
  Icon,
  message,
  notification
} from 'antd';
import { insterAccount, uploadP12 } from "@/services/account"

import router from 'umi/router'
import { isNullOrUndefined } from 'util';
const { Step } = Steps;

// import router from 'umi/router';

export default class AccountNew extends React.Component {
  constructor() {
    super()

    this.state = {
      account: 0,
      current: 0,
      loading: false
    }
  }
  componentDidMount() {
    const { location: { query } } = this.props;
    if (!isNullOrUndefined(query.id)) {
      this.setState({
        account: query.id,
        current: 1
      })
    }
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
    console.log(this.state);
  }

  render() {
    const { current } = this.state
    return (
      <div>
        <Card
          bordered={false}
          title={(
            <Steps current={current}>
              <Step title="填写开发者账号信息" />
              <Step title="上传证书文件" />
              <Step title="完成" />
            </Steps>
          )}
        >
          {current === 0 && (
            <InfoViewForm
              onSubmit={(res) => {
                console.log(res);
                this.setState({
                  account: res.data
                })
                this.next();
              }}
            />
          )}
          {current === 1 && (
            <>{this.state.account > 0 ?
              <P12View
                account={this.state.account}
                onSubmit={(values) => {
                  console.log(values);
                  this.next();
                }}
              />
              :
              (<div>获取账号信息失败</div>)}
            </>
          )}
          {current === 2 && (
            <Result
              status="success"
              title="添加账号成功"
              extra={
                <Button
                  block
                  type="primary"
                  onClick={_ => router.push({ pathname: '/account' })}
                >返回列表</Button>
              }
            />
          )}
        </Card>

      </div>
    );
  }
}

class InfoView extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  render() {
    const { onSubmit = (data) => { console.log(data) } } = this.props;

    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 4,
        },
      },
    };

    return (
      <Form
        {...formItemLayout}
        labelAlign="right"
        onSubmit={e => {
          e.preventDefault()
          console.log(e)
          this.props.form.validateFields((err, values) => {
            console.log(err, values)
            if (err) {
              return;
            }
            this.setState({
              loading: true,
            });
            insterAccount(values).then(({ data }) => {
              this.setState({
                loading: false,
              });
              onSubmit(data)
            }).catch(err => {
              this.setState({
                loading: false,
              });
              console.log(err)
            })
          })
        }}
      >
        <Form.Item label="开发者账号">
          {getFieldDecorator('account', {
            rules: [
              { required: true, message: '请填写开发者账号' }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="csr">
          {getFieldDecorator('csr', {
            rules: [
              { required: true, message: '请填写钥匙串导出的 certSigningRequest 文件内容' }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Issuer ID">
          {getFieldDecorator('iss', {
            rules: [
              { required: true, message: '请填写 https://appstoreconnect.apple.com/access/api 中的 Issuer ID' }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="密钥 ID">
          {getFieldDecorator('kid', {
            rules: [
              { required: true, message: '请填写 https://appstoreconnect.apple.com/access/api 中的 密钥 ID' }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="p8">
          {getFieldDecorator('p8', {
            rules: [
              { required: true, message: '请填写 https://appstoreconnect.apple.com/access/api 中的 下载 API 密钥' }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.state.loading}
          // style={{ width: "100%" }}
          >{this.state.loading ? '加载中...' : '下一步'}</Button>
        </Form.Item>
      </Form>
    )
  }
}
const InfoViewForm = Form.create({ name: 'InfoViewForm' })(InfoView)


class P12View extends React.Component {
  constructor() {
    super()
    this.state = {
      fileList: [],
      uploading: false,
    }
  }
  upload = _ => {
    const { account = 0, onSubmit = (data) => { console.log(data) } } = this.props;

    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('file', fileList[0]);

    this.setState({ uploading: true, });
    uploadP12(formData, account)
      .then(({ data: res }) => {
        console.log(res);
        this.setState({
          fileList: [],
          uploading: false,
        });
        notification.success({
          message: `上传成功`,
          duration: null
        });

        const { data } = res;
        onSubmit(data)
      })
      .catch(err => {
        console.log(err);
        this.setState({
          uploading: false,
        });
        notification.error({ message: '上传失败', duration: null });
      })

  }
  render() {
    return (
      <div>
        <h3>上传文件:</h3>
        <Upload.Dragger
          style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}
          onRemove={file => {
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            })
          }}
          beforeUpload={file => {
            const isType = file.name.endsWith('.p12')
            if (!isType) {
              message.error('请选择 p12 文件!');
              this.setState(state => ({
                fileList: [],
              }))
              return false
            }
            this.setState(state => ({
              fileList: [file],
            }));
            return false
          }}
          fileList={this.state.fileList}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="upload" />
          </p>
          <p>点击或拖拽选择 p12 文件</p>
        </Upload.Dragger>

        <Button
          type="primary"
          onClick={this.upload}
          style={{ marginTop: '30px' }}
          block
        >
          上传
        </Button>
      </div>
    )
  }
} 