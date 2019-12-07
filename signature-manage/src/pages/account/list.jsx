/**
 * levels:
 *  - 1
 */

import React from 'react'
import {
  Card,
  // Row,
  // Col,
  Button,
  List,
  Avatar,
  Popconfirm,
  Icon,
  notification
  // Tag
} from 'antd';
import { getAllAccount, removeAccount } from "@/services/account"
import router from 'umi/router';
import { isNullOrUndefined } from 'util';

class account_index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountList: []
    }
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {

    getAllAccount().then(res => {
      console.log(res);
      this.setState({ accountList: [...res.data.data] });
    }).catch(err => {
      console.log(err);
    })
  }
  toNewAccountPage() {
    router.push('/account/new')
  }

  render() {
    return (
      <div>
        <Card bordered={false}>
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={this.toNewAccountPage}
          >添加</Button>
        </Card>

        <Card bordered={false} style={{ marginTop: 10 }}>
          <List
            itemLayout="horizontal"
            dataSource={this.state.accountList}
            renderItem={item => {
              let isFinished = !isNullOrUndefined(item.p12)

              let actions = []
              if (isFinished === false) {
                actions.push(
                  <Button
                    type="danger"
                    onClick={_ => {
                      router.push({ pathname: '/account/new', query: { id: item.id } })
                    }}
                  >缺少 p12 文件</Button>
                )
              }
              actions.push(
                <Button
                  type="link"
                  onClick={_ => {
                    router.push({ pathname: '/account/detail', query: { id: item.id } })
                  }}
                >设备列表</Button>
              )
              actions.push(
                <Popconfirm
                  title="确定移除该账号？"
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  okText="移除"
                  cancelText="取消"
                  onConfirm={_ => {
                    removeAccount(item.id).then(res => {
                      notification.info({ message: `已移除 "${item.account}"` })
                      this.loadData();
                    }).catch(err => { console.log(err) })
                  }}
                >
                  <Button type="link">移除账号</Button>
                </Popconfirm>
              )
              return (
                <List.Item
                  actions={actions}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon="user" />}
                    title={<span>{item.account}</span>}
                    description={<><span>创建时间: {item.createTime}</span> <span>可用数量: {item.count}</span></>}
                  />
                </List.Item>
              )
            }
            }
          />
        </Card>
      </div >
    )
  }
}

export default account_index;