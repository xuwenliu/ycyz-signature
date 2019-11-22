import request from '@/utils/request'
import api from './api';

export function getAllPackage() {
  return request({
    url: api.PACKAGE_GET_ALL_PACKAGE,
    method: 'GET',
    data: {}
  })
}

export function getDetailPackage(id) {
  return request({
    url: api.PACKAGE_GET_PACKAGE_BY_ID,
    method: 'GET',
    params: { id: id },
  })
}

export function uploadApp(data, summary = '') {
  return request({
    url: api.PACKAGE_UPLOAD_PACKAGE,
    method: 'POST',
    params: { summary },
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
    // 60分钟
    timeout: 1000 * 60 * 60

  })
}

export function updateMaxCount(id, totalCount) {
  return request({
    url: api.PACKAGE_UPDATE_TOTAL_COUNT_BY_ID,
    method: 'POST',
    data: { id, totalCount }
  })
}

export function setMaxCount(id, totalCount) {
  return request({
    url: api.PACKAGE_RESET_TOTAL_COUNT_BY_ID,
    method: 'POST',
    data: { id, totalCount }
  })
}

export function removeApp(id) {
  return request({
    url: api.PACKAGE_DELETE_BY_ID,
    method: 'POST',
    data: { id }
  })
}

// 获取更新记录
export function getUpdateRecord(id, userId) {
  return request({
    url: api.PACKAGE_GET_UPDATE_RECORD_BY_ID,
    method: 'GET',
    params: { id, userId },
  })
}

// 获取下载记录
export function getDownloadInfo(packageId) {
  return request({
    url: api.DEVICE_GET_DOWNLOAD_BY_ID,
    method: 'GET',
    params: { packageId },
  })
}

// 获取充值记录
export function getDepositRecord() {
  return request({
    url: api.USER_GET_DEPOSIT_RECORD,
    method: 'GET',
    data: {},
  })
}

// 上传apk文件
export function uploadApk(data, uploadAddress = "", summary = "") {
  return request({
    url: api.PACKAGE_UPLOAD_APK,
    method: 'POST',
    params: { uploadAddress, summary },
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
    // 60分钟
    timeout: 1000 * 60 * 60
  })
}



