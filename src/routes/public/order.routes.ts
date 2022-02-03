import { Router } from "express";
import { cancelOrder, placeOrder, updateOrder } from "../../controller/order.controller";
import { auth_required } from "../../middleware/auth.middleware";

export const orderRoutes = Router()

orderRoutes.post('/:pid', placeOrder)
orderRoutes.patch('/cancel/:oid', auth_required, cancelOrder)
orderRoutes.patch('/update/:oid', auth_required, updateOrder)