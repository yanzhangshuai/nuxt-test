export const useAccountService = defineService({
  current() {
    return request.get<IUser>('account-current', '/api/v2/account/current')
  },

  login(data: { email: string, password: string }) {
    return request.post(Date.now().toString(), '/api/v2/account/login', {
      body   : data,
      server: false,
    })
  },

  logout() {
    return request.post(Date.now().toString(), '/api/v2/account/logout', {
      server: false,
    })
  },

  register(data: { name: string, email: string, password: string }) {
    return request.post(Date.now().toString(), '/api/v2/account/register', {
      body  : data,
      server: false,
      lazy  : true,
    })
  },
})
