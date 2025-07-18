// import { NuxtAuthHandler } from '#auth'
// // ~/server/api/auth/[...].ts
// import CredentialsProvider from 'next-auth/providers/credentials'

// export default NuxtAuthHandler({
//   secret: process.env.AUTH_SECRET, // 必须设置，用于加密

//   // 启用 JWT 策略（默认是数据库策略）
//   session: {
//     strategy: 'jwt', // 关键配置！
//   },

//   providers: [
//     // 示例：密码登录（支持自定义 JWT）
//     CredentialsProvider({
//       name       : 'Credentials',
//       credentials: {
//         email   : { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // 验证用户逻辑（如数据库查询）
//         const user = await findUser(credentials.email, credentials.password)
//         if (!user)
//           return null

//         // 返回的内容会被编码到 JWT 中
//         return {
//           id   : user.id,
//           email: user.email,
//           role : user.role,
//         }
//       },
//     }),
//   ],

//   // JWT 加密和自定义回调
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       // 初次登录时 user 存在
//       if (user) {
//         token.id = user.id
//         token.role = user.role
//       }
//       return token
//     },
//     session: ({ session, token }) => {
//       // 将 JWT 的 payload 传递给前端 session
//       session.user.id = token.id
//       session.user.role = token.role
//       return session
//     },
//   },

//   // 高级 JWT 配置（加密选项）
//   jwt: {
//     encryption: true, // 启用加密（需要 AUTH_SECRET 足够强）
//     secret    : process.env.JWT_SECRET, // 可单独指定 JWT 密钥
//     maxAge    : 60 * 60 * 24, // 1天过期（单位：秒）
//   },
// })
