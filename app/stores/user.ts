import { set } from '@vueuse/core'
import { defineStore } from 'pinia'

import { useAccountService } from '~/services/account'

export const useUserStore = defineStore('user', () => {
  const accountService = useAccountService()

  const user = ref<IUser | null>(null)

  const fetchUser = async () => {
    try {
      const { data, error } = await accountService.current()
      if (unref(error)) {
        throw new Error(unref(error)!.message || '获取用户信息失败')
      }

      set(user, unref(data))
    }
    catch (error: any) {
      console.error('Error fetching user:', error.message)
      set(user, null)
    }
  }

  const login = async (email: string, password: string) => {
    const { error } = await accountService.login({ email, password })

    if (unref(error)) {
      throw new Error(unref(error)!.data || '登录失败')
    }

    fetchUser()
  }

  const logout = async () => {
    const { error } = await accountService.logout()
    if (unref(error)) {
      throw new Error(unref(error)!.data || '登出失败')
    }

    set(user, null)

    // 刷新页面状态
    if (import.meta.client) {
      window.location.reload()
    }
  }

  return {
    user,
    fetchUser,
    login,
    logout,
  }
})
