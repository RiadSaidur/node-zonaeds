import { UserDocument } from "../interfaces/model.interface"
import { createJWT } from "../services/auth.services"
import { getUserProfile } from "../services/user.services"

export const getTokenAndProfile = (user: UserDocument) => {
  const tokenAndProfile = {
    token: createJWT(user),
    profile: getUserProfile(user)
  }
  return tokenAndProfile
}