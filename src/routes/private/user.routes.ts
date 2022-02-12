import { Router } from "express";
import { addReview, addReviewImages, deleteReview } from "../../controller/review.controller";
import { userProfile } from "../../controller/user.controller";
import { upload } from "../../services/images.services";

export const userRoutes = Router()

userRoutes.get('/', userProfile)

userRoutes.post('/review/:pid', addReview)
userRoutes.delete('/review/:pid', deleteReview)

userRoutes.post('/review/images/:rid', upload.array('review-images', 3), addReviewImages)