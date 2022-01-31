import { Router } from "express";
import { getAllProducts } from "../../controller/product.controller";

export const productRoutes = Router()

productRoutes.get('/products', getAllProducts)