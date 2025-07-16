
export default defineEventHandler((event) => {

  // 写入cookie
  setCookie(event, 'test', 'cookieValue', {
    maxAge: 60 * 60 * 24, // 1 day
    secure: false,
    path: '/',
  })

  return 'cookieValue'

})
