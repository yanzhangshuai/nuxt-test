import type { IUser } from '~/server/utils/account/types'

export const useAccountService = defineService({
  current() {
    return request.get<IUser>('account-current', '/api/account/current')
  },

  login(data: { email: string, password: string }) {
    return request.post(Date.now().toString(), '/api/account/login', {
      body   : data,
      server: false,
    })
  },

  logout() {
    return request.post(Date.now().toString(), '/api/account/logout', {
        server: false,
    })
  },

  register(data: { name: string, email: string, password: string }) {
    return request.post(Date.now().toString(), '/api/account/register', {
      body  : data,
      server: false,
      lazy  : true
    })
  }
})
