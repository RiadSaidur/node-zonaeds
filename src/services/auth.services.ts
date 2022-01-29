import { genSalt, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { User } from "../model/user.model"

export const createJWT = (email: string): string => {
  const JWTKey = process.env.JWT_KEY
  return sign({ email }, JWTKey)
}

export const getHashedPassowrd = async (password: string): Promise<string> => {
  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt)

  return hashedPassword
}

export const addNewUser = async (name: string, email: string, password: string) => {
  try {
    const hashedPassword = await getHashedPassowrd(password)
    return await User.create({ name, email, password: hashedPassword })
  } catch (error) {
    console.log(error.message)
    return false
  }
}