import { Router } from "express";
import { addReview } from "../../controller/review.controller";
import { userProfile } from "../../controller/user.controller";

export const userRoutes = Router()

userRoutes.get('/', userProfile)
userRoutes.patch('/products/:pid/review', addReview)