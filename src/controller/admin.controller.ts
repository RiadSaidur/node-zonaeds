import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/auth.interface";

export const getProductList = (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({ okay: 'okay'})
}