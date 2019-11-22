/**
 * levels:
 *  - 1
 */

import React from 'react';
import { Table, Card, Input, Button, DatePicker, Modal } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { getAccountDevices, deleteDevice } from '../../services/account';

const { RangePicker } = DatePicker;
const { confirm } = Modal;
export default class AccountDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      deviceList: [],
      name: '',
      startTime: '',
      endTime: '',
      timeValue: 0,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.getList('');
  }
  getList = name => {
    const {
      location: { query },
    } = this.props;
    this.setState({ loading: true });
    let {startTime,endTime} = this.state;
      getAccountDevices(query.id, name, startTime, endTime)
      .then(({ data: res }) => {
        this.setState({
          deviceList: res.data,
        });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
    
  };
  reset = () => {
    this.setState({
      name: '',
      startTime: '',
      endTime: '',
      timeValue: 0,
      selectedRowKeys: [],
    });
  };
  onDateChange = (dates, dateStrings) => {
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    this.setState(
      {
        timeValue: dates,
        startTime: dateStrings[0]? (dateStrings[0]): "",
        endTime: dateStrings[0]? (dateStrings[1]): "",
      },
      () => {
        console.log(
          'From: ',
          (dateStrings[0]),
          ', to: ',
          (dateStrings[1]),
          this.state,
        );
      },
    );
  };
  deleteDevice = () => {
      let { selectedRowKeys} = this.state;
      if (selectedRowKeys.length<1)return;
      let _this = this;
      confirm({
        title: '清除设备？',
        content: '确定清除设备？',
        cancelText: '取消',
        okText: '确定',
        onOk() {
            let ids = selectedRowKeys.join(',');
            // console.log(sureArr, 'sureArr');
            deleteDevice({ids}).then(_=>{
                _this.setState({ selectedRowKeys: [] });
                _this.getList('');
            })
        },
        onCancel() {
        },
      });
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys, name, deviceList, timeValue } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [
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
        //   return filterDate(create_time) ? filterDate(create_time) : '-';
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
      <div>
        <Card bordered={false}>
          <div className={styles.searchline}>
            {/* <div className={styles.inps}>
                <div className={styles.labels}>账号:</div>
                <Input
                placeholder="请输入账号"
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
                />
            </div> */}
            <div className={styles.searchDate}>
              <div className={styles.labels}>日期:</div>
              <RangePicker
                value={timeValue}
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={this.onDateChange}
              />
            </div>
            <div className={styles.inps}>
              <div className={styles.labels}>应用名称:</div>
              <Input
                placeholder="请输入应用名称"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>

            <Button
              className={styles.labels}
              type="primary"
              icon="search"
              onClick={() => {
                this.getList(name);
              }}
            >
              搜索
            </Button>
            <Button type="primary" className={styles.labels} onClick={() => this.reset()}>
              重置
            </Button>
            <Button
              onClick={() => {
                this.deleteDevice();
              }}
              disabled={selectedRowKeys.length === 0}
            >
              清除设备
            </Button>
          </div>

          <Table
            rowKey={obj => obj.id}
            loading={loading}
            rowSelection={rowSelection}
            className={styles.mgt20}
            dataSource={deviceList}
            columns={columns}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}
