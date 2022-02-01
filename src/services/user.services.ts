import { ObjectId } from "mongoose"
import { UserDocument } from "../interfaces/model.interface"
import { User } from "../model/user.model"

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

export const getUserById = async (uid: ObjectId) => {
  try {
    const user = await User.findById(uid)
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