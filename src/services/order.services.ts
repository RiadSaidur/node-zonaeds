import { OrderUpdate } from "../interfaces/order.interface"
import { Order } from "../model/order.model"

export const updateOrderById = async (oid: string, orderUpdateFields: OrderUpdate) => {
  try {
    const order = await Order.findById(oid)
    if(!order) return false
    return await order.updateOne(orderUpdateFields)
  } catch (error) {
    console.log(error)
    return false
  }
}