import { genSalt, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UserDocument } from "../interfaces/model.interface"
import { User } from "../model/user.model"

export const createJWT = (user: UserDocument): string => {
  const JWTKey = process.env.JWT_KEY
  return sign({ email: user.email, uid: user._id, role: user.role }, JWTKey)
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