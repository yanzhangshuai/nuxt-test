import { COOKIE_NAME } from '~/server/utils/const'

export default defineEventHandler(async (event) => {
  deleteCookie(event, COOKIE_NAME, {
    httpOnly: true,
    secure  : !import.meta.dev,
    path    : '/',
    sameSite: 'strict'
  })

  return {}
})
