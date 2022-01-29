import { NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/auth.interface";

const getEmailFromToken = (token: string): string => {
  const decodedToken = verify(token, process.env.JWT_KEY) as JwtPayload
  return decodedToken.email
}

export const auth_required = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers
    if(!headers.authorization) return res.status(401).json({ error: 'Access denined: Unauthoriozed' })

    const token = headers.authorization.split(' ')[1]
    const email = getEmailFromToken(token)
    if(!email) return res.status(401).json({ error: 'Access denined: Unauthoriozed' })
    
    req.user = email
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ error: 'Access denined: Unauthoriozed' })
  }
}