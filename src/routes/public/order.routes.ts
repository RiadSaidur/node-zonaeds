import { Router } from "express";
import { placeOrder } from "../../controller/order.controller";

export const orderRoutes = Router()

orderRoutes.post('/:pid', placeOrder)