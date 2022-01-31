import { Router } from "express";
import { addNewProducts, getProductList } from "../../controller/admin.controller";

export const adminRoutes = Router()

adminRoutes.get('/products', getProductList)
adminRoutes.post('/products', addNewProducts)