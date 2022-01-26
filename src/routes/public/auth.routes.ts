import { Router } from "express";
import { signin, signup } from "../../controller/auth.controller";

export const authRoutes = Router()

authRoutes.post('/signup', signup)
authRoutes.post('/signin', signin)