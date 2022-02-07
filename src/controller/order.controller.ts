import { Response } from "express";
import { ObjectId } from "mongoose";
import { AuthenticatedRequest, AuthPreferedRequest } from "../interfaces/auth.interface";
import { OrderUpdate } from "../interfaces/order.interface";
import { Order } from "../model/order.model";
import { updateOrderById } from "../services/order.services";

export const placeOrder = async (req: AuthPreferedRequest, res: Response) => {
  try {
    const user = req.user
    const { products, address } = req.body
    const newOrder = {
      uid: null as ObjectId,
      products,
      address
    }
    if(user) newOrder.uid = user.uid
    const order = await Order.create(newOrder)
    return res.status(201).json(order)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to place an order' })
  }
}

export const cancelOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { oid } = req.params
    const cancel = { status: 'canceled' }
    const canceledOrder = await updateOrderById(oid, cancel)
    if(!canceledOrder) return res.status(404).json({ error: 'Order not found' })
    return res.status(200).json(canceledOrder)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to cancel an order' })
  }
}

export const updateOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { oid } = req.params
    const { products, address } = req.body as OrderUpdate
    const updatingFields = { products, address }
    const updatedOrder = await updateOrderById(oid, updatingFields)
    if(!updatedOrder) return res.status(404).json({ error: 'Order not found' })
    return res.status(200).json(updatedOrder)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to update an order' })
  }
}