import { NextFunction, Response } from "express";
import { AuthenticatedRequest, AuthPreferedRequest } from "../interfaces/auth.interface";
import { getDecodedToken } from "../utils/auth.utils";

export const auth_required = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers
    if(!headers.authorization) return res.status(401).json({ error: 'Access denined: Unauthoriozed' })

    const token = headers.authorization.split(' ')[1]
    const { email, role, uid } = getDecodedToken(token)
    if(!email) return res.status(401).json({ error: 'Access denined: Unauthoriozed' })

    req.user = {
      email, role, uid
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Access denined: Unauthoriozed' })
  }
}

export const auth_prefered = (req: AuthPreferedRequest, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers
    if(!headers.authorization) {
      req.user = null
    } else {
      const token = headers.authorization.split(' ')[1]
      const { email, role, uid } = getDecodedToken(token)
      if(!email) return res.status(401).json({ error: 'Access denined: Unauthoriozed' })

      req.user = {
        email, role, uid
      }
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Access denined: Unauthoriozed' })
  }
}