import { JwtPayload, verify } from "jsonwebtoken"
import { Token } from "../interfaces/auth.interface"

export const getDecodedToken = (token: string): Token => {
  const decodedToken = verify(token, process.env.JWT_KEY) as JwtPayload
  return {
    email: decodedToken.email,
    role: decodedToken.role,
    uid: decodedToken.uid
  }
}