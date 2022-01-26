import { UserDocument } from "../interfaces/model.interface"
import { User } from "../model/user.model"
import { getHashedPassowrd } from "./auth.services"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email })
    if(user) return user
    else return false
  } catch (error) {
    console.log(error.message)
    return false
  }
}

export const getUserProfile = (user: UserDocument) => {
  const userData = user.toJSON()
  delete userData.password
  return userData
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