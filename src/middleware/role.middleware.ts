import { NextFunction, Response } from "express";
import { Role } from "../enums/auth.enums";
import { AuthenticatedRequest } from "../interfaces/auth.interface";

export const admin_only = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user
    if(role !== Role.ADMIN) return res.status(401).json({ error: 'Access denined: Unauthoriozed' })
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ error: 'Access denined: Unauthoriozed' })
  }
}