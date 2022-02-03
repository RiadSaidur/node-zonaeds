import { Response } from "express";
import { ObjectId } from "mongoose";
import { AuthPreferedRequest } from "../interfaces/auth.interface";
import { Order } from "../model/order.model";

export const placeOrder = async (req: AuthPreferedRequest, res: Response) => {
  try {
    const user = req.user
    const { pid } = req.params
    const { qty, sizes } = req.body
    const newOrder = {
      uid: null as ObjectId,
      pid,
      qty,
      sizes
    }
    if(user) newOrder.uid = user.uid
    const order = await Order.create(newOrder)
    return res.status(201).json(order)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Unable to place an order' })
  }
}