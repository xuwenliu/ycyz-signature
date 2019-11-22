import request from '@/utils/request'
import api from './api';

export function getAllAccount() {
    return request({
        url: api.APPLE_GET_ALL_APPLE_ACCOUNTS,
        method: 'GET',
        data: {}
    })
}

export function insterAccount({ account, csr, iss, kid, p8 }) {
    return request({
        url: api.APPLE_INSERT_APPLE_ACCOUNT,
        method: 'POST',
        data: { account, csr, iss, kid, p8 },
        timeout: 1000 * 60 * 60
    })
}

export function removeAccount(id) {
    return request({
        url: api.APPLE_DELETE_BY_ID,
        method: 'POST',
        data: { id },
    })
}

export function uploadP12(data, account_id) {
    return request({
        url: api.APPLE_UPLOAD_P12,
        method: 'POST',
        params: { id: account_id },
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
        // 60分钟
        timeout: 1000 * 60 * 60
    })
}

export function getAccountDevices(account_id, name, startTime, endTime) {
    return request({
        url: api.DEVICE_GET_ALL_BY_APPLE_ID,
        method: 'GET',
        params: { id: account_id, name, startTime, endTime }
    })
}

export function searchDevice(data) {
    return request({
        url: api.DEVICE_GET_ALL_DEVICE,
        method: 'POST',
        data,
    });
}

export function deleteDevice(data) {
    return request({
        url: api.DEVICE_DELECT_DEVICE,
        method: 'POST',
        data,
    });
}