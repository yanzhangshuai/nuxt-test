import type { IUser } from '~~/server/utils/account/types'

// auth.d.ts
declare module '#auth-utils' {
  interface User extends IUser {
    // 添加您自己的字段
  }

  interface UserSession {
    // 添加您自己的字段
  }
}

export {}
