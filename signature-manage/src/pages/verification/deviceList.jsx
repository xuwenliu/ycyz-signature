import React from 'react';
import { Table, Card, Input, Button } from 'antd';
import { connect } from 'dva';

// import router from 'umi/router';
import styles from './index.less';
// import { filterDate } from '../../commonfn';
import { searchDevice } from '../../services/account';


@connect(({ user }) => ({
  user
}), (dispatch) => ({
  changeTab(tab) {
    dispatch({ type: 'verificationIndex/changeTabs', payload: { tab } })
  }
}))
class DeviceList extends React.Component {
  constructor() {
    super();
    this.state = {
        loading: true,
      deviceList: [],
      username: '',
      useAppName: '',
    };
  }
  componentDidMount() {
    this.getList()
    this.props.user.backBtnDom && this.props.user.backBtnDom.addEventListener('click', () => {
      this.props.changeTab('1')
    })
  }

  getList = (username, useAppName) => {
      this.setState({ loading: true})
    searchDevice({
      name: useAppName,
      // encodeURIComponent(useAppName),
      username,
    })
      .then(({ data: res }) => {
        this.setState({ deviceList: res.data });
          this.setState({ loading: false })
      })
        .catch(err => { this.setState({ loading: false }) });
  };
  reset = () => {
    this.setState({
      username: '',
      useAppName: '',
    });
  };


  render() {
      const { username, useAppName, deviceList, loading } = this.state;
    const columns = [
      {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
      },
      {
        title: '应用名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '应用ID',
        dataIndex: 'deviceId',
        key: 'deviceId',
        align: 'center',
        width: 230,
      },
      {
        title: '日期',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        // render: create_time => {
        //   return filterDate(create_time);
        // },
      },

      {
        title: '设备号',
        dataIndex: 'udid',
        key: 'udid',
        align: 'center',
        width: 230,
      },
    ];
    return (
      <Card bordered={false}>
        <div className={styles.searchline}>
          <div className={styles.inps}>
            <div className={styles.labels}>账号:</div>
            <Input
              placeholder="请输入账号"
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div className={styles.inps}>
            <div className={styles.labels}>应用名称:</div>
            <Input
              placeholder="请输入应用名称"
              value={useAppName}
              onChange={e => this.setState({ useAppName: e.target.value })}
            />
          </div>

          <Button
            className={styles.labels}
            type="primary"
            icon="search"
            onClick={() => {
              this.getList(username, useAppName);
            }}
          >
            搜索
          </Button>
          <Button type="primary" onClick={() => this.reset()}>
            重置
          </Button>

        </div>
        <Table
          rowKey="id"
          loading={loading}
          className={styles.mgt20}
          dataSource={deviceList}
          columns={columns}
          pagination={false}
        />
      </Card>
    );
  }
}

export default DeviceList;
