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
