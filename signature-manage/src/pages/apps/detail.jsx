import React from 'react'
import {
	Descriptions,
	Avatar,
	Button,
	Modal,
	InputNumber,
	Popconfirm,
	Icon,
	Tooltip,
	Typography,
	Popover,
	message
} from 'antd';

import { getDetailPackage, updateMaxCount, setMaxCount, removeApp } from '../../services/apps'
import QRCode from 'qrcode.react'
import router from 'umi/router';
import { connect } from 'dva';
@connect(({ user }) => ({
	user
}))
class AppsDetail extends React.Component {

	constructor() {
		super()
		this.state = {
			detail: {},
			qrcodeData: null,

			maxCountModal: false,
			maxCountModalLoading: false,
			resetCountModalLoading: false,
			inputMaxCount: 1,

			deleteing: false
		}
	}

	componentDidMount() {
		this.loadData();
	}

	async loadData() {
		const { location: { query } } = this.props;
		let { data: res } = await getDetailPackage(query.id);
		if (res.code === 1) {
			this.setState({
				detail: res.data,
				id: query.id
			})
			let Qr = document.getElementById('qrcode');
			this.setState({
				qrcodeData: Qr.toDataURL("image/png")
			})
		} else {
			message.error(res.msg);
		}
	}

	getClientDetailURL() {
		return `${window.ENV_APPURL}/detail/${this.state.id}`
	}

	addNum = async () => {
		if (this.state.inputMaxCount === 0) {
			this.setState({ maxCountModal: false })
			return;
		}
		this.setState({ maxCountModalLoading: true })
		let { data: res } = await updateMaxCount(this.state.id, this.state.inputMaxCount);
		if (res.code === 1) {
			this.setState((preState) => {
				return {
					...preState,
					maxCountModalLoading: false,
					maxCountModal: false,
					detail: {
						...preState.detail,
						totalCount: preState.detail.totalCount + this.state.inputMaxCount
					},
					inputMaxCount: 1
				}
			})
			message.success(res.msg);
		} else {
			this.setState({ maxCountModalLoading: false })
			message.error(res.msg);
		}
	}

	resetNum = async () => {
		this.setState({ resetCountModalLoading: true })

		let { data: res } = await setMaxCount(this.state.id, 0);
		if (res.code === 1) {
			this.setState((preState) => {
				return {
					...preState,
					resetCountModalLoading: false,
					detail: {
						...preState.detail,
						totalCount: 0
					}
				}
			})
			message.success(res.msg);
		} else {
			this.setState({ resetCountModalLoading: false })
			message.error(res.msg);
		}
	}

