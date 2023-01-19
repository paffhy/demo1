export interface Userable {
  id: number
  userName: string
  nickName: string
  role: Roleable
}

export interface SelectDatable {
  role: number
  nickName: string
}

export interface Roleable {
  roleId: number
  roleName: string
  authority: number[]
}
export interface UserEditedable extends Omit<Userable, 'role' | 'userName'> {
  roleId: number
}
export class InitUserData {
  selectData: SelectDatable = {
    role: 0,
    nickName: '',
  }
  userList: Userable[] = []
  roleList: Roleable[] = []
  userEdited: UserEditedable = {
    id: 0,
    nickName: '',
    roleId: 0,
  }
}
