
import React from 'react'
import {
    Table,
    Card,
    message
} from 'antd';

import { connect } from 'dva';
import { getUpdateRecord } from '../../services/apps'


@connect(({ user }) => ({
    user
}))
class UpdateRecord extends React.Component {

    constructor() {
        super()
        this.state = {
            list: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        this.setState({
            loading: true
        })
        const { location: { query } } = this.props;
        let userId = this.props.user.info.id;
        let { data: res } = await getUpdateRecord(query.id, userId);
        if (res.code === 1) {
            this.setState({
                loading: false,
                list: res.data
            })
        } else {
            this.setState({
                loading: false
            })
            message.error(res.msg);
        }
    }



    render() {
        const { list, loading } = this.state;

        const columns = [
            {
                title: '应用名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '版本号',
                dataIndex: 'version',
                key: 'version',
            },
            {
                title: '更新时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
        ]
        //设置表格内容 居中显示
        columns.map(item => item.align = "center");

        
        return <Card bordered={false}>
            <Table rowKey='id' loading={loading} dataSource={list} columns={columns} pagination={false} />
        </Card>
    }
}

export default UpdateRecord;