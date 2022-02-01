import { Response } from "express";
import { AuthenticatedRequest } from '../interfaces/auth.interface'
import { Product } from "../model/product.model";
import { Review } from "../model/review.model";

export const addReview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { description, rating } = req.body
    const { pid } = req.params

    const product = await Product.findById(pid)
    if(!product) return res.status(400).json({ error: 'Unable to add review'})

    const review = await Review.create({ uid: req.user.uid, description, rating })
    product.reviews.push(review._id)
    product.save()

    return res.status(201).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to add review'})
  }
}