	render() {
		const { info } = this.props.user;
		const isManager = info.level === 1; // 管理员
		const { detail } = this.state;
		const downLoadDeviceContent = <div>
			<p>最大下载设备数：指当下载的设</p>
			<p>备数达到此数后，即不能再下载。</p>
			<p>一个设备下载多次只记录一次。</p>
		</div>
		const downLoadDevicelabel = <div>
			下载设备数
			<Popover placement="topLeft" content={downLoadDeviceContent}>
				<Button style={{ marginLeft: 10 }} shape="circle" icon="question-circle" >
				</Button>
			</Popover>
		</div>

		const downLoadNumberContent = <div>
			<p>下载次数：指下载应用的次数，</p>
			<p>每下载一次记录一次下载次数，</p>
			<p>一个设备下载多次，则记录为多次。</p>
		</div>
		const downLoadNumberlabel = <div>
			下载次数
			<Popover placement="topLeft" content={downLoadNumberContent}>
				<Button style={{ marginLeft: 10 }} shape="circle" icon="question-circle" >
				</Button>
			</Popover>
		</div>


		return (
			<div>
				{
					!isManager && <Button type="primary"
						style={{ marginBottom: 20 }}
						onClick={() => {
							router.push('/apps/android')
						}}>安卓上传</Button>
				}

				<Descriptions
					bordered
					column={2}
					style={{ background: '#fff' }}
					title={(
						<div className="ant-card-head-wrapper">
							<div className="ant-card-head-title">基本信息</div>
						</div>
					)}
				>
					<Descriptions.Item label="应用名称">{detail.name}</Descriptions.Item>
					<Descriptions.Item label="图标">
						{
							detail.icon && <Avatar src={detail.icon} shape="square" size="large" />
						}
					</Descriptions.Item>

					<Descriptions.Item label="应用版本">
						{detail.version}
						<Button
							size="small"
							type="primary"
							style={{ margin: '0 10px' }}
							onClick={() => {
								router.push({ pathname: '/apps/updateRecord', query: { id: detail.bundleIdentifier } })
							}}
						>版本更新记录</Button></Descriptions.Item>
					<Descriptions.Item label="系统版本">{detail.miniVersion}</Descriptions.Item>

					<Descriptions.Item label="应用ID">{detail.bundleIdentifier}</Descriptions.Item>
					<Descriptions.Item label={downLoadNumberlabel}>{detail.uuidCount}次</Descriptions.Item>

					<Descriptions.Item span={2} label={downLoadDevicelabel}>
						<span style={{ color: '#1890ff' }}>{detail.count}</span>/
							<span>{detail.totalCount}</span>
						{
							!isManager && <Button
								style={{ marginLeft: 10 }}
								size="small"
								type="primary"
								onClick={_ => this.setState({ maxCountModal: true })}
							>设置设备数</Button>
						}


						<Button
							size="small"
							type="primary"
							style={{ marginLeft: 10 }}
							onClick={() => {
								router.push({ pathname: '/apps/downloadInfo', query: { id: detail.id } })
							}}
						>下载详情</Button>
					</Descriptions.Item>

					<Descriptions.Item span={2} label="应用描述">{detail.summary}</Descriptions.Item>

					<Descriptions.Item span={2} label="应用截图">
						{
							detail.appimages1 && <Avatar src={detail.appimages1} shape="square" size="large" style={{ marginRight: 10 }} />
						}
						{
							detail.appimages2 && <Avatar src={detail.appimages2} shape="square" size="large" style={{ marginRight: 10 }} />
						}
						{
							detail.appimages3 && <Avatar src={detail.appimages3} shape="square" size="large" style={{ marginRight: 10 }} />
						}
						{
							detail.appimages4 && <Avatar src={detail.appimages4} shape="square" size="large" style={{ marginRight: 10 }} />
						}
						{
							detail.appimages5 && <Avatar src={detail.appimages5} shape="square" size="large" style={{ marginRight: 10 }} />
						}
						{
							detail.appimages6 && <Avatar src={detail.appimages6} shape="square" size="large" style={{ marginRight: 10 }} />
						}

					</Descriptions.Item>

				</Descriptions>

				<Descriptions
					bordered
					column={2}
					style={{ background: '#fff', marginTop: '30px' }}
					title={(
						<div className="ant-card-head-wrapper">
							<div className="ant-card-head-title">安装管理</div>
						</div>
					)}
				>
					<Descriptions.Item label="安装地址">
						<Button type="primary" size="small">
							<a href={this.getClientDetailURL()} target="_blank" rel="noopener noreferrer" >点击查看</a>
						</Button>
					</Descriptions.Item>
					<Descriptions.Item label="二维码">
						<QRCode
							style={{ display: 'none' }}
							id="qrcode"
							size={256}
							value={this.getClientDetailURL()}
						/>
						<img
							style={{ width: 100 }}
							src={this.state.qrcodeData} alt=""
						/>
					</Descriptions.Item>
				</Descriptions>

				<Descriptions
					bordered
					column={2}
					style={{ background: '#fff', marginTop: '30px' }}
					title={(
						<div className="ant-card-head-wrapper">
							<div className="ant-card-head-title">软件管理</div>
						</div>
					)}
				>
					<Descriptions.Item label="删除">
						<Popconfirm
							title="确定删除该软件？"
							icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
							okText="删除"
							cancelText="取消"
							onConfirm={_ => {
								this.setState({ deleteing: true })
								removeApp(this.state.id).then(res => {
									this.setState({ deleteing: false })
									message.info({ message: `已删除 "${this.state.name}"` })
									router.push('/apps')
								}).catch(err => { this.setState({ deleteing: false }) })
							}}
						>
							<Button type="danger" loading={this.state.deleteing}>
								<Icon type="delete" />
								删除软件
                </Button>
						</Popconfirm>
					</Descriptions.Item>
				</Descriptions>
				<Modal
					title="增加最大下载设备数"
					visible={this.state.maxCountModal}
					okText="确定"
					cancelText="取消"
					onOk={this.addNum}
					confirmLoading={this.state.maxCountModalLoading}
					onCancel={_ => this.setState({ maxCountModal: false })}
				>
					{/* <Typography.Title level={4}>设置为 0 时将不限制数量。</Typography.Title> */}

					<InputNumber
						// defaultValue={this.state.totalCount}
						value={this.state.inputMaxCount}
						min={1}
						step={1}
						formatter={value => parseInt(value) || 0}
						onChange={value => this.setState({ inputMaxCount: value || 0 })}
						disabled={this.state.maxCountModalLoading}
						style={{ display: 'block', width: '100%' }}
					/>
					<div style={{ marginTop: '10px' }}>
						<div>
							<Typography.Text>如设置1000，代表该应用下载设备数达到1000个后即不能再下载，设置为0则不限制下载设备数。</Typography.Text>
						</div>

						<Typography.Text>增加后的总下载数量: <Typography.Text strong>{detail.totalCount + this.state.inputMaxCount}</Typography.Text></Typography.Text>
						{detail.totalCount > 0 &&
							<Tooltip title="将最大下载总量重置为 0">
								<Button
									loading={this.state.resetCountModalLoading}
									style={{ marginLeft: '10px' }}
									onClick={this.resetNum}
								>重置</Button>
							</Tooltip>}
					</div>
				</Modal>
			</div>
		)
	}
}

export default AppsDetail;