import { Router } from "express";
import { cancelOrder, placeOrder } from "../../controller/order.controller";

export const orderRoutes = Router()

orderRoutes.post('/:pid', placeOrder)
orderRoutes.patch('/cancel/:oid', cancelOrder)