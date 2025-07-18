const config = useRuntimeConfig()
export const SECRET_KEY = config.jwtSecret

console.log('sss', SECRET_KEY)

if (!SECRET_KEY) {
  throw new Error('JWT secret key is not configured')
}

export const COOKIE_NAME = 'nuxt_auth_token'
