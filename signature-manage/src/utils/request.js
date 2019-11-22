import axios from 'axios'
import { notification } from 'antd';
import Qs from 'qs'
import configs from '../app.config'

const service = axios.create({
	baseURL: configs.baseURL,
	timeout: 120 * 1000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	transformRequest: [(data, header) => {
		const contentType = header['Content-Type']
		if (contentType.startsWith('multipart/form-data')) {
			return data
		}
		return Qs.stringify(data)
	}]
})

service.interceptors.request.use(
	config => {
		const token = window.g_app._store.getState().user.token;
		if (token) {
			config.headers['Authorization'] = token
		}
		return config
	},
	error => {
		console.log(error)
		Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return response;
		} else {
			notification.error({
				message: response.data.msg,
			});
			return null;
		}
	}
)


export default service
