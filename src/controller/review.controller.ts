import { Response } from "express";
import { AuthenticatedRequest } from '../interfaces/auth.interface'
import { Product } from "../model/product.model";
import { Review } from "../model/review.model";
import { getImageURLs } from "../utils/images.utils";

export const addReviewImages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { rid } = req.params
    const review = await Review.findById(rid)
    
    if(!review) return res.status(404).json({ error: 'Review does not exists'})

    const imageURLs = getImageURLs(req.files as Express.Multer.File[])
    review.images.push(...imageURLs)
    review.save()

    return res.status(201).json(review)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to add review images'})
  }
}

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

export const deleteReview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pid } = req.params
    const { rid } = req.query

    const review = await Review.findById(rid)
    if(!review) return res.status(404).json({ error: 'Review does not exixts' })
    await review.deleteOne()

    const product = await Product.findById(pid).updateOne({ $pull: { reviews: rid } })

    return res.status(201).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to add review'})
  }
}