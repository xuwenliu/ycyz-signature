
import React from 'react'
import {
    Table,
    Card,
    message
} from 'antd';

import { getDownloadInfo } from '../../services/apps'


class DownloadInfo extends React.Component {

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
            loading: true,
        })
        const { location: { query } } = this.props;
        let { data: res } = await getDownloadInfo(query.id);
        if (res.code === 1) {
            this.setState({
                loading: false,
                list: res.data
            })
        } else {
            this.setState({
                loading: false,
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
                title: '日期',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '设备号',
                dataIndex: 'deviceId',
                key: 'deviceId',
            },
            {
                title: '消费金额',
                dataIndex: 'consume',
                key: 'consume',
                render: (consume) => {
                    if (consume) {
                        return consume.toFixed(2) + '元'
                    } else {
                        return '0.00元';
                    }
                }
            },

        ]
        
        //设置表格内容 居中显示
        columns.map(item => item.align = "center");

        return <Card bordered={false}>
            <Table rowKey='id' loading={loading} dataSource={list} columns={columns} pagination={false} />
        </Card>
    }
}

export default DownloadInfo;