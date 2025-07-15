import type { IUser } from '~/server/utils/account/types'

export const useAccountService = defineService({
  current() {
    return request.get<IUser>('account-current', '/api/account/current')
  },

  login(data: { email: string, password: string }) {
    return request.post('account-login', '/api/account/login', {
      body   : data,
      server: false,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  logout() {
    return request.post('account-logout', '/api/account/logout', {
        server: false,
    })
  },

  register(data: { name: string, email: string, password: string }) {
    return request.post('account-register', '/api/account/register', {
      body   : data,
      server: false,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
})
