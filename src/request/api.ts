import http from './index'
import type { LoginData } from '@/type/login'
import type { Userable } from '@/type/user'
import type { ChangeRole } from '@/type/authority'
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

export function getAuthorityList() {
  return http({
    url: '/getAuthorityList',
    method: 'get',
  })
}

export function changeUser(data: Userable) {
  return http({
    url: '/changeUser',
    method: 'post',
    data: {
      id: data.id,
      nickName: data.nickName,
      roleId: data.role.roleId,
    },
  })
}

export function deleteUser(userId: number) {
  return http({
    url: '/deleteUser',
    method: 'post',
    data: {
      id: userId,
    },
  })
}

export function changeAuthority(data: ChangeRole) {
  return http({
    url: '/changeAuthority',
    method: 'post',
    data: data,
  })
}

export function isLogin() {
  return http({
    url: '/isLogin',
    method: 'get',
  })
}
