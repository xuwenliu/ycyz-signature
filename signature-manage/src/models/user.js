import { login, userInfo, changePwd, getRechangeWay } from '@/services/user'
import { setToken, getToken, removeToken } from '@/utils/cookies'
import { isNullOrUndefined } from 'util';
// https://www.jianshu.com/p/f7401adce447 dva关于 state -》effects -》subscriptions 相关用法
export default {
	state: {
		token: null,
		message: null,
		info: null,
		changeWay: null,
		backBtnDom: null,
	},
	reducers: {
		updateTokem(state, { payload: { token, message } }) {
			return { ...state, token, message }
		},
		updateInfo(state, { payload: { info } }) {
			return { ...state, info }
		},
		clean(state) {
			return { ...state, ...{ token: null, message: null, info: null } }
		},
		rechangeWay(state, { changeWay }) {
			return { ...state, changeWay }
		},
		backBtnDom(state, { backBtnDom }) {
			return { ...state, backBtnDom }
		}
	},
	effects: {
		*login({ payload: { username, password, remenber } }, { call, put }) {
			yield put({ type: 'clean' });
			// console.log('this.props.dispatch[login.jsx]、user/login => login触发') 
			const { data, } = yield call(login, username, password)
			yield put({ type: 'updateTokem', payload: { token: data.data, message: data.msg } });
			yield put({ type: 'remenberCurrentToken', payload: { remenber } })
		},
		*logout(_, { put }) {
			yield put({ type: 'clean' });
			yield put({ type: 'remenberCurrentToken', payload: { remenber: false } });
		},
		*loadUserInfo(_, { call, put, select }) {
			try {
				let { data: { data } } = yield call(userInfo);
				if (data.level !== 1) {
					let { data: { data } } = yield call(getRechangeWay);
					yield put({ type: 'rechangeWay', changeWay: data });
				}
				yield put({ type: 'updateInfo', payload: { info: data } });
			} catch (error) {
				yield put({ type: 'logout' });
				return;
			}
		},
		*remenberCurrentToken({ payload: { remenber } }, { select }) {
			if (remenber) {
				const token = yield select(state => state.user.token);
				setToken(token);
			}
			else {
				removeToken();
			}
		},
		*loadRemenberToken(_, { call, put, select }) {
			const token = getToken();
			if (!isNullOrUndefined(token) && token.length > 0) {
				yield put({ type: 'updateTokem', payload: { token, message: 'remenber success' } });
			}

			//yield call(doSomethingFunc, parameter);
			//const data = yield select(state => state.data);
			//yield put({ type: 'fetch', payload: { page } });

		},

		//修改密码
		*changePwd({ payload, callback }, { put, call }) {
			const { data } = yield call(changePwd, payload);
			callback && callback(data); // 返回结果
		},

		*setBackBtnDom({ backBtnDom }, { put }) {
			yield put({ type: 'backBtnDom', backBtnDom });

		}
	},
	subscriptions: {
		setup({ dispatch }) {
			let token = null;
			const store = window.g_app._store;
			store.subscribe(() => {
				const newToken = store.getState().user.token;
				if (token === newToken) {
					return;
				}
				token = newToken;
				if (!isNullOrUndefined(token) && token.length > 0) {
					dispatch({ type: 'loadUserInfo' })
				}
			});

			dispatch({ type: 'loadRemenberToken' });
		},
	}

}