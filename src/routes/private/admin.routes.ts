import { Router } from "express";
import { addNewProducts, deleteProduct, getProductList, updateProduct } from "../../controller/admin.controller";

export const adminRoutes = Router()

adminRoutes.get('/products', getProductList)
adminRoutes.post('/products', addNewProducts)
adminRoutes.delete('/products/:pid', deleteProduct)
adminRoutes.patch('/products/:pid', updateProduct)