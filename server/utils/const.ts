const config = useRuntimeConfig()
export const SECRET_KEY = config.jwtSecret

if (!SECRET_KEY) {
  throw new Error('JWT secret key is not configured')
}

export const COOKIE_NAME = 'nuxt_auth_token'
