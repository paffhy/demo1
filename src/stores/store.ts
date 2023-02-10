import { defineStore } from 'pinia'
import type { Roleable } from '@/type/user'

export const useStore = defineStore('main', {
  state: (): Roleable => {
    return {
      roleId: 0,
      roleName: '',
      authority: [],
    }
  },
  persist: true,
})

export const useLoginStore = defineStore('login', {
  state: () => ({
    roleId: 0,
    authority: [],
  }),
  persist: true,
})
