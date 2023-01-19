import type { Roleable } from '@/type/user'

export interface ChangeRole {
  roleId: number
  authority: number[]
}
export interface Authoritable {
  name: string
  roleId: number
  viewRole?: string
  roleList?: Authoritable[]
}
export class AuthorityData implements Roleable {
  roleId: number
  roleName: string
  authority: number[]
  constructor(data: Roleable) {
    this.roleId = data.roleId
    this.roleName = data.roleName
    this.authority = data.authority
  }
  list: Authoritable[] = []
  selectedAthority: number[] = []
}
