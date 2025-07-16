import { set } from '@vueuse/core'
import { defineStore } from 'pinia'

import type { IUser } from '~/server/utils/account/types'

import { useAccountService } from '~/services/account'

export const useUserStore = defineStore('user', () => {
  const accountService = useAccountService()

  const user = ref<IUser | null>(null)

  const getUser = async () => {
    if (import.meta.client) {
      message.loading('正在加载用户信息...', 0)
    }
    try {
      const { data, error } = await accountService.current()
      if (unref(error)) {
        throw new Error(unref(error)!.message || '获取用户信息失败')
      }
      set(user, unref(data))
    } catch (err: any) {
      if (import.meta.client) {
        message.error(err.message)
      }
    } finally {
      if (import.meta.client) {
        message.destroy()
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await accountService.login({ email, password })

      if (unref(error)) {
        throw new Error(unref(error)!.message || '登录失败')
      }
      
      set(user, unref(data))
    } catch (err: any) {
      if (import.meta.client) {
        message.error(err.message)
      }
    }
  }

  const logout = async () => {
    try {
      await accountService.logout()
      set(user, null)
    } catch (err: any) {
      if (import.meta.client) {
        message.error(err.message)
      }
    }
  }

  return {
    user,
    getUser,
    login,
    logout,
  }
})
