import React from 'react'
import router from 'umi/router'

import { removeApp } from '@/services/apps'
import { connect } from 'dva';
import {
	Card,
	Button,
	Table,
	Divider,
	Modal,
	message,
	Tooltip
} from 'antd';
const { confirm } = Modal;
@connect((state) => {
	return {
		list: state.appslist.list,
		loading: state.loading.models.appslist
	}
}, (dispatch) => ({
	getAllPackage() {
		dispatch({ type: 'appslist/getAllPackage' })
	}
}))
class List extends React.Component {
	componentDidMount() {
		this.props.getAllPackage();
	}

	toNewAppPage() {
		router.push('/apps/new');
	}

	delete = (id) => {
		let _this = this
		confirm({
			title: '删除应用？',
			content: '确定删除应用吗？',
			cancelText: '取消',
			okText: '确定',
			onOk() {
				removeApp(id * 1).then(res => {
					message.success('删除应用成功！');
					_this.props.getAllPackage();
				});
			},
			onCancel() { },
		});
	};

	goDetail = (id) => {
		router.push({ pathname: '/apps/detail', query: { id } });
	}

	goUpdate = (id) => {
		router.push({ pathname: '/apps/new', query: { id } });
	}

	render() {
		let { list, loading } = this.props;

		const columns = [
			{
				title: '应用图标',
				dataIndex: 'icon',
				key: 'icon',
				align: 'center',
				render: (icon) => {
					return <span>
						<img src={icon} alt="" style={{ maxWidth: "50px" }} />
					</span>
				}
			},
			{
				title: '应用名称',
				dataIndex: 'name',
				key: 'name',
				align: 'center',
				render: (text, record) => {
					return <Button onClick={() => this.goDetail(record.id)} type="link">{record.name}</Button>
				}
			},
			{
				title: '版本号',
				dataIndex: 'buildVersion',
				key: 'buildVersion',
				align: 'center',
			},
			{
				title: '应用ID',
				dataIndex: 'userId',
				key: 'userId',
				align: 'center',
			},
			{
				title: '最大下载设备数',
				dataIndex: 'totalCount',
				key: 'totalCount',
				align: 'center',
			},
			{
				title: '下载设备数',
				dataIndex: 'count',
				key: 'count',
				align: 'center',
			},
			{
				title: '操作',
				dataIndex: 'action',
				key: 'action',
				align: 'center',
				render: (text, record) => {
					return <span>
						<Tooltip title="应用详情">
							<Button size="small" type="primary" icon="info-circle" onClick={() => this.goDetail(record.id)} />
						</Tooltip>
						<Divider type="vertical" />
						<Tooltip title="更新应用">
							<Button size="small" type="primary" icon="edit" onClick={() => this.goUpdate(record.id)} />
						</Tooltip>
						<Divider type="vertical" />
						<Tooltip title="删除">
							<Button size="small" type="danger" icon="delete" onClick={() => this.delete(record.id)} />
						</Tooltip>
					</span>
				}
			},
		];
		return (
			<>
				<Card bordered={false} style={{ marginBottom: 10 }}>
					<Button
						type="dashed"
						style={{ width: '100%', marginBottom: 8 }}
						icon="plus"
						onClick={this.toNewAppPage}
					>
						添加
          			</Button>
				</Card>

				<Card bordered={false} style={{ marginBottom: 10 }}>
					<Table
						loading={loading}
						rowKey='id'
						dataSource={list}
						columns={columns}
						pagination={false}
					/>
				</Card>
			</>
		);
	}
}

export default List;