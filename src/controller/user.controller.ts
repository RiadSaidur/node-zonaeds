import { Response } from "express"
import { AuthenticatedRequest } from "../interfaces/auth.interface"
import { getUserByEmail } from "../services/user.services"
import { getTokenAndProfile } from "../utils/user.utils"

export const userProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await getUserByEmail(req.user)
    if(!user) return res.status(404).json({ error: 'User does not exixts' })
    
    const profile = getTokenAndProfile(user)
    return res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to get user info' })
  }
}