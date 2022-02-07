import { Router } from "express";
import { addReview, deleteReview } from "../../controller/review.controller";
import { userProfile } from "../../controller/user.controller";

export const userRoutes = Router()

userRoutes.get('/', userProfile)
userRoutes.patch('/review/:pid', addReview)
userRoutes.delete('/review/:pid', deleteReview)