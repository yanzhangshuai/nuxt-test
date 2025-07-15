import { set } from '@vueuse/core'
import { defineStore } from 'pinia'

import type { IUser } from '~/server/utils/account/types'

import { useAccountService } from '~/services/account'

export const useUserStore = defineStore('user', () => {
  const accountService = useAccountService()

  const user = ref<IUser | null>(null)

  const getUser = async () => {
    message.loading('正在加载用户信息...', 0)
    try {
      const { data, error } = await accountService.current()
      if (unref(error)) {
        throw new Error(unref(error)!.message || '获取用户信息失败')
      }
      set(user, unref(data))
    } catch (err: any) {
      message.error(err.message)
    } finally {
      message.destroy()
    }
  }

  const logout = async () => {
    try {
      await accountService.logout()
      set(user, null)
    } catch (err: any) {
      message.error(err.message)
    }
  }

  return {
    user,
    getUser,
    logout,
  }
})
