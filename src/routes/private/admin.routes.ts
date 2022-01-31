import { Router } from "express";
import { addNewProducts, deleteProduct, getProductList } from "../../controller/admin.controller";

export const adminRoutes = Router()

adminRoutes.get('/products', getProductList)
adminRoutes.post('/products', addNewProducts)
adminRoutes.delete('/products/:pid', deleteProduct)