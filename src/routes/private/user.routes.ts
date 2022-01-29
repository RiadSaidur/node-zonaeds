import { Router } from "express";
import { userProfile } from "../../controller/user.controller";

export const userRoutes = Router()

userRoutes.get('/', userProfile)