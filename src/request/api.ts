import http from './index'
import type { LoginData } from '@/type/login'
export function login(data: LoginData) {
  return http({
    url: '/login',
    method: 'post',
    data,
  })
}

export function getGoodsList() {
  return http({
    url: '/getGoods',
    method: 'get',
  })
}

export function getUserList() {
  return http({
    url: '/getUsers',
    method: 'get',
  })
}

export function getRoleList() {
  return http({
    url: '/getRoles',
    method: 'get',
  })
}
