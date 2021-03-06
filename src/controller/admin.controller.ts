import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/auth.interface";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";
import { updateProductById } from "../services/product.services";
import { deleteImageFromStorage, getCompressedImageNames } from "../utils/images.utils";
import { getOrderQueryOptions } from "../utils/order.utils";
import { getUpdatableFields } from "../utils/product.utils";

export const getProductList = (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({ okay: 'okay'})
}

export const uploadProductImage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pid } = req.params
    const product = await Product.findById(pid)
    
    if(!product) return res.status(404).json({ error: 'Product does not exixts' })

    const imageURLs = getCompressedImageNames('product-image', req.files as Express.Multer.File[])
    
    product.images.push(...imageURLs)
    product.save()

    return res.status(200).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to upload product images' })
  }
}

export const deleteProductImage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pid } = req.params
    const remove = req.query.remove as string
    const product = await Product.findById(pid)
    
    if(!product) return res.status(404).json({ error: 'Product does not exixts' })
    
    product.images = product.images.filter(image => image !== remove)
    product.save()

    deleteImageFromStorage('product-image', [remove])

    return res.status(200).json(product)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to delete product images' })
  }
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

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pid } = req.params
    const product = getUpdatableFields(req.body)
    const updatedProduct = await updateProductById(pid, product)
    if(!updatedProduct) return res.status(202).json({ error: 'Product does not exixts' })
    return res.status(202).json(updatedProduct)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to update product' })
  }
}

export const getAllOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { query } = req
    const { sort, queryOptions } = getOrderQueryOptions(query)
    const orders = await Order.find(queryOptions).sort({ [sort.sortBy]: sort.order }).populate('products.pid').exec()
    return res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to get all orders' })
  }
}

export const updateOrderStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status } = req.query
    const { oid } = req.params
    const order = await Order.findById(oid)
    if(!order) return res.status(404).json({ error: 'Order not found' })
    order.updateStatus(status as string)
    return res.status(200).json(order)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to update order' })
  }
}

export const getTotalOrderPrice = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { totalBy } = req.query
    const total = await Order.aggregate([
      {
        $group: {
          _id: `$${totalBy}`,
          total: {
            $sum: '$total'
          }
        }
      }
    ])
    return res.status(200).json(total)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable get total order' })
  }
}