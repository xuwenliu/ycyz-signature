/**
 * Routes:
 *   - ./src/Authorized.jsx
 */

import { withRouter } from 'react-router';
import React, { Component } from 'react'

import ProLayout, { PageHeaderWrapper } from '@ant-design/pro-layout';

import logo from '../assets/logo.svg';
import Link from 'umi/link';
import router from 'umi/router';

import {
	Dropdown,
	Menu,
	Typography,
	Icon,
	Button,
	Modal,
	Form,
	Input,
	message,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import routes from '../routes';

// 将 model 和 component 串联起来
@connect(({ user, loading }) => ({
	user, loading
}), (dispatch) => ({
	logout() {
		dispatch({ type: 'user/logout' })
	},
	changePwd(payload, callback) {
		dispatch({
			type: 'user/changePwd',
			payload,
			callback,
		})
	},
	setBackBtnDom(backBtnRef) {
		dispatch({
			type: 'user/setBackBtnDom',
			backBtnRef
		})
	}
}))
class BasicLayout extends Component {

	constructor(props) {
		super(props);

		this.backBtnRef = React.createRef();
		this.state = {
			menuRoutes: [],
			showChangePwdModal: false,
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}
	componentDidMount() {
		this.backBtnRef.current && this.props.setBackBtnDom(this.backBtnRef.current.buttonNode);
	}

	routeList() {
		//   user 
		//   info: {id: 1, level: 1, username: "supersign", email: null}
		//   message: "remenber success"
		//   token: "eyJh
		if (this.props.user.info.level === 1) {
			return { routes: routes }
		}
		else {
			return { routes: routes.filter(t => t.level !== 1) }
		}
	}

	// 根据权限获取 下拉参数列表
	getDropdownOverlay = (isManager) => {
		const { logout } = this.props;
		return (<Menu>
			{
				!isManager && <Menu.Item
					onClick={_ => {
						//跳转路由
						router.push('/apps/depositRecord');
					}}
				>
					充值记录
			</Menu.Item>
			}

			<Menu.Item
				onClick={_ => {
					this.setState({ showChangePwdModal: true });
				}}
			>
				修改密码
			</Menu.Item>
			<Menu.Item
				onClick={_ => {
					logout()
				}}
			>
				退出登录
			</Menu.Item>
		</Menu>);
	}

	//打开充值弹框
	openDeposit = () => {
		let changeWay = this.props.user.changeWay;
		Modal.info({
			centered: true,
			title: '提示',
			content: <div><p>若需要充值，请联系业务：</p><p>Skype：{changeWay}</p></div>,
			okText: '确定'
		});
	}

	//关闭修改密码弹框
	onCancelChangePwd = () => {
		this.setState({
			showChangePwdModal: false
		})
	}

	// 提交密码修改
	onSubmitChangePwd = () => {
		const { changePwd, user } = this.props;
		this.pwdForm.props.form.validateFields((err, values) => {
			if (!err) {
				changePwd({
					password: values.password,
					newPassword: values.newPassword,
					username: user.info.username,
				},
					(res) => {
						if (res) {
							this.resetChangePwd();
							message.success(res.msg);
							router.push('/')
						}
					});
			}
		})

	}

	// 取消 修改密码
	resetChangePwd = () => {
		this.setState(() => {
			return {
				showChangePwdModal: false
			}
		})
		this.pwdForm.props.form.resetFields();
	}

	//是否显示返回按钮
	getBackBtn = () => {
		let routes = this.routeList().routes;
		let currentPath = this.props.location.pathname;
		let backBtn = null;
		let deep = (routes, currentPath) => {
			for (let i = 0; i < routes.length; i++) {
				if (routes[i].children && routes[i].children.length > 0) {
					deep(routes[i].children, currentPath);
				} else {
					if (routes[i].path === currentPath && routes[i].showBackBtn === true) {
						backBtn = <Button ref={this.backBtnRef} id="backBtn" onClick={() => {
							if (routes[i].back) {
								router.push({
									pathname: routes[i].back.pathname,
									state: {
										tab: routes[i].back.state.tab
									}
								})
							} else {
								router.goBack();
							}
						}}>返回</Button>
					}
				}
			}
		}
		deep(routes, currentPath);
		return backBtn;
	}







	render() {
		if (this.props.location.pathname.startsWith('/auth/')) {
			return <>{this.props.children}</>
		}
		const { showChangePwdModal } = this.state;
		const { loading } = this.props;

		const { info } = this.props.user;
		const isManager = info.level === 1; // 管理员
		const dropdownOverlay = this.getDropdownOverlay(isManager);


		let backBtn = this.getBackBtn();
		return (
			<>
				<ProLayout logo={logo}
					title="Signature Manage"
					route={this.routeList()}
					location={this.props.location}
					rightContentRender={(HeaderViewProps) => {
						return (
							<div className={styles.headerRight}>
								{
									// 普通账号 展示
									!isManager && <div className={styles.accountMoney}>
										<span>账号余额：{info.money.toFixed(2)}元</span>
										<Button onClick={this.openDeposit} className={styles.depositBtn} type="primary" size="small">充值</Button>
									</div>
								}

								<Dropdown overlay={dropdownOverlay}>
									<Typography.Text
										className="ant-dropdown-link"
									>
										<span style={{ margin: '0 6px', cursor: 'pointer' }}>{info.username}</span>
										<Icon type="down" />
									</Typography.Text>

								</Dropdown>

								{/* 修改密码弹框 */}
								<Modal
									title="修改密码"
									confirmLoading={loading.effects['user/changePwd']}
									maskClosable={false}
									visible={showChangePwdModal}
									onOk={this.onSubmitChangePwd}
									onCancel={this.resetChangePwd}
								>
									<ChangePwdForm wrappedComponentRef={(pwd) => { this.pwdForm = pwd; }} />
								</Modal>
							</div>
						)
					}}
					breadcrumbRender={(routers = []) => [
						{
							path: '/',
							breadcrumbName: '首页',
						},
						...routers,
					]}
					itemRender={(route, params, routes, paths) => {
						if (routes.indexOf(route) === routes.length - 1) {
							return (<span>{route.breadcrumbName}</span>)
						}
						return (<Link to={route.path}>{route.breadcrumbName}</Link>)
					}}
					menuItemRender={(menuItemProps, defaultDom) => {
						return menuItemProps.isUrl ? (
							defaultDom
						) : (
								<Link to={menuItemProps.path}>{defaultDom}</Link>
							)
					}}

					footerRender={() => (<div style={{ margin: '1rem auto' }}>Copyright&copy;2019 Signature Manage</div>)}
				>
					<PageHeaderWrapper
						extra={backBtn}>
						{
							this.props.children
						}
					</PageHeaderWrapper>
				</ProLayout >
			</>
		);
	}
}

export default withRouter(BasicLayout);


@Form.create()
class ChangePwdForm extends Component {
	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('newPassword')) {
			callback('两次输入的密码不一致!')
		} else {
			callback();
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		return (<Form {...formItemLayout}>

			<Form.Item label="旧密码" hasFeedback>
				{getFieldDecorator('password', {
					rules: [
						{
							required: true,
							message: '请输入旧密码!',
						},
						{ min: 4, message: '长度应为 4 个字符以上' },
					],
				})(<Input.Password placeholder="请输入旧密码" autoComplete="off" />)}
			</Form.Item>
			<Form.Item label="新密码" hasFeedback>
				{getFieldDecorator('newPassword', {
					rules: [
						{
							required: true,
							message: '请输入新密码!',
						},
						{ min: 4, message: '长度应为 4 个字符以上' },
					],
				})(<Input.Password placeholder="请输入新密码" autoComplete="off" />)}
			</Form.Item>
			<Form.Item label="确认密码" hasFeedback>
				{getFieldDecorator('confirmPassword', {
					rules: [
						{
							required: true,
							message: '请输入确认密码!',
						},
						{
							validator: this.compareToFirstPassword,
						},
					],
				})(<Input.Password placeholder="请再次输入新密码" autoComplete="off" />)}
			</Form.Item>
		</Form>)
	}
}

