
import React from 'react'
import {
    Table,
    Card,
    message
} from 'antd';
// import { connect } from 'dva';
import { getDepositRecord } from '../../services/apps'


// @connect((state) => {
//     return {
//       list: state.depositRecord.list,
//     };
// }, (dispatch) => ({
//     getAllPackage() {
//         dispatch({ type: 'depositRecord/getAllPackages' })
//     }
// }))
class DepositRecord extends React.PureComponent {

    constructor() {
        super()
        this.state = {
            list: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.getList();
        // this.props.getAllPackage()
    }

    getList = async () => {
        this.setState({
            loading: true
        })
        const { location: { query } } = this.props;
        let { data: res } = await getDepositRecord(query.id);
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
        // console.log(this.props.list,'lisssss')
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'orderNo',
                key: 'orderNo',
            },
            {
                title: '充值时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '充值金额',
                dataIndex: 'money',
                key: 'money',
                render: (money) => {
                    return money.toFixed(2) + '元'
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

export default DepositRecord;