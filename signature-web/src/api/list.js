import request from '@/utils/request'

export function getAllPackage() {
  return request({
    url: 'package/getAllPackage',
    method: 'GET',
    data: { }
  })
}

export function getDetailPackage(id) {
  return request({
    url: 'package/getPackageById',
    method: 'GET',
    params: { id:id }
  })
}