import { Router } from "express";
import { getProductList } from "../../controller/admin.controller";

export const adminRoutes = Router()

adminRoutes.get('/', getProductList)