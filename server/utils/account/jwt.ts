import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../const'

const EXPIRES_IN = '1d'

export function generateToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN })
}

interface JwtPayload {
  id   : number
  email: string
}

export function verifyToken(token: string): JwtPayload {
  const payload = jwt.verify(token, SECRET_KEY)
  if (typeof payload === 'string') {
    throw new TypeError('Invalid token payload')
  }
  return payload as JwtPayload
}

export function decodeToken(token: string) {
  return jwt.decode(token)
}
