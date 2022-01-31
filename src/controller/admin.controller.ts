import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/auth.interface";
import { Product } from "../model/product.model";

export const getProductList = (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({ okay: 'okay'})
}

export const addNewProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const products = await Product.create(req.body)
    return res.status(201).json(products)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to add new products'})
  }
}

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pid } = req.params
    const product = await Product.findById(pid).remove().exec()
    return res.status(202).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to delete product'})
  }
}