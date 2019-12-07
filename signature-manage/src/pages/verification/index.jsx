/**
 * levels:
 *  - 1
 */

import React from 'react';
import {
	Tabs,
	Switch,
	Input,
	Button,
	Select,
	Card,
	Table,
	Divider,
	Modal,
	Form,
	message,
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import {
	getUncheckedUsers,
	getCheckedUsers,
	confirmUser,
	getUnPassUsers,
	userChangeStatus,
	searchUser,
	addMoney,
	updateChargeMoney
} from '../../services/user';

const { Option } = Select;
const { confirm } = Modal;

const InputForm = Form.create({
	name: 'InputForm',
	onFieldsChange(props, changedFields) {
		props.onChange(changedFields);
	},
	mapPropsToFields(props) {
		return {
			moneys: Form.createFormField({
				...props.moneys,
				value: props.moneys.value,
			}),
		};
	},
})(props => {
	const { getFieldDecorator } = props.form;
	return (
		<Form layout="inline" style={{ textAlign: 'center' }}>
			<Form.Item label="金额">
				{getFieldDecorator('moneys', {
					rules: [{ required: true, message: '请填写充值金额' }],
				})(<Input />)}
			</Form.Item>
			<span style={{ lineHeight: '40px' }}>元</span>
		</Form>
	);
});





@connect((state) => {
	return {
		tab: state.verificationIndex.tab,
	};
}, (dispatch) => ({
	changeTab(tab) {
		dispatch({ type: 'verificationIndex/changeTabs', payload: { tab } })
	}
}))
class Verification extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			uncheckedUsers: [],
			checkedUsers: [],
			checkUnPassUsers: [],
			username: '',
			accountStatus: 2,
			addMoneyUserName: '',
			activeKey: '0',
			tabs: 0,
			fields: {
				moneys: {
					value: '',
				},
			},
			showEditChargeMoney: false,
			id: 0,
			submitChargeMoneyloading:false
		};
		this.accountStatusList = [
			{
				key: 2,
				value: '全部',
			},
			{
				key: 1,
				value: '启用',
			},
			{
				key: 0,
				value: '禁用',
			},
		];
	}
	componentDidMount() {
		if (this.props.tab === "1") {
			this.setState({ activeKey: "1" });
		}
		this.setState({ loading: true });
		getUncheckedUsers()
			.then(({ data: res }) => {
				this.uncheckedUsers = res.data.map(item => {
					item.key = item.id;
					return item;
				});
				return getCheckedUsers();
			})
			.then(({ data: res }) => {
				this.checkedUsers = res.data.map(item => {
					item.key = item.id;
					return item;
				});
				return getUnPassUsers();
			})
			.then(({ data: res }) => {
				this.checkUnPassUsers = res.data.map(item => {
					item.key = item.id;
					return item;
				});
				this.setState({
					checkUnPassUsers: this.checkUnPassUsers,
					uncheckedUsers: this.uncheckedUsers,
					checkedUsers: this.checkedUsers,
					loading: false,
					visible: false,
				});
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	}

	handleChange = value => {
		this.setState({ accountStatus: value });
	};
	reset = () => {
		this.setState({ accountStatus: 2, username: '' });
	};
	getList = (status, username) => {
		this.setState({ loading: true, tabs: status, username });
		if (status === 0) {
			searchUser({
				username,
				status,
				type: 2,
			})
				.then(({ data: res }) => {
					this.setState({ uncheckedUsers: res.data });
				})
				.catch(err => {
					this.setState({ loading: false });
				});
		} else if (status === 1) {
			searchUser({
				username,
				status: 2,
				type: this.state.accountStatus,
			})
				.then(({ data: res }) => {
					this.setState({ checkedUsers: res.data });
				})
				.catch(err => {
					this.setState({ loading: false });
				});
		} else if (status === 2) {
			searchUser({
				username,
				status: 3,
				type: 2,
			})
				.then(({ data: res }) => {
					this.setState({ checkUnPassUsers: res.data });
				})
				.catch(err => {
					this.setState({ loading: false });
				});
		}
		this.setState({ loading: false });
	};
	handleFormChange = changedFields => {
		this.setState(({ fields }) => ({
			fields: { ...fields, ...changedFields },
		}));
	};

	addMoneys = () => {
		let money = this.state.fields.moneys.value;
		if (!money || money * 1 === 0) {
			return message.error('输入金额不正确');
		}
		addMoney({ username: this.state.addMoneyUserName, money })
			.then(res => {
				message.success('余额充值成功');
				this.getList(this.state.tabs, this.state.username);
				this.resetAddMoney(false);
			})
	};

	resetAddMoney = status => {
		this.setState({
			visible: status,
			fields: {
				moneys: {
					value: '',
				},
			},
		});
	};

	addChargeMoney = () => {

		this.chargeMoneyForm.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({
					submitChargeMoneyloading: true
				})
				let { data: res } = await updateChargeMoney({
					id: this.state.id,
					chargeMoney: values.chargeMoney,
				});
				if (res.code === 1) {
					this.resetChargeMoney();
					this.getList(this.state.tabs, '');
					message.success(res.msg);
				} else {
					message.error(res.msg);
				}
				this.setState({
					submitChargeMoneyloading: false
				})
			}
		})
	}

	resetChargeMoney = () => {
		this.setState({
			showEditChargeMoney: false
		})
		this.chargeMoneyForm.props.form.resetFields();
	}

	confirms = (status, item) => {
		let vals = status === 1 ? 2 : status === 2 ? 3 : null;
		let content = status === 1 ? '确定通过审核吗？' : status === 2 ? '确定拒绝吗？' : null;
		let msgs = status === 1 ? '成功通过审核!' : status === 2 ? '已通过拒绝操作!' : null;
		let _this = this;
		confirm({
			title: '提示',
			content: content,
			cancelText: '取消',
			okText: '确定',
			onOk() {
				confirmUser(item.id, vals)
					.then(res => {
						message.success(msgs);
						_this.getList(_this.state.tabs, '');
					})
					.catch(err => {
					});
			},
			onCancel() { },
		});
	};

	render() {
		let accountList = [];
		this.accountStatusList.forEach((item, i) => {
			accountList.push(
				<Option key={i.toString()} value={item.key}>
					{item.value}
				</Option>,
			);
		});
		const {
			uncheckedUsers,
			checkedUsers,
			checkUnPassUsers,
			visible,
			fields,
			username,
			activeKey,
			showEditChargeMoney,
			chargeMoney,
			submitChargeMoneyloading
		} = this.state;

		const passColumns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
				align: 'center',
			},
			{
				title: '注册时间',
				dataIndex: 'createTime',
				key: 'createTime',
				align: 'center',
			},
			{
				title: '单次收费金额',
				dataIndex: 'chargeMoney',
				key: 'chargeMoney',
				align: 'center',
				render: (text, record) => {
					return <Button onClick={() => {
						this.setState({
							showEditChargeMoney: true,
							chargeMoney: record.chargeMoney,
							id: record.id
						})
					}} type="link">{record.chargeMoney}</Button>
				}
			},
			{
				title: '账户余额',
				dataIndex: 'money',
				key: 'money',
				align: 'center',
				render: val => {
					return (val * 1).toFixed(2);
				},
			},
			{
				title: '账号状态',
				dataIndex: 'status',
				key: 'status',
				align: 'center',
				render: (level, item) => {
					this.vall = level === 1 ? true : level === 0 ? false : false;
					this.loading = false;
					return (
						<Switch
							checkedChildren="启用"
							unCheckedChildren="禁用"
							checked={this.vall}
							loading={this.loading}
							onChange={val => {
								this.loading = true;
								level = level === 0 ? 1 : 0;
								userChangeStatus({ id: item.id, status: level })
									.then(res => {
										this.loading = false;
										this.vall = val ? 1 : 0;
										this.setState(preState => {
											let okitem = preState.checkedUsers.map(items => {
												if (items.id === item.id) {
													items.status = this.vall;
												}
												return items;
											});
											message.success('操作成功！');
											return {
												...preState,
												checkedUsers: okitem,
											};
										});
									})
									.catch(_ => {
										this.setState({ loading: false });
									});
							}}
						/>
					);
				},
			},
			{
				title: '操作',
				dataIndex: 'doit',
				key: 'doit',
				align: 'center',
				render: (_, item) => {
					return (
						<span>
							<Button
								type="primary"
								size="small"
								onClick={() => {
									this.setState({ addMoneyUserName: item.username });
									this.resetAddMoney(true);
								}}
							>
								余额充值
              				</Button>
							<Divider type="vertical" />
							<Button
								type="primary"
								size="small"
								onClick={() => {
									router.push({ pathname: '/verification/deviceList', query: { username: item.username, name: '' } });
								}}
							>
								查看
              				</Button>
						</span>
					);
				},
			},
		];

		const unpassColumns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
				align: 'center',
			},
			{
				title: '注册时间',
				dataIndex: 'createTime',
				key: 'createTime',
				align: 'center',
				// render: val => {
				// 	return filterDate(val);
				// },
			},
			{
				title: '账户余额',
				dataIndex: 'money',
				key: 'money',
				align: 'center',
				render: val => {
					return val.toFixed(2);
				},
			},
			{
				title: '账号状态',
				dataIndex: 'status',
				key: 'status',
				align: 'center',
				render: val => {
					return '--';
				},
			},
		];

		const waitpassColumns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
				align: 'center',
			},
			{
				title: '注册时间',
				dataIndex: 'createTime',
				key: 'createTime',
				align: 'center',
				// render: val => {
				// 	return filterDate(val);
				// },
			},
			{
				title: '账户余额',
				dataIndex: 'money',
				key: 'money',
				align: 'center',
				render: val => {
					return val.toFixed(2);
				},
			},
			{
				title: '账号状态',
				dataIndex: 'status',
				key: 'status',
				align: 'center',
				render: val => {
					return '--';
				},
			},
			{
				title: '操作',
				dataIndex: 'todoit',
				key: 'todoit',
				align: 'center',
				render: (_, item) => {
					return (
						<span>
							<Button
								type="primary"
								size="small"
								onClick={() => this.confirms(1, item)}
							>
								通过
              				</Button>
							<Divider type="vertical" />
							<Button
								type="danger"
								size="small"
								onClick={() => this.confirms(2, item)}
							>
								拒绝
              				</Button>
						</span>
					);
				},
			},
		];
		return (
			<Card
				bordered={false}
				bodyStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}
			>
				<Tabs
					activeKey={activeKey}
					style={{ background: '#fff', padding: '0 25px', minHeight: '100%' }}
					onChange={value => {
						this.reset();
						this.getList(value * 1, username);
						this.setState({ activeKey: value, username: '' });
						this.props.changeTab(value)
					}}
				>
					<Tabs.TabPane tab="待审核" key="0">
						<div>
							<div className={styles.searchline}>
								<div className={styles.inps}>
									<div className={styles.labels}>用户名:</div>
									<Input
										placeholder="请输入用户名"
										value={this.state.username}
										onChange={e => this.setState({ username: e.target.value })}
									/>
								</div>
								<Button
									className={styles.labels}
									type="primary"
									icon="search"
									onClick={() => this.getList(0, username)}
								>
									搜索
              					</Button>
								<Button type="primary" onClick={() => this.reset()}>
									重置
              					</Button>
							</div>

							<Table
								rowKey={obj => obj.id}
								loading={this.state.loading}
								className={styles.mgt20}
								dataSource={uncheckedUsers}
								columns={waitpassColumns}
								pagination={false}
							/>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="已通过" key="1">
						<div>
							<div className={styles.searchline}>
								<div className={styles.inps}>
									<div className={styles.labels}>用户名:</div>
									<Input
										placeholder="请输入用户名"
										value={this.state.username}
										onChange={e => this.setState({ username: e.target.value })}
									/>
								</div>
								<div className={styles.selectline}>
									<div className={styles.labels}>账号状态: </div>
									<Select
										value={this.state.accountStatus}
										defaultValue="全部"
										style={{ width: 120 }}
										onChange={val => this.handleChange(val)}
									>
										{accountList}
									</Select>
								</div>
								<Button
									className={styles.labels}
									type="primary"
									icon="search"
									onClick={() => this.getList(1, username)}
								>
									搜索
              					</Button>
								<Button type="primary" onClick={() => this.reset()}>
									重置
              					</Button>
							</div>

							<Table
								rowKey={obj => obj.id}
								loading={this.state.loading}
								className={styles.mgt20}
								dataSource={checkedUsers}
								columns={passColumns}
								pagination={false}
							/>
							<Modal
								centered={true}
								title="余额充值"
								visible={visible}
								onOk={() => this.addMoneys()}
								onCancel={() => this.resetAddMoney(false)}
							>
								<InputForm {...fields} onChange={this.handleFormChange} />
							</Modal>

							<Modal
								confirmLoading={submitChargeMoneyloading}
								centered={true}
								title="单次下载收费金额"
								visible={showEditChargeMoney}
								onOk={this.addChargeMoney}
								onCancel={this.resetChargeMoney}
							>
								<ChargeMoneyForm chargeMoney={chargeMoney} wrappedComponentRef={(money) => { this.chargeMoneyForm = money; }} />
							</Modal>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="已拒绝" key="2">
						<div>
							<div className={styles.searchline}>
								<div className={styles.inps}>
									<div className={styles.labels}>用户名:</div>
									<Input
										placeholder="请输入用户名"
										value={this.state.username}
										onChange={e => this.setState({ username: e.target.value })}
									/>
								</div>
								<Button
									className={styles.labels}
									type="primary"
									icon="search"
									onClick={() => this.getList(2, username)}
								>
									搜索
             				 	</Button>
								<Button type="primary" onClick={() => this.reset()}>
									重置
              					</Button>
							</div>
							<Table
								rowKey={obj => obj.id}
								loading={this.state.loading}
								className={styles.mgt20}
								dataSource={checkUnPassUsers}
								columns={unpassColumns}
								pagination={false}
							/>

						</div>
					</Tabs.TabPane>
				</Tabs>
			</Card>
		);
	}
}


@Form.create()
class ChargeMoneyForm extends React.Component {

	render() {
		const { getFieldDecorator } = this.props.form;
		const { chargeMoney } = this.props;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 10 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
			},
		};
		return (<Form {...formItemLayout}>

			<Form.Item label="单次下载收费金额" hasFeedback>
				{getFieldDecorator('chargeMoney', {
					initialValue: chargeMoney,
					rules: [
						{
							required: true,
							message: '请输入单次下载收费金额!',
						},
						{
							pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
							message: '金额格式不正确!',
						}
					],
				})(<Input placeholder="请输入单次下载收费金额" autoComplete="off" />)}
			</Form.Item>
		</Form>)
	}
}

export default Verification