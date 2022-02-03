import { Router } from "express";
import { getAllProducts, getProductById } from "../../controller/product.controller";

export const productRoutes = Router()

productRoutes.get('/', getAllProducts)
productRoutes.get('/:pid', getProductById)