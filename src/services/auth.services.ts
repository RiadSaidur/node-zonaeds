import { genSalt, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"

export const createJWT = (email: string): string => {
  const JWTKey = process.env.JWT_KEY
  return sign({ email }, JWTKey)
}

export const getHashedPassowrd = async (password: string): Promise<string> => {
  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt)

  return hashedPassword
}