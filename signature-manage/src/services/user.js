import request from '@/utils/request'
import api from './api';

export function register(username, password) {
	return request({
		url: api.USER_REGISTER,
		method: 'POST',
		data: { username, password }
	})
}
export function login(username, password) {
	return request({
		url: api.USER_LOGIN,
		method: 'POST',
		data: { username, password }
	})
}
export function userInfo() {
	return request({
		url: api.USER_GET_USER_INFO,
		method: 'GET',
		params: {}
	})
}

export function getUncheckedUsers() {
	return request({
		url: api.USER_GET_ALL_REVIEW_USER,
		method: 'GET',
		params: {}
	})
}


export function getCheckedUsers() {
	return request({
		url: api.USER_GET_ALL_USER,
		method: 'GET',
		params: {}
	})
}

export function confirmUser(id, confirm = true) {
	return request({
		url: api.USER_CHECK_USER_BY_ID,
		method: 'POST',
		data: { id, status: confirm }
	})
}



export function changePwd(data) {
	return request({
		url: api.USER_CHANGEPWD,
		method: 'POST',
		data,
	})
}

export function getUnPassUsers(data) {
	return request({
		url: api.USER_GET_KILL_USER,
		method: 'GET',
		data,
	});
}

export function userChangeStatus(data) {
	return request({
		url: api.USER_CHANGE_STATUS,
		method: 'GET',
		params: data,
	});
}

export function searchUser(data) {
	return request({
		url: api.USER_CHECK_USER_BY_USERNAME,
		method: 'POST',
		data,
	});
}
export function addMoney(data) {
	return request({
		url: api.USER_CHANGE_MONEY,
		method: 'POST',
		data,
	});
}


//获取 充值方式
export function getRechangeWay() {
	return request({
		url: api.USER_GET_RECHANGE_WAY,
		method: 'GET',
		data: {},
	})
}