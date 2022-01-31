import { Request, Response } from "express";
import { Product } from "../model/product.model";
import { getQueryOptions } from "../utils/product.utils";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query
    const { sort, queryOptions } = getQueryOptions(query)
    const products = await Product.find(queryOptions).sort({ [sort.sortBy]: sort.order }).exec()
    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to get products'})
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { pid } = req.params
    const product = await Product.findById(pid).populate('reviews').exec()
    return res.status(200).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to get product'})
  }
}