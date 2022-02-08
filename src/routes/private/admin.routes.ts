import { Router } from "express";
import { addNewProducts, deleteProduct, getAllOrders, getProductList, getTotalOrderPrice, updateOrderStatus, updateProduct } from "../../controller/admin.controller";

export const adminRoutes = Router()

adminRoutes.get('/products', getProductList)
adminRoutes.post('/products', addNewProducts)
adminRoutes.delete('/products/:pid', deleteProduct)
adminRoutes.patch('/products/:pid', updateProduct)

adminRoutes.get('/orders', getAllOrders)
adminRoutes.patch('/orders/:oid', updateOrderStatus)
adminRoutes.get('/orders/total/', getTotalOrderPrice)